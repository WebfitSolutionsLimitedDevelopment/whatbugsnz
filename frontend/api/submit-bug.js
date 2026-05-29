export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const {
      title,
      description,
      category,
      region,
      audience,
      frequency,
      pain,
      paid_workaround,
      name,
      email,
      consent,
      previewScore,
    } = req.body || {};

    if (!title || !description || !category || !region || !audience) {
      return res.status(400).json({
        success: false,
        message: 'Please fill the required fields.',
      });
    }

    if (!consent) {
      return res.status(400).json({
        success: false,
        message: 'Please confirm consent to publish.',
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const leadsToEmail = process.env.LEADS_TO_EMAIL;
    const leadsFromEmail = process.env.LEADS_FROM_EMAIL || 'onboarding@resend.dev';

    if (!resendApiKey || !leadsToEmail) {
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured.',
      });
    }

    const safe = (value) => {
      if (value === undefined || value === null || value === '') {
        return 'Not provided';
      }

      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const submittedAt = new Date().toLocaleString('en-NZ', {
      timeZone: 'Pacific/Auckland',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const subject = `New What Bugs NZ submission: ${safe(title)}`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin-bottom: 8px;">New What Bugs NZ Submission</h2>
        <p style="margin-top: 0; color: #4b5563;">Submitted at: ${submittedAt}</p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />

        <h3>Problem Details</h3>
        <p><strong>Problem Title:</strong><br />${safe(title)}</p>
        <p><strong>Description:</strong><br />${safe(description)}</p>
        <p><strong>Category:</strong> ${safe(category)}</p>
        <p><strong>Region:</strong> ${safe(region)}</p>
        <p><strong>Audience:</strong> ${safe(audience)}</p>

        <h3>Scoring Inputs</h3>
        <p><strong>Frequency:</strong> ${safe(frequency)}</p>
        <p><strong>Pain Level:</strong> ${safe(pain)} / 10</p>
        <p><strong>Provisional Bug Score:</strong> ${safe(previewScore)}</p>

        <h3>Workaround</h3>
        <p><strong>Are people paying for a workaround now?</strong><br />${safe(paid_workaround)}</p>

        <h3>Submitter Details</h3>
        <p><strong>Name:</strong> ${safe(name)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Consent:</strong> ${consent ? 'Yes' : 'No'}</p>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />

        <p style="font-size: 13px; color: #6b7280;">
          Review this submission manually. If it is useful, add it to mockData.js in the next content update.
        </p>
      </div>
    `;

    const text = `
New What Bugs NZ Submission

Submitted at: ${submittedAt}

Problem Title:
${title || 'Not provided'}

Description:
${description || 'Not provided'}

Category: ${category || 'Not provided'}
Region: ${region || 'Not provided'}
Audience: ${audience || 'Not provided'}

Frequency: ${frequency || 'Not provided'}
Pain Level: ${pain || 'Not provided'} / 10
Provisional Bug Score: ${previewScore || 'Not provided'}

Paid workaround:
${paid_workaround || 'Not provided'}

Submitter Name: ${name || 'Not provided'}
Submitter Email: ${email || 'Not provided'}
Consent: ${consent ? 'Yes' : 'No'}
`;

    const emailPayload = {
      from: `What Bugs NZ <${leadsFromEmail}>`,
      to: [leadsToEmail],
      subject,
      html,
      text,
    };

    if (email) {
      emailPayload.reply_to = email;
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Resend error:', emailResult);

      return res.status(500).json({
        success: false,
        message: 'Submission could not be emailed. Please try again.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Submission sent successfully.',
    });
  } catch (error) {
    console.error('Submit bug error:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
}