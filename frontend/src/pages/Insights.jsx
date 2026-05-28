import React from 'react';
import { Link } from 'react-router-dom';
import { INSIGHT_CARDS, INSIGHT_DATA_BLOCKS, TOP_CATEGORIES_REPORTED, HIGHEST_SCORES, FOUNDER_SIGNALS, COMMUNITY_SIGNALS } from '../data/mockData';
import { AlertTriangle, Home as HomeIcon, Key, Receipt, Ticket, Sparkles, ArrowRight } from 'lucide-react';

const shapeIcon = {
  warning: AlertTriangle,
  ticket: Ticket,
  house: HomeIcon,
  receipt: Receipt,
  key: Key,
  asterisk: Sparkles,
};

const FloatingCard = ({ card, className = '', accent = 'blue' }) => {
  const Icon = shapeIcon[card.shape] || Sparkles;
  const bgs = {
    blue: 'bg-[#0a4d99] text-white',
    yellow: 'bg-[#FFD93B] text-black',
    white: 'bg-white text-black',
    dark: 'bg-[#111827] text-white',
    green: 'bg-[#39FF14] text-black',
    coral: 'bg-[#FF7A59] text-white',
  };
  return (
    <div className={`relative rounded-xl shadow-lg ring-1 ring-black/5 px-5 py-4 ${bgs[accent]} ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 shrink-0" />
        <p className="text-[11px] sm:text-xs font-bold tracking-wider leading-snug">{card.text}</p>
      </div>
    </div>
  );
};

const Insights = () => {
  return (
    <div className="bg-[#f3f4f6] text-neutral-900 min-h-screen">
      {/* HERO with floating cards */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#0a4d99] uppercase">Insights</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95] text-neutral-900">
            NZ spoke. <br className="hidden sm:block" />
            <span className="text-[#0a4d99]">Here&apos;s what bugs us.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-neutral-600 leading-relaxed">
            These are not just complaints. They are signals. Every bug submitted by New Zealanders helps show where people are frustrated, where current solutions are weak, and where someone could build something better.
          </p>

          {/* Floating insight cards */}
          <div className="relative mt-14 h-[460px] sm:h-[520px]">
            <FloatingCard card={INSIGHT_CARDS[0]} accent="yellow" className="absolute left-0 top-2 w-60 -rotate-3" />
            <FloatingCard card={INSIGHT_CARDS[1]} accent="blue" className="absolute left-1/3 top-0 w-64 rotate-2" />
            <FloatingCard card={INSIGHT_CARDS[2]} accent="white" className="absolute right-2 top-10 w-60 -rotate-2" />
            <FloatingCard card={INSIGHT_CARDS[3]} accent="dark" className="absolute left-8 top-44 w-64 rotate-1" />
            <FloatingCard card={INSIGHT_CARDS[4]} accent="coral" className="absolute right-1/4 top-56 w-60 -rotate-3" />
            <FloatingCard card={INSIGHT_CARDS[5]} accent="green" className="absolute right-2 bottom-4 w-56 rotate-2" />

            {/* Decorative shapes */}
            <div className="absolute left-1/2 top-32 -translate-x-1/2 h-16 w-16 rotate-45 bg-[#0a4d99] rounded-md hidden sm:block" />
            <div className="absolute right-1/3 bottom-20 h-10 w-10 bg-[#FFD93B] rounded-full hidden sm:block" />
            <div className="absolute left-12 bottom-8 text-5xl text-[#0a4d99] font-bold hidden sm:block">*</div>
          </div>
        </div>
      </section>

      {/* Data blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">At a glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {INSIGHT_DATA_BLOCKS.map((b) => (
            <div key={b.label} className="rounded-xl bg-white ring-1 ring-neutral-200 p-5 hover:shadow-md transition-shadow">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">{b.label}</p>
              <p className="mt-2 font-display text-lg sm:text-xl font-bold text-neutral-900 leading-snug">{b.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What NZ is reporting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold">What NZ is reporting</h3>
            <ul className="mt-5 space-y-2">
              {TOP_CATEGORIES_REPORTED.map((c, i) => (
                <li key={c} className="flex items-center justify-between bg-white ring-1 ring-neutral-200 rounded-lg px-4 py-3">
                  <span className="text-sm font-medium text-neutral-800">{i + 1}. {c}</span>
                  <span className="text-xs text-neutral-500">reported</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold">Highest Bug Scores</h3>
            <ul className="mt-5 space-y-2">
              {HIGHEST_SCORES.map((h) => (
                <li key={h.label} className="flex items-center justify-between bg-white ring-1 ring-neutral-200 rounded-lg px-4 py-3">
                  <span className="text-sm font-medium text-neutral-800">{h.label}</span>
                  <span className="text-sm font-bold text-[#0a4d99]">{h.score.toFixed(1)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Founder + Community Signals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="rounded-2xl bg-white ring-1 ring-neutral-200 p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-widest text-[#0a4d99] uppercase">Founder opportunity signals</p>
            <h3 className="mt-2 font-display text-2xl font-bold">Where smart Kiwis could start</h3>
            <ul className="mt-5 space-y-3">
              {FOUNDER_SIGNALS.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-neutral-800">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#0a4d99] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-neutral-900 text-white p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-widest text-[#39FF14] uppercase">Community impact signals</p>
            <h3 className="mt-2 font-display text-2xl font-bold">Where communities could lead</h3>
            <ul className="mt-5 space-y-3">
              {COMMUNITY_SIGNALS.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#39FF14] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
            <Link to="/all-bugs" className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#00BFFF] text-black px-4 py-2 text-sm font-semibold hover:bg-[#33ccff] transition-colors">
              Browse All Bugs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs text-neutral-500 leading-relaxed max-w-3xl">
            <span className="font-semibold text-neutral-700">Data disclaimer:</span> Insights are based on submitted problems, public feedback, research signals and editorial review. They should be treated as directional signals, not official statistics.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Insights;
