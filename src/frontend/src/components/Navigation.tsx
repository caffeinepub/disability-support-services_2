import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useScrollNav } from "../hooks/useScrollNav";

const NAV_LINKS = [
  { label: "Home", href: "/" as const },
  { label: "Services", href: "/services" as const },
  { label: "About", href: "/about" as const },
  { label: "Contact", href: "/contact" as const },
];

export default function Navigation() {
  const scrolled = useScrollNav();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-sm shadow-card"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          aria-label="EmpowerAbility – Home"
          data-ocid="nav.link"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm"
            style={{
              background: "oklch(0.72 0.15 75)",
              color: "oklch(0.18 0.06 250)",
            }}
          >
            EA
          </div>
          <span
            className={`font-display font-bold text-xl tracking-tight transition-colors ${
              transparent ? "text-white" : "text-navy"
            }`}
          >
            EmpowerAbility
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              location.pathname === link.href ||
              (link.href !== "/" && location.pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    transparent
                      ? active
                        ? "text-gold bg-white/10"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                      : active
                        ? "text-navy font-semibold"
                        : "text-muted-foreground hover:text-navy"
                  }`}
                  aria-current={active ? "page" : undefined}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 bg-gold text-navy shadow-navy hover:brightness-105 active:scale-95"
            data-ocid="nav.primary_button"
          >
            Get Started{" "}
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className={`md:hidden p-2 rounded-lg transition-colors ${
            transparent
              ? "text-white hover:bg-white/10"
              : "text-navy hover:bg-muted"
          }`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-white border-t border-border shadow-lift animate-fade-in-up"
          aria-label="Mobile navigation"
        >
          <ul className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const active =
                location.pathname === link.href ||
                (link.href !== "/" && location.pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary/8 text-navy font-semibold"
                        : "text-muted-foreground hover:text-navy hover:bg-muted"
                    }`}
                    aria-current={active ? "page" : undefined}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 mt-3 px-5 py-3 rounded-full text-sm font-semibold bg-gold text-navy w-full transition-all hover:brightness-105"
                data-ocid="nav.primary_button"
              >
                Get Started{" "}
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
