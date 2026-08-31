"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-xl bg-[var(--clr-bg-card)] border border-[var(--clr-border)] text-[var(--clr-text)] hover:bg-[var(--clr-bg-section)] transition-colors flex items-center justify-center relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <div className="relative z-10 flex items-center justify-center w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
            theme === "dark" 
              ? "opacity-0 rotate-90 scale-50" 
              : "opacity-100 rotate-0 scale-100 text-amber-500"
          }`} 
        />
        <Moon 
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
            theme === "light" 
              ? "opacity-0 -rotate-90 scale-50" 
              : "opacity-100 rotate-0 scale-100 text-emerald-400"
          }`} 
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </button>
  );
}
