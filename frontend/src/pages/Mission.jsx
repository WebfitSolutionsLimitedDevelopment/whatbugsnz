import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Megaphone, Handshake, Newspaper, Users } from 'lucide-react';

const pillars = [
  { icon: Megaphone, title: 'Share a Bug', text: 'Spotted a real Kiwi problem? Send it in. The list grows with every voice.', cta: { to: '/submit', label: 'Submit a Bug' } },
  { icon: Handshake, title: 'Partner with Us', text: 'Councils, universities, accelerators — partner on problem research that drives real outcomes.' },
  { icon: Newspaper, title: 'Sponsor a Problem Report', text: 'Fund a deep-dive report into a category that matters to your sector or region.' },
  { icon: Users, title: 'Join the Founder List', text: 'Get notified when new founder-shaped problems land in your interest area.' },
];

const Mission = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-80 w-[40rem] rounded-full bg-[#00BFFF]/10 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#39FF14]">Our Mission</p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Start building <span className="text-[#00BFFF]">now.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            New Zealand is full of everyday problems worth solving. Some are small frustrations. Some are serious gaps. Some could become startups. Some could become community solutions.
          </p>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">
            What Bugs NZ? brings these problems into one place so founders, students, businesses, councils and communities can understand what people actually need.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-5">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl bg-[#0d0d0f] ring-1 ring-white/10 hover:ring-white/30 p-7 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#00BFFF]/10 ring-1 ring-[#00BFFF]/40">
                  <p.icon className="h-5 w-5 text-[#00BFFF]" />
                </span>
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
              </div>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">{p.text}</p>
              {p.cta && (
                <Link to={p.cta.to} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#39FF14] hover:text-[#5dff45]">
                  {p.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">The database is the real product.</h2>
          <p className="mt-4 text-white/60">
            The scratch effect gets attention. The quality of NZ-specific bugs decides whether this becomes useful. Help us build a list worth building from.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/submit" className="inline-flex items-center gap-2 rounded-md bg-[#39FF14] text-black px-5 py-3 text-sm font-semibold hover:bg-[#5dff45] transition-colors">
              Submit a Bug <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/top-10" className="inline-flex items-center gap-2 rounded-md bg-white/5 ring-1 ring-white/15 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
              Explore Top 10
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
