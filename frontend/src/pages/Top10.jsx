import React, { useMemo } from 'react';
import BugCard from '../components/BugCard';
import { BUGS } from '../data/mockData';
import { Trophy } from 'lucide-react';

const Top10 = () => {
  const top = useMemo(
    () => BUGS.filter((b) => b.is_top_10).sort((a, b) => b.bug_score - a.bug_score).slice(0, 10),
    [],
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-[#00BFFF]/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#39FF14] inline-flex items-center gap-2">
            <Trophy className="h-4 w-4" /> The big ten
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-extrabold tracking-tight">
            Top 10 Bugs
          </h1>
          <p className="mt-4 max-w-2xl text-white/60">
            Ranked by Bug Score — a weighted blend of Pain, Market Size, Opportunity Gap and Frequency.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {top.map((b, i) => (
            <BugCard key={b.id} bug={b} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Top10;
