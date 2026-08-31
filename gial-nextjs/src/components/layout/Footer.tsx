import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 glass-heavy border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-shimmer font-[family-name:var(--font-outfit)] mb-4">
              GIAL
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Girideepam Institute of Advanced Learning — established under the
              Bethany Navajyothi Educational Society, affiliated to Mahatma
              Gandhi University, Kottayam.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400/70">
              <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                ISO 9001:2015
              </span>
              <span className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400/70">
                AICTE Approved
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Programs", href: "/programs" },
                { label: "About GIAL", href: "/about" },
                { label: "Notices & Circulars", href: "/notices" },
                { label: "IQAC & Compliance", href: "/compliance/iqac" },
                { label: "Grievance Portal", href: "/grievance" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "BBA", href: "/programs/bba" },
                { label: "BCA", href: "/programs/bca" },
                { label: "B.Sc Cyber Forensics", href: "/programs/cyber" },
                { label: "B.Sc Psychology", href: "/programs/psychology" },
                { label: "B.Com Programs", href: "/programs/bcom-acc" },
                { label: "MSW", href: "/programs/msw" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                <span>
                  Girideepam Campus, Vadavathoor P.O., Kottayam, Kerala 686010
                </span>
              </li>
              <li>
                <a
                  href="tel:+917592802949"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Phone size={16} className="text-emerald-500 shrink-0" />
                  +91 7592802949
                </a>
              </li>
              <li>
                <a
                  href="mailto:girideepamcollege@gmail.com"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Mail size={16} className="text-emerald-500 shrink-0" />
                  girideepamcollege@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Girideepam Institute of Advanced
            Learning. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>AICTE Approval No: F.No. 1-62/AICTE</span>
            <span className="hidden md:inline">•</span>
            <span>MG University Affiliation: 2018/Aff/MG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
