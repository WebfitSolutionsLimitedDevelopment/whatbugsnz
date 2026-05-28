import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Users } from 'lucide-react';

const categoryAccent = (cat) => {
  const map = {
    'Housing & Renting': '#39FF14',
    'Tradies & Home Services': '#FFB020',
    'Healthcare & GP Access': '#FF5577',
    'Jobs & Careers': '#00BFFF',
    'Immigration & Settlement': '#A78BFA',
    'Community & Events': '#FFD166',
    'Small Business & SMEs': '#34D399',
    'Transport & Parking': '#60A5FA',
    'Students & Education': '#F472B6',
    'Elderly Care': '#FCA5A5',
    'Food & Grocery': '#86EFAC',
    'Digital & Government Services': '#93C5FD',
    'Environment & Sustainability': '#4ADE80',
    'Finance & Payments': '#FDE68A',
    'Tourism & Travel': '#7DD3FC',
    'Rural & Regional NZ': '#FCD34D',
    'Childcare & Parenting': '#F9A8D4',
  };
  return map[cat] || '#00BFFF';
};

const BugCard = ({ bug, index }) => {
  const accent = categoryAccent(bug.category);
  return (
    <Link
      to={`/bug/${bug.slug}`}
      className="group relative block rounded-2xl bg-[#0d0d0f] ring-1 ring-white/10 hover:ring-white/30 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,191,255,0.35)]"
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: accent }}
      />
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold" style={{ color: accent }}>
              {bug.category}
            </p>
            {typeof index === 'number' && (
              <p className="mt-1 text-xs text-white/40">#{String(index + 1).padStart(2, '0')}</p>
            )}
          </div>
          <div className="shrink-0 rounded-md bg-white/5 ring-1 ring-white/10 px-2 py-1 text-right">
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Bug Score</p>
            <p className="font-display text-lg font-bold text-white leading-none">
              {bug.bug_score.toFixed(1)}
            </p>
          </div>
        </div>
        <h3 className="mt-5 text-white text-lg sm:text-xl font-semibold leading-snug">
          {bug.title}
        </h3>
        <div className="mt-6 flex items-center justify-between text-xs text-white/50">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {bug.region}</span>
            <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {bug.audience}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-white/70 group-hover:text-white transition-colors">
            View <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BugCard;
