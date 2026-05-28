import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Bug } from 'lucide-react';

const LINKS = [
  { to: '/insights', label: 'Insights' },
  { to: '/top-10', label: 'Top 10 Bugs' },
  { to: '/all-bugs', label: 'All Bugs' },
  { to: '/submit', label: 'Submit a Bug' },
  { to: '/mission', label: 'Mission' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#39FF14]/10 ring-1 ring-[#39FF14]/40">
            <Bug className="h-4 w-4 text-[#39FF14]" />
          </span>
          <span className="font-display text-white font-bold tracking-tight text-lg">
            What Bugs <span className="text-[#00BFFF]">NZ?</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/submit"
            className="ml-2 inline-flex items-center rounded-md bg-[#00BFFF] px-4 py-2 text-sm font-semibold text-black hover:bg-[#33ccff] transition-colors duration-200"
          >
            Submit a Bug
          </Link>
        </nav>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/95">
          <div className="px-4 py-3 flex flex-col gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md ${
                    isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
