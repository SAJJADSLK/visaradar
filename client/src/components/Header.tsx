/* =============================================================
   Header — SpinPick Clone
   Sticky top nav with logo, links, and "New Wheel" CTA button
   ============================================================= */

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "My Wheels", href: "/wheels" },
  { label: "Teams", href: "/teams" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-purple-300 transition-shadow duration-200">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill="white" />
                <path d="M8 1 A7 7 0 0 1 15 8" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M15 8 A7 7 0 0 1 8 15" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M8 15 A7 7 0 0 1 1 8" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M1 8 A7 7 0 0 1 8 1" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <span
              className="text-lg font-bold text-gray-900"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              SpinPick
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  location === link.href
                    ? "text-purple-700 bg-purple-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/wheel/new">
              <button className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm hover:shadow-purple-200 transition-all duration-200 active:scale-95">
                New Wheel
              </button>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/wheel/new" onClick={() => setMobileOpen(false)}>
            <button className="mt-1 w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-sm">
              New Wheel
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
