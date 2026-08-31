"use client";

import { useEffect, useState } from "react";

export function GlowOrbs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-amber-500/10 blur-[100px] animate-pulse" style={{ animationDelay: "4s" }} />
    </div>
  );
}
