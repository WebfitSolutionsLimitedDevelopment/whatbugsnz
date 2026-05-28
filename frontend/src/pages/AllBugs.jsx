import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BUGS, CATEGORIES, REGIONS, AUDIENCES } from '../data/mockData';
import { Plus, Minus, Filter, Search, X, ChevronRight } from 'lucide-react';

const SCORE_RANGES = [
  { label: '70+', min: 70 },
  { label: '80+', min: 80 },
  { label: '90+', min: 90 },
];

const AllBugs = () => {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('');
  const [region, setRegion] = useState('');
  const [audience, setAudience] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    return BUGS.filter((b) => {
      if (cat && b.category !== cat) return false;
      if (region && b.region !== region) return false;
      if (audience && b.audience !== audience) return false;
      if (minScore && b.bug_score < minScore) return false;
      if (query && !b.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, cat, region, audience, minScore]);

  const clearAll = () => {
    setQuery(''); setCat(''); setRegion(''); setAudience(''); setMinScore(0);
  };

  const FilterPanel = (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">Category</label>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="w-full bg-[#0d0d0f] ring-1 ring-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-[#00BFFF]">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">Region</label>
        <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full bg-[#0d0d0f] ring-1 ring-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-[#00BFFF]">
          <option value="">All regions</option>
          {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">Audience</label>
        <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full bg-[#0d0d0f] ring-1 ring-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-[#00BFFF]">
          <option value="">All audiences</option>
          {AUDIENCES.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">Score range</label>
        <div className="flex gap-2">
          {SCORE_RANGES.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setMinScore(minScore === s.min ? 0 : s.min)}
              className={`flex-1 rounded-md py-2 text-xs font-semibold ring-1 transition-colors ${
                minScore === s.min
                  ? 'bg-[#00BFFF] text-black ring-[#00BFFF]'
                  : 'bg-white/5 text-white/80 ring-white/10 hover:bg-white/10'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <button onClick={clearAll} className="w-full text-sm text-white/60 hover:text-white inline-flex items-center justify-center gap-1">
        <X className="h-3 w-3" /> Clear filters
      </button>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#39FF14]">Browse</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold tracking-tight">All Bugs</h1>
          <p className="mt-3 text-white/60 max-w-2xl">
            Filter by category, region, audience or score. Click + on any row to peek inside.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bugs (e.g. mould, GP, tradie)…"
              className="w-full bg-[#0d0d0f] ring-1 ring-white/10 rounded-md pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-[#00BFFF]"
            />
          </div>
          <button onClick={() => setMobileFilters(true)} className="lg:hidden inline-flex items-center gap-2 rounded-md ring-1 ring-white/15 px-3 py-2.5 text-sm">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block sticky top-20 self-start">
            <div className="rounded-xl bg-[#0a0a0a] ring-1 ring-white/10 p-5">
              <p className="text-sm font-semibold text-white mb-4 inline-flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#00BFFF]" /> Filters
              </p>
              {FilterPanel}
            </div>
          </aside>

          {/* Table */}
          <div className="min-w-0">
            <div className="rounded-xl bg-[#0a0a0a] ring-1 ring-white/10 overflow-hidden">
              <div className="hidden sm:grid grid-cols-[1fr_120px_180px_60px] gap-3 px-5 py-3 text-[11px] font-semibold tracking-widest uppercase text-white/50 border-b border-white/10">
                <span>Bug</span>
                <span className="text-right">Bug Score</span>
                <span>Sector</span>
                <span className="text-right">Action</span>
              </div>
              {filtered.length === 0 && (
                <div className="px-5 py-10 text-center text-white/50 text-sm">
                  No bugs match your filters. Try clearing them.
                </div>
              )}
              {filtered.map((b) => (
                <div key={b.id} className="border-b border-white/5 last:border-b-0">
                  <button
                    onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                    className="w-full grid grid-cols-[1fr_56px] sm:grid-cols-[1fr_120px_180px_60px] gap-3 px-5 py-4 text-left items-center hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm sm:text-base text-white font-medium leading-snug">
                      {b.title}
                      <span className="sm:hidden block text-xs text-white/50 mt-1">{b.sector} • {b.bug_score.toFixed(1)}</span>
                    </span>
                    <span className="hidden sm:block text-right font-display font-bold text-[#39FF14]">{b.bug_score.toFixed(1)}</span>
                    <span className="hidden sm:block text-xs text-white/60">{b.sector}</span>
                    <span className="justify-self-end inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white">
                      {expanded === b.id ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {expanded === b.id && (
                    <div className="bg-white text-neutral-900 px-5 sm:px-7 py-6">
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                          <div>
                            <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Problem detail</p>
                            <p className="mt-1 text-sm leading-relaxed">{b.description}</p>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Who is affected</p>
                              <p className="text-sm mt-1">{b.audience} — {b.region}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Why current solutions are weak</p>
                              <p className="text-sm mt-1">{b.why_current_solutions_fail}</p>
                            </div>
                            <div className="sm:col-span-2">
                              <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Possible solution direction</p>
                              <p className="text-sm mt-1">{b.startup_opportunity}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-2">Scores</p>
                          <div className="rounded-lg bg-neutral-50 ring-1 ring-neutral-200 p-4 space-y-2">
                            {[
                              ['Pain', b.pain_score],
                              ['Market Size', b.market_size_score],
                              ['Opportunity Gap', b.opportunity_gap_score],
                              ['Frequency', b.frequency_score],
                            ].map(([label, val]) => (
                              <div key={label} className="flex items-center justify-between text-sm">
                                <span className="text-neutral-600">{label}</span>
                                <span className="font-semibold">{val}</span>
                              </div>
                            ))}
                            <div className="border-t border-neutral-200 pt-2 flex items-center justify-between">
                              <span className="text-sm font-semibold">Bug Score</span>
                              <span className="font-display text-xl font-bold text-[#0a4d99]">{b.bug_score.toFixed(1)}</span>
                            </div>
                          </div>
                          <Link to={`/bug/${b.slug}`} className="mt-4 inline-flex items-center gap-2 rounded-md bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800 transition-colors">
                            View full detail <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/40">{filtered.length} of {BUGS.length} bugs shown</p>
          </div>
        </div>
      </section>

      {/* Mobile filter sheet */}
      {mobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={() => setMobileFilters(false)}>
          <div onClick={(e) => e.stopPropagation()} className="absolute bottom-0 inset-x-0 rounded-t-2xl bg-[#0a0a0a] ring-1 ring-white/10 p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold inline-flex items-center gap-2"><Filter className="h-4 w-4 text-[#00BFFF]" /> Filters</p>
              <button onClick={() => setMobileFilters(false)} className="text-white/60"><X className="h-5 w-5" /></button>
            </div>
            {FilterPanel}
            <button onClick={() => setMobileFilters(false)} className="mt-6 w-full rounded-md bg-[#00BFFF] text-black py-2.5 text-sm font-semibold">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBugs;
