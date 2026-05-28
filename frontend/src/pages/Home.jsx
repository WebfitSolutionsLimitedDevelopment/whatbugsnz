import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ScratchCard from '../components/ScratchCard';
import { BUGS } from '../data/mockData';
import { ArrowRight, Shuffle, Share2, Bookmark, ChevronRight, MapPin, Users, Bug as BugIcon } from 'lucide-react';

const Home = () => {
  const featured = useMemo(() => BUGS.filter((b) => b.is_top_10), []);
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * featured.length));
  const [revealed, setRevealed] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const bug = featured[idx];

  const nextBug = () => {
    let n = Math.floor(Math.random() * featured.length);
    if (n === idx) n = (n + 1) % featured.length;
    setIdx(n);
    setRevealed(false);
    setResetKey((k) => k + 1);
  };

  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#00BFFF]/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[#39FF14]/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#39FF14] uppercase">
                New Zealand&apos;s wishlist for founders, builders and communities
              </p>
              <h1 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95]">
                What Bugs <span className="text-[#00BFFF]">NZ?</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
                Aotearoa&apos;s problem list for people who want to build useful things. From housing and healthcare to tradies, jobs, transport, events and small business pain points — all in one place.
              </p>
              <p className="mt-3 text-base text-white/50 italic">Scratch the surface. Find the problems worth solving.</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/top-10" className="inline-flex items-center gap-2 rounded-md bg-[#00BFFF] px-5 py-3 text-sm font-semibold text-black hover:bg-[#33ccff] transition-colors">
                  Show Me Top Bugs <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/all-bugs" className="inline-flex items-center gap-2 rounded-md bg-white/5 ring-1 ring-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                  Nah, Show Me Everything
                </Link>
                <Link to="/submit" className="inline-flex items-center gap-2 rounded-md bg-transparent ring-1 ring-[#39FF14]/50 px-5 py-3 text-sm font-semibold text-[#39FF14] hover:bg-[#39FF14]/10 transition-colors">
                  Submit a Bug
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-xs text-white/40">
                <span className="inline-flex items-center gap-2"><BugIcon className="h-4 w-4 text-[#39FF14]" /> {BUGS.length}+ bugs catalogued</span>
                <span>20 categories</span>
                <span>9 regions</span>
              </div>
            </div>

            {/* Scratch card column */}
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-[#00BFFF]/10 via-transparent to-[#39FF14]/10 blur-2xl rounded-3xl pointer-events-none" />
              <div className="relative pb-16">
                <ScratchCard
                  revealed={revealed}
                  resetKey={resetKey}
                  onReveal={() => setRevealed(true)}
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-[#00BFFF] font-semibold">{bug.category}</p>
                    <h3 className="mt-3 text-white text-xl sm:text-2xl font-semibold leading-snug">
                      {bug.title}
                    </h3>
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/60">
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {bug.region}</span>
                      <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {bug.audience}</span>
                      <span className="inline-flex items-center gap-1 text-[#39FF14]">Bug Score {bug.bug_score.toFixed(1)}</span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <button onClick={nextBug} className="inline-flex items-center gap-1.5 rounded-md bg-white/5 hover:bg-white/10 ring-1 ring-white/10 px-3 py-2 text-xs font-medium text-white transition-colors">
                        <Shuffle className="h-3.5 w-3.5" /> Show Another Bug
                      </button>
                      <Link to={`/bug/${bug.slug}`} className="inline-flex items-center gap-1.5 rounded-md bg-[#00BFFF] hover:bg-[#33ccff] px-3 py-2 text-xs font-semibold text-black transition-colors">
                        View Full Bug <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                      <button className="inline-flex items-center gap-1.5 rounded-md bg-transparent hover:bg-white/5 ring-1 ring-white/10 px-3 py-2 text-xs font-medium text-white/70 transition-colors">
                        <Share2 className="h-3.5 w-3.5" /> Share
                      </button>
                      <button className="inline-flex items-center gap-1.5 rounded-md bg-transparent hover:bg-white/5 ring-1 ring-white/10 px-3 py-2 text-xs font-medium text-white/70 transition-colors">
                        <Bookmark className="h-3.5 w-3.5" /> Save
                      </button>
                    </div>
                  </div>
                </ScratchCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats strip */}
      <section className="border-y border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { k: '70%+', v: 'bugs have no trusted solution' },
            { k: '83.3', v: 'highest Bug Score so far' },
            { k: '20', v: 'problem categories tracked' },
            { k: '9', v: 'NZ regions covered' },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-display text-3xl sm:text-4xl font-bold text-white">{s.k}</p>
              <p className="text-xs sm:text-sm text-white/50 mt-1">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top bugs preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#39FF14] uppercase">A Sneak Peek</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">Top Kiwi problems worth solving</h2>
          </div>
          <Link to="/top-10" className="hidden sm:inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
            See all 10 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.slice(0, 6).map((b) => (
            <Link
              key={b.id}
              to={`/bug/${b.slug}`}
              className="group rounded-xl bg-[#0d0d0f] ring-1 ring-white/10 hover:ring-white/30 p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <p className="text-[11px] uppercase tracking-widest font-semibold text-[#00BFFF]">{b.category}</p>
                <span className="text-xs font-semibold text-[#39FF14]">{b.bug_score.toFixed(1)}</span>
              </div>
              <h3 className="mt-4 text-white font-semibold leading-snug">{b.title}</h3>
              <div className="mt-6 text-xs text-white/40 inline-flex items-center gap-1 group-hover:text-white/80">
                Read more <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              Seen something that bugs you in Aotearoa?
            </h2>
            <p className="mt-4 text-white/70 max-w-xl">
              Share a real problem. Founders, students, councils and communities use this list to find what to build next.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/submit" className="inline-flex items-center gap-2 rounded-md bg-[#39FF14] text-black px-5 py-3 text-sm font-semibold hover:bg-[#5dff45] transition-colors">
              Submit a Bug <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/mission" className="inline-flex items-center gap-2 rounded-md bg-white/5 ring-1 ring-white/15 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Read the Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
