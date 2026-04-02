import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const year = new Date().getFullYear();

export default function Footer() {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm"
                style={{
                  background: "oklch(0.72 0.15 75)",
                  color: "oklch(0.18 0.06 250)",
                }}
              >
                EA
              </div>
              <span className="font-display font-bold text-xl">
                EmpowerAbility
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Providing compassionate, person-centred disability support
              services across Australia. NDIS registered and community focused.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              {[
                { label: "Home", href: "/" as const },
                { label: "Services", href: "/services" as const },
                { label: "About Us", href: "/about" as const },
                { label: "Contact", href: "/contact" as const },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4 text-white">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              {[
                { label: "Personal Care", id: "personal-care" },
                {
                  label: "Community Participation",
                  id: "community-participation",
                },
                {
                  label: "Supported Independent Living",
                  id: "supported-independent-living",
                },
                {
                  label: "Therapy & Allied Health",
                  id: "therapy-allied-health",
                },
              ].map((l) => (
                <li key={l.id}>
                  <Link
                    to="/services/$id"
                    params={{ id: l.id }}
                    className="hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-base mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold"
                  aria-hidden="true"
                />
                <span>
                  Level 5, 123 Pitt Street
                  <br />
                  Sydney NSW 2000
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone
                  className="w-4 h-4 flex-shrink-0 text-gold"
                  aria-hidden="true"
                />
                <a
                  href="tel:1800123456"
                  className="hover:text-gold transition-colors"
                >
                  1800 123 456
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail
                  className="w-4 h-4 flex-shrink-0 text-gold"
                  aria-hidden="true"
                />
                <a
                  href="mailto:hello@empowerability.com.au"
                  className="hover:text-gold transition-colors"
                >
                  hello@empowerability.com.au
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {year} EmpowerAbility. All rights reserved. NDIS Registered
            Provider.
          </p>
          <p>
            Built with{" "}
            <Heart className="w-3 h-3 inline text-gold" aria-hidden="true" />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              className="underline hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
