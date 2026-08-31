"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Info,
  GraduationCap,
  ShieldCheck,
  Compass,
  Newspaper,
  Phone,
  Sparkles,
  CreditCard,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Laptop,
  Brain,
  BarChart3,
  Award,
  BookOpen,
  HeartHandshake,
} from "lucide-react";
import { NAV_ITEMS } from "@/types";
import { ThemeToggle } from "./ThemeToggle";

interface DockItem {
  label: string;
  href: string;
  icon: any;
  hasDropdown?: boolean;
}

const DOCK_ITEMS: DockItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Academics", href: "/programs", icon: GraduationCap, hasDropdown: true },
  { label: "IQAC", href: "/compliance/iqac", icon: ShieldCheck, hasDropdown: true },
  { label: "Campus Life", href: "/campus-life", icon: Compass },
  { label: "News & Notices", href: "/notices", icon: Newspaper },
  { label: "Contact", href: "/contact", icon: Phone },
];

const ACADEMICS_SUBMENU = [
  { name: "BBA — Business Administration", href: "/programs/bba", icon: BarChart3, badge: "UG" },
  { name: "BCA — Computer Applications", href: "/programs/bca", icon: Laptop, badge: "UG" },
  { name: "B.Sc Cyber Forensics", href: "/programs/bsc-cyber-forensics", icon: ShieldCheck, badge: "UG" },
  { name: "B.Sc Psychology", href: "/programs/bsc-psychology", icon: Brain, badge: "UG" },
  { name: "B.Com (Finance / CA / Logistics)", href: "/programs/bcom-finance-taxation", icon: BookOpen, badge: "UG" },
  { name: "M.Com (Finance / Marketing)", href: "/programs/mcom-finance", icon: Award, badge: "PG" },
  { name: "MSW (Master of Social Work)", href: "/programs/msw", icon: HeartHandshake, badge: "PG" },
];

const IQAC_SUBMENU = [
  { name: "IQAC Overview & Objectives", href: "/compliance/iqac" },
  { name: "Annual Quality Assurance Reports (AQAR)", href: "/compliance/iqac" },
  { name: "Minutes & Action Taken Reports", href: "/compliance/iqac" },
  { name: "Feedback & Compliance Mechanisms", href: "/compliance/iqac" },
];

export function Header() {
  const pathname = usePathname();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string, idx: number, hasDropdown?: boolean) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setHoveredIdx(idx);
    if (hasDropdown) setActiveDropdown(label);
    else setActiveDropdown(null);
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* ─── Minimal macOS Liquid Glass Dock ─── */}
      <div className="mac-dock-tray pointer-events-auto rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 flex items-center gap-1 sm:gap-1.5 transition-all duration-300 ease-out">
        {/* Monogram Finder Icon */}
        <Link
          href="/"
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-500/30 hover:scale-115 hover:-translate-y-1 transition-all duration-200 active:scale-95"
          aria-label="Girideepam College"
        >
          G
        </Link>

        {/* Dock Vertical Divider */}
        <div className="h-6 w-px bg-black/10 dark:bg-emerald-400/20 mx-0.5 sm:mx-1" />

        {/* Minimal macOS Dock Apps Grid */}
        <nav className="hidden md:flex items-center gap-1">
          {DOCK_ITEMS.map((item, idx) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const isHovered = hoveredIdx === idx;
            const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label, idx, item.hasDropdown)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Dock App Icon */}
                <Link
                  href={item.href}
                  className={`relative flex flex-col items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl transition-all duration-200 origin-bottom ${
                    isHovered
                      ? "scale-130 -translate-y-2 bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 shadow-lg ring-1 ring-emerald-400/40"
                      : isNeighbor
                      ? "scale-112 -translate-y-0.5 text-slate-950 dark:text-gray-100 bg-slate-200/80 dark:bg-emerald-500/10"
                      : isActive
                      ? "bg-emerald-500/25 text-emerald-800 dark:text-emerald-400 font-black"
                      : "text-slate-950 dark:text-gray-100 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-slate-200/70 dark:hover:bg-emerald-500/15"
                  }`}
                  aria-label={item.label}
                >
                  <item.icon
                    size={19}
                    className={`stroke-[2.4] ${
                      isActive
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-slate-950 dark:text-gray-100"
                    }`}
                  />

                  {/* Active App Indicator Dot */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-sm" />
                  )}
                </Link>

                {/* macOS Floating Tooltip Pill */}
                {isHovered && !activeDropdown && (
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/90 dark:bg-[#02180e]/95 text-white dark:text-emerald-300 border border-black/15 dark:border-emerald-400/30 text-[10px] font-black tracking-wide pointer-events-none whitespace-nowrap shadow-md animate-in fade-in zoom-in-90 duration-150">
                    {item.label}
                  </div>
                )}

                {/* ─── Minimal macOS Context Flyout ─── */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div
                    onMouseEnter={() => handleMouseEnter(item.label, idx, true)}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 animate-peek-expand z-50 origin-top"
                  >
                    {/* Caret Notch */}
                    <div className="w-3 h-3 rotate-45 mx-auto -mb-1.5 bg-white dark:bg-[#042416] border-t border-l border-black/15 dark:border-emerald-400/30 backdrop-blur-2xl relative z-10" />

                    {/* Flyout Window */}
                    <div className="mac-dock-flyout rounded-2xl p-2.5 w-[320px] overflow-hidden bg-white/95 dark:bg-[#042416]/95 border border-black/15 dark:border-emerald-400/30 shadow-2xl">
                      <div className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 px-2 py-1 mb-1 border-b border-black/10 dark:border-emerald-400/20 flex items-center justify-between">
                        <span>{item.label} Directory</span>
                        <Link href={item.href} className="hover:underline flex items-center gap-0.5 text-emerald-800 dark:text-emerald-400 font-bold">
                          <span>View All</span>
                          <ArrowRight size={9} />
                        </Link>
                      </div>

                      <div className="space-y-0.5">
                        {item.label === "Academics"
                          ? ACADEMICS_SUBMENU.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="group/sub flex items-center justify-between px-2.5 py-1.5 text-xs font-black text-slate-950 dark:text-gray-100 hover:bg-emerald-500/20 rounded-xl transition-all hover:translate-x-1"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <sub.icon size={13} className="text-emerald-700 dark:text-emerald-400 flex-shrink-0 stroke-[2.5]" />
                                  <span className="truncate">{sub.name}</span>
                                </div>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/10 dark:bg-emerald-500/20 text-slate-900 dark:text-emerald-300">
                                  {sub.badge}
                                </span>
                              </Link>
                            ))
                          : IQAC_SUBMENU.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="block px-2.5 py-1.5 text-xs font-black text-slate-950 dark:text-gray-100 hover:bg-emerald-500/20 rounded-xl transition-all hover:translate-x-1"
                              >
                                {sub.name}
                              </Link>
                            ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Dock Vertical Divider */}
        <div className="h-6 w-px bg-black/20 dark:bg-emerald-400/20 mx-0.5 sm:mx-1" />

        {/* Right Dock Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Theme Switcher App */}
          <div className="hover:scale-120 hover:-translate-y-1 transition-all duration-200">
            <ThemeToggle />
          </div>

          {/* Fee Payment App Icon */}
          <Link
            href="/admissions"
            className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl border border-black/20 dark:border-emerald-400/20 bg-slate-200/80 dark:bg-emerald-500/10 text-slate-950 dark:text-gray-100 hover:scale-120 hover:-translate-y-1 hover:bg-emerald-500/20 transition-all duration-200 shadow-sm"
            aria-label="Fee Payment"
            title="Fee Payment"
          >
            <CreditCard size={18} className="stroke-[2.4] text-slate-950 dark:text-gray-100" />
          </Link>

          {/* Apply Now Pill */}
          <Link
            href="/admissions"
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white text-xs font-black shadow-md shadow-emerald-500/30 hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-200"
          >
            <Sparkles size={13} />
            <span className="hidden sm:inline">Apply</span>
          </Link>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-950 dark:text-white hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-colors"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Drawer ─── */}
      {menuOpen && (
        <div className="mac-dock-flyout pointer-events-auto absolute top-16 left-4 right-4 rounded-3xl p-5 space-y-2 animate-in fade-in zoom-in-95 slide-in-from-top-3 duration-250 shadow-2xl max-w-md mx-auto">
          {DOCK_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 rounded-2xl text-sm font-bold text-black dark:text-gray-100 hover:bg-emerald-500/15 transition-colors"
            >
              <item.icon size={18} className="text-emerald-600 dark:text-emerald-400" />
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="pt-3 border-t border-black/10 dark:border-white/10 flex gap-2">
            <Link
              href="/admissions"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2.5 text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-2xl shadow-lg shadow-emerald-500/25 active:scale-95 transition-transform"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
