"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme || "dark";

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    // If View Transition API is not supported or reduced motion is enabled, fallback to instant switch
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: currentTheme === "dark" ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 520,
          easing: "cubic-bezier(0.25, 1, 0.35, 1)",
          pseudoElement:
            currentTheme === "dark"
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={handleToggle}
      className="dock-control-btn w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl transition-colors flex items-center justify-center relative overflow-hidden group shadow-sm"
      aria-label="Toggle theme"
    >
      <div className="relative z-10 flex items-center justify-center w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out stroke-[2.4] ${
            currentTheme === "dark" 
              ? "opacity-0 rotate-90 scale-50" 
              : "opacity-100 rotate-0 scale-100 text-amber-600"
          }`} 
        />
        <Moon 
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out stroke-[2.4] ${
            currentTheme === "light" 
              ? "opacity-0 -rotate-90 scale-50" 
              : "opacity-100 rotate-0 scale-100 text-emerald-400"
          }`} 
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </button>
  );
}
