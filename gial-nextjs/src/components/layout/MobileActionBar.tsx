"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, FileText, Phone, Sparkles } from "lucide-react";

export function MobileActionBar() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) return null;

  const tabs = [
    { label: "Home", href: "/", icon: Home },
    { label: "Programs", href: "/programs", icon: BookOpen },
    { label: "Apply", href: "/admissions", icon: Sparkles, highlight: true },
    { label: "Notices", href: "/notices", icon: FileText },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 pointer-events-none flex justify-center">
      <nav
        className="pointer-events-auto liquid-glass rounded-full px-3 py-1.5 flex items-center justify-around w-full max-w-md border border-[var(--clr-border)] shadow-[0_15px_35px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
        style={{
          backdropFilter: "blur(28px) saturate(200%)",
          WebkitBackdropFilter: "blur(28px) saturate(200%)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href !== "/" && pathname?.startsWith(tab.href));

          if (tab.highlight) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center justify-center -mt-4 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white w-12 h-12 rounded-full shadow-lg shadow-emerald-500/30 transition-transform active:scale-95"
              >
                <tab.icon size={18} />
                <span className="text-[8px] font-bold mt-0.5 tracking-tight">Apply</span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-95 ${
                isActive
                  ? "text-emerald-600 dark:text-emerald-400 font-bold"
                  : "text-black/80 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-white font-medium"
              }`}
            >
              <tab.icon size={18} className={`transition-transform ${isActive ? "scale-110" : ""}`} />
              <span className="text-[9px] mt-0.5 tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-emerald-500 mt-0.5" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
