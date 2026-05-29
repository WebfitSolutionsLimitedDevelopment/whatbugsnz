import React from 'react';
import { Link } from 'react-router-dom';
import { Bug } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#39FF14]/10 ring-1 ring-[#39FF14]/40">
              <Bug className="h-4 w-4 text-[#39FF14]" />
            </span>
            <span className="font-display text-white font-bold tracking-tight text-lg">
              What Bugs <span className="text-[#00BFFF]">NZ?</span>
            </span>
          </div>

          <p className="mt-4 text-sm max-w-md leading-relaxed">
            Aotearoa&apos;s problem list for people who want to build useful things. Scratch the
            surface. Find the problems worth solving.
          </p>

          <p className="mt-6 text-xs text-white/40">A Webfit News initiative</p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/insights" className="hover:text-white transition-colors">
                Insights
              </Link>
            </li>
            <li>
              <Link to="/top-10" className="hover:text-white transition-colors">
                Top 10 Bugs
              </Link>
            </li>
            <li>
              <Link to="/all-bugs" className="hover:text-white transition-colors">
                All Bugs
              </Link>
            </li>
            <li>
              <Link to="/mission" className="hover:text-white transition-colors">
                Mission
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
            Get Involved
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/submit" className="hover:text-white transition-colors">
                Submit a Bug
              </Link>
            </li>
            <li>
              <a href="#partner" className="hover:text-white transition-colors">
                Partner with Us
              </a>
            </li>
            <li>
              <a href="#sponsor" className="hover:text-white transition-colors">
                Sponsor a Problem Report
              </a>
            </li>
            <li>
              <a href="#founders" className="hover:text-white transition-colors">
                Join the Founder List
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} What Bugs NZ? - Insights are directional signals, not official statistics.
          </p>

          <p className="text-xs text-white/40">
            Powered by{' '}
            <a
              href="https://webfitt.co.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/70 hover:text-[#39FF14] transition-colors"
            >
              Webfit Solutions Limited
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;