import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BUGS } from '../data/mockData';
import { ArrowLeft, MapPin, Users, Share2, Send, ChevronRight, ArrowUpRight } from 'lucide-react';

const Row = ({ label, val }) => (
  <div className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-b-0">
    <span className="text-white/60">{label}</span>
    <span className="font-semibold text-white">{val}</span>
  </div>
);

const BugDetail = () => {
  const { slug } = useParams();
  const bug = BUGS.find((b) => b.slug === slug);

  if (!bug) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-white/60">Bug not found.</p>
        <Link to="/all-bugs" className="mt-4 inline-flex items-center gap-2 text-[#00BFFF] hover:text-[#33ccff]">
          <ArrowLeft className="h-4 w-4" /> Back to All Bugs
        </Link>
      </div>
    );
  }

  const related = BUGS.filter((b) => b.category === bug.category && b.id !== bug.id).slice(0, 3);

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/all-bugs" className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">
            <ArrowLeft className="h-3 w-3" /> All Bugs
          </Link>
          <p className="mt-4 text-xs font-semibold tracking-widest uppercase text-[#00BFFF]">{bug.category}</p>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">{bug.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {bug.region}</span>
            <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {bug.audience}</span>
            <span className="inline-flex items-center gap-1 text-[#39FF14] font-semibold">Bug Score {bug.bug_score.toFixed(1)}</span>
            <span className="inline-flex items-center gap-1">Difficulty: {bug.difficulty_level}</span>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-[1fr_320px] gap-10">
        <div className="space-y-8">
          <Section title="Problem detail">{bug.description}</Section>
          <Section title="Why it matters">{bug.why_matters}</Section>
          <Section title="Current workaround">{bug.current_workaround}</Section>
          <Section title="Why current solutions fail">{bug.why_current_solutions_fail}</Section>
          <div className="grid sm:grid-cols-2 gap-5">
            <SubCard title="Possible startup idea" text={bug.startup_opportunity} accent="#00BFFF" />
            <SubCard title="Possible community solution" text={bug.community_opportunity} accent="#39FF14" />
            <SubCard title="Council / government angle" text={bug.government_angle} accent="#FFD93B" />
            <SubCard title="Monetisation opportunity" text="Subscription, sponsored reports, and lead-gen to verified providers in this category." accent="#FF7A59" />
          </div>
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            <button className="inline-flex items-center gap-2 rounded-md bg-white/5 ring-1 ring-white/15 px-4 py-2 text-sm font-medium hover:bg-white/10">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <Link to="/submit" className="inline-flex items-center gap-2 rounded-md bg-[#00BFFF] text-black px-4 py-2 text-sm font-semibold hover:bg-[#33ccff]">
              <Send className="h-4 w-4" /> Submit a similar bug
            </Link>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl bg-[#0d0d0f] ring-1 ring-white/10 p-5">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3">Bug Score breakdown</p>
            <Row label="Pain" val={bug.pain_score} />
            <Row label="Market Size" val={bug.market_size_score} />
            <Row label="Opportunity Gap" val={bug.opportunity_gap_score} />
            <Row label="Frequency" val={bug.frequency_score} />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold">Bug Score</span>
              <span className="font-display text-2xl font-bold text-[#39FF14]">{bug.bug_score.toFixed(1)}</span>
            </div>
          </div>

          {related.length > 0 && (
            <div className="rounded-xl bg-[#0d0d0f] ring-1 ring-white/10 p-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3">Related bugs</p>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link to={`/bug/${r.slug}`} className="group flex items-start gap-2 text-sm text-white/80 hover:text-white">
                      <ChevronRight className="h-4 w-4 text-[#00BFFF] mt-0.5 shrink-0" />
                      <span className="leading-snug">{r.short_title || r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/all-bugs" className="mt-4 inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">
                Browse all bugs <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-xs font-semibold tracking-widest uppercase text-white/50">{title}</h2>
    <p className="mt-2 text-white/80 leading-relaxed">{children}</p>
  </div>
);

const SubCard = ({ title, text, accent }) => (
  <div className="rounded-xl bg-[#0d0d0f] ring-1 ring-white/10 p-5">
    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>{title}</p>
    <p className="mt-2 text-sm text-white/80 leading-relaxed">{text}</p>
  </div>
);

export default BugDetail;
