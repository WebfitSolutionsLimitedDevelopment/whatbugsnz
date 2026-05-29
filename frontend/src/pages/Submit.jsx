import React, { useState } from 'react';
import { CATEGORIES, REGIONS, AUDIENCES, calcBugScore } from '../data/mockData';
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';

const FREQ_OPTIONS = [
  { label: 'Rare', value: 2 },
  { label: 'Occasional', value: 5 },
  { label: 'Regular', value: 7 },
  { label: 'Daily or weekly', value: 9 },
];

const EMPTY_FORM = {
  title: '',
  description: '',
  category: '',
  region: '',
  audience: '',
  frequency: 5,
  pain: 5,
  paid_workaround: '',
  name: '',
  email: '',
  consent: false,
};

const Submit = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const previewScore = calcBugScore(Number(form.pain), 6, 6, Number(form.frequency));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title || !form.description || !form.category || !form.region || !form.audience) {
      setError('Please fill the required fields.');
      return;
    }

    if (!form.consent) {
      setError('Please confirm consent to publish.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        previewScore: previewScore.toFixed(1),
      };

      const response = await fetch('/api/submit-bug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || 'Submission could not be sent. Please try again.');
      }

      try {
        const existing = JSON.parse(localStorage.getItem('wbnz_submissions') || '[]');
        existing.push({ ...payload, created_at: new Date().toISOString() });
        localStorage.setItem('wbnz_submissions', JSON.stringify(existing));
      } catch (_) {
        // localStorage is only a backup. Ignore if unavailable.
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Submission could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError('');
    setForm(EMPTY_FORM);
  };

  if (submitted) {
    return (
      <div className="bg-black text-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <CheckCircle2 className="h-14 w-14 text-[#39FF14] mx-auto" />

          <h1 className="mt-6 font-display text-3xl sm:text-4xl font-bold">
            Cheers, your bug is in.
          </h1>

          <p className="mt-4 text-white/70">
            We have received your submission. We will review it, score it, and if it is a goer, publish it for founders and communities to see.
          </p>

          <div className="mt-8 rounded-xl bg-[#0d0d0f] ring-1 ring-white/10 p-6 text-left">
            <p className="text-xs uppercase tracking-widest text-[#00BFFF]">
              {form.category}
            </p>

            <h3 className="mt-2 font-semibold">
              {form.title}
            </h3>

            <p className="mt-2 text-sm text-white/60">
              {form.description}
            </p>

            <p className="mt-4 text-xs text-white/50">
              Provisional Bug Score:{' '}
              <span className="text-[#39FF14] font-semibold">
                {previewScore.toFixed(1)}
              </span>
            </p>
          </div>

          <button
            onClick={resetForm}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white/10 ring-1 ring-white/15 px-5 py-2.5 text-sm font-medium hover:bg-white/15"
          >
            Submit another bug
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#39FF14]">
            Submit a Bug
          </p>

          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            Seen a real problem in NZ?
          </h1>

          <p className="mt-4 text-white/70 max-w-2xl">
            Share it here. Keep it clear, practical and non-confidential. We use these to help founders, students, councils and communities know what to build next.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={onSubmit} className="space-y-6">
          <Field label="Problem title" required>
            <input
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Why is X still so hard in NZ?"
              className="input"
            />
          </Field>

          <Field label="Problem description" required>
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Describe the problem in 2 to 4 sentences. Who feels it? When does it happen? Why is it still unsolved?"
              className="input resize-y"
            />
          </Field>

          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Category" required>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="input"
              >
                <option value="">Choose...</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Region" required>
              <select
                value={form.region}
                onChange={(e) => set('region', e.target.value)}
                className="input"
              >
                <option value="">Choose...</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Who faces this?" required>
              <select
                value={form.audience}
                onChange={(e) => set('audience', e.target.value)}
                className="input"
              >
                <option value="">Choose...</option>
                {AUDIENCES.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="How often does it happen?">
              <div className="flex flex-wrap gap-2">
                {FREQ_OPTIONS.map((f) => (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => set('frequency', f.value)}
                    className={`px-3 py-2 rounded-md text-xs font-semibold ring-1 transition-colors ${
                      form.frequency === f.value
                        ? 'bg-[#00BFFF] text-black ring-[#00BFFF]'
                        : 'bg-white/5 text-white/80 ring-white/10 hover:bg-white/10'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </Field>

            <Field label={`How painful is it? ${form.pain}/10`}>
              <input
                type="range"
                min={1}
                max={10}
                value={form.pain}
                onChange={(e) => set('pain', e.target.value)}
                className="w-full accent-[#00BFFF]"
              />

              <p className="text-xs text-white/40 mt-1">
                1 = minor irritation. 10 = urgent or costly.
              </p>
            </Field>
          </div>

          <Field label="Are people paying for a workaround now?">
            <input
              value={form.paid_workaround}
              onChange={(e) => set('paid_workaround', e.target.value)}
              placeholder="e.g. paying $500 for independent inspection"
              className="input"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Your name (optional)">
              <input
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className="input"
              />
            </Field>

            <Field label="Email (optional)">
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="you@example.co.nz"
                className="input"
              />
            </Field>
          </div>

          <div className="rounded-xl bg-[#0d0d0f] ring-1 ring-white/10 p-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set('consent', e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#00BFFF]"
              />

              <span className="text-sm text-white/80">
                I understand that my submitted problem may be reviewed, edited, summarised and published publicly on What Bugs NZ?
              </span>
            </label>

            <p className="mt-3 text-xs text-white/50 inline-flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-[#FFD93B] shrink-0 mt-0.5" />
              Please do not submit private, medical, legal, financial or confidential information.
            </p>
          </div>

          {error && (
            <p className="text-sm text-[#FF7A59]">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-white/50">
              Provisional Bug Score preview:{' '}
              <span className="text-[#39FF14] font-semibold">
                {previewScore.toFixed(1)}
              </span>
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-[#00BFFF] text-black px-5 py-3 text-sm font-semibold hover:bg-[#33ccff] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Bug
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

const Field = ({ label, required, children }) => (
  <label className="block">
    <span className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">
      {label} {required && <span className="text-[#FF7A59]">*</span>}
    </span>
    {children}
  </label>
);

export default Submit;