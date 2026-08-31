"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: "dot" | "emoji";
  emoji: string | null;
};

// ─── Domain Specific Color & Emoji Palettes ─────────────────────────
const DOMAIN_PALETTES: Record<string, { colors: string[]; emojis: string[]; lineHue: number }> = {
  // 1. Cyber Forensics: Pure Terminal Green (Used for Light Mode or particle mode)
  cyber: {
    colors: ["#00ff66", "#34d399", "#22c55e", "#10b981"],
    emojis: ["01", "0x", "FF", "⚡", "🛡️"],
    lineHue: 145,
  },
  // 2. BBA: Yellow and Gold with Sapphire Blue
  bba: {
    colors: ["#fbbf24", "#f59e0b", "#60a5fa", "#3b82f6", "#fde047"],
    emojis: ["📈", "▲", "ROI", "💼", "📊"],
    lineHue: 45,
  },
  // 3. BCA: Emerald Green & Tech Cyan logic shades
  bca: {
    colors: ["#10b981", "#34d399", "#22c55e", "#06b6d4", "#059669"],
    emojis: ["</>", "AI", "&&", "{}", "💻"],
    lineHue: 155,
  },
  // 4. Psychology: Electric Purple & Fuchsia Synaptic Mesh
  psychology: {
    colors: ["#a855f7", "#e879f9", "#c084fc", "#9333ea", "#d8b4fe"],
    emojis: ["Ψ", "🧠", "α", "β", "∞"],
    lineHue: 280,
  },
  // 5. Commerce / B.Com Accounting & Finance: Green and Yellow wealth theme
  commerce: {
    colors: ["#10b981", "#fbbf24", "#34d399", "#f59e0b", "#059669"],
    emojis: ["₹", "$", "€", "∑", "∆"],
    lineHue: 155,
  },
  // 6. Logistics & Supply Chain: Sky Blue & Marine Teal trade route
  logistics: {
    colors: ["#38bdf8", "#14b8a6", "#5eead4", "#0284c7", "#0d9488"],
    emojis: ["⚓", "🚢", "✈️", "📦"],
    lineHue: 195,
  },
  // 7. MSW (Social Work): Peach / Coral Rose & Gold empathy mesh
  msw: {
    colors: ["#fb923c", "#f59e0b", "#fb7185", "#fdba74", "#f43f5e"],
    emojis: ["🤝", "♥", "★", "👥"],
    lineHue: 25,
  },
  // 8. Global / Home: COMBINED ALL Colors & Emojis from ALL Programs
  global: {
    colors: [
      "#fbbf24", "#60a5fa", // BBA
      "#3b82f6", "#22c55e", // BCA
      "#00ff66", "#34d399", // Cyber
      "#a855f7", "#e879f9", // Psychology
      "#10b981", "#f59e0b", // Commerce
      "#38bdf8", "#14b8a6", // Logistics
      "#fb923c", "#fb7185", // MSW
    ],
    emojis: [
      "📈", "💼", "📊", // BBA
      "</>", "AI", "💻", // BCA
      "⚡", "🛡️", "01", // Cyber
      "Ψ", "🧠", "∞", // Psychology
      "₹", "$", "∑", // Commerce
      "⚓", "✈️", "📦", // Logistics
      "🤝", "♥", "👥", // MSW
    ],
    lineHue: 155,
  },
};

const MATRIX_CHARS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEF:・."=*+-<>¦|_';

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const pathname = usePathname();
  const { theme } = useTheme();

  // Resolve current active theme palette based on URL
  const getActivePalette = useCallback(() => {
    if (!pathname || !pathname.includes("/programs/")) return DOMAIN_PALETTES.global;
    
    const slug = pathname.toLowerCase();
    if (slug.includes("cyber")) return DOMAIN_PALETTES.cyber;
    if (slug.includes("psychology") || slug.includes("psych")) return DOMAIN_PALETTES.psychology;
    if (slug.includes("bca")) return DOMAIN_PALETTES.bca;
    if (slug.includes("bba") || slug.includes("management")) return DOMAIN_PALETTES.bba;
    if (slug.includes("logistics") || slug.includes("log")) return DOMAIN_PALETTES.logistics;
    if (slug.includes("msw") || slug.includes("social")) return DOMAIN_PALETTES.msw;
    if (slug.includes("bcom") || slug.includes("commerce") || slug.includes("mcom")) return DOMAIN_PALETTES.commerce;
    
    return DOMAIN_PALETTES.global;
  }, [pathname]);

  const activePalette = getActivePalette();
  const isCyber = pathname?.toLowerCase().includes("cyber");

  const initParticles = useCallback((w: number, h: number, palette = activePalette) => {
    const count = Math.min(130, Math.max(75, Math.floor((w * h) / 10500)));
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const isEmoji = Math.random() > 0.82;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.95,
        vy: (Math.random() - 0.5) * 0.95,
        size: isEmoji ? Math.random() * 8 + 14 : Math.random() * 2.5 + 1.2,
        color: palette.colors[Math.floor(Math.random() * palette.colors.length)],
        type: isEmoji ? "emoji" : "dot",
        emoji: isEmoji ? palette.emojis[Math.floor(Math.random() * palette.emojis.length)] : null,
      });
    }
    particlesRef.current = particles;
  }, [activePalette]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseOut = () => {
      mouseRef.current = { x: -999, y: -999 };
    };
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initCMatrix();
      initParticles(w, h, activePalette);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("resize", onResize);

    // ─── Cyber Matrix Rain Streams ──────────────────────────────
    let matrixStreams: any[] = [];
    const charSize = 16;
    let cols = Math.floor(w / charSize);
    let rows = Math.floor(h / charSize) + 2;

    function createMatrixStream(xIndex: number) {
      const trailLen = Math.floor(Math.random() * 16) + 12;
      const speed = Math.random() * 0.35 + 0.22;
      const headY = Math.random() * -rows;
      const chars: string[] = [];
      for (let r = 0; r < rows + 35; r++) {
        chars[r] = MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length));
      }
      return { col: xIndex, headY, speed, trailLen, chars };
    }

    function initCMatrix() {
      cols = Math.floor(w / charSize);
      rows = Math.floor(h / charSize) + 2;
      matrixStreams = [];
      for (let i = 0; i < cols; i++) {
        matrixStreams.push(createMatrixStream(i));
      }
    }

    initCMatrix();
    initParticles(w, h, activePalette);

    // ─── Main Animation Render Loop ─────────────────────────────
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const mouse = mouseRef.current;
      const currentTheme = document.documentElement.getAttribute("data-theme") || theme || "dark";
      const isLight = currentTheme === "light";
      
      // Easter Egg: Cyber program in Dark Mode = Matrix Rain, in Light Mode = Green Particles & Emojis
      const runMatrix = isCyber && !isLight;

      if (runMatrix) {
        // CMATRIX RAIN ENGINE (CYBER PROGRAM IN DARK MODE)
        ctx!.font = 'bold 15px "Courier New", Consolas, monospace';
        ctx!.textAlign = "center";
        const horizonRadius = 260;

        for (let i = 0; i < matrixStreams.length; i++) {
          const s = matrixStreams[i];
          s.headY += s.speed;
          const headInt = Math.floor(s.headY);
          const colX = s.col * charSize + charSize / 2;

          if (Math.random() > 0.65) {
            const mutIdx = Math.floor(Math.random() * s.chars.length);
            s.chars[mutIdx] = MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length));
          }

          for (let k = 0; k < s.trailLen; k++) {
            const charRow = headInt - k;
            if (charRow < 0 || charRow >= rows) continue;

            const char = s.chars[charRow % s.chars.length] || "0";
            const basePosY = charRow * charSize;

            let renderX = colX;
            let renderY = basePosY;

            // Gravitational Spacetime Curvature into Cursor
            if (mouse.x > 0 && mouse.y > 0) {
              const dx = mouse.x - colX;
              const dy = mouse.y - basePosY;
              const dist = Math.hypot(dx, dy);

              if (dist < horizonRadius) {
                const curveFactor = Math.pow((horizonRadius - dist) / horizonRadius, 1.55);
                renderX += (dx / (dist + 8)) * curveFactor * 95;
                renderY += (dy / (dist + 8)) * curveFactor * 45;
              }
            }

            const alpha = Math.max(0.08, 1 - k / s.trailLen);

            if (k === 0) {
              // Glowing White-Green Lead Head
              ctx!.fillStyle = "#ffffff";
              ctx!.shadowColor = "#00ff66";
              ctx!.shadowBlur = 10;
              ctx!.fillText(char, renderX, renderY);
              ctx!.shadowBlur = 0;
            } else {
              // Phosphor Emerald Tail
              ctx!.fillStyle = `rgba(0, 255, 102, ${alpha * 0.85})`;
              ctx!.fillText(char, renderX, renderY);
            }
          }

          if (s.headY - s.trailLen > rows) {
            s.headY = Math.random() * -15;
            s.speed = Math.random() * 0.35 + 0.22;
          }
        }
      } else {
        // DOMAIN THEMED CONSTELLATION MESH (All programs + Cyber in Light Mode)
        const particles = particlesRef.current;
        const lineHue = activePalette.lineHue;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;

          // Mouse absorption with curved gravity
          if (mouse.x > -900 && mouse.y > -900) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const MOUSE_RADIUS = 175;
            if (dist < MOUSE_RADIUS) {
              const force = Math.pow((MOUSE_RADIUS - dist) / MOUSE_RADIUS, 2);
              p.x += (dx / dist) * force * 4;
              p.y += (dy / dist) * force * 4;
              ctx!.beginPath();
              ctx!.strokeStyle = isLight
                ? `hsla(${lineHue}, 70%, 35%, ${(1 - dist / MOUSE_RADIUS) * 0.55})`
                : `hsla(${lineHue}, 80%, 65%, ${(1 - dist / MOUSE_RADIUS) * 0.5})`;
              ctx!.lineWidth = 1.2;
              ctx!.moveTo(p.x, p.y);
              ctx!.lineTo(mouse.x, mouse.y);
              ctx!.stroke();
            }
          }

          if (p.type === "emoji" && p.emoji) {
            ctx!.font = `${p.size}px Arial`;
            ctx!.fillText(p.emoji, p.x - p.size / 2, p.y + p.size / 2);
          } else {
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx!.fillStyle = p.color;
            ctx!.shadowColor = isLight ? "transparent" : p.color;
            ctx!.shadowBlur = isLight ? 0 : 8;
            ctx!.fill();
            ctx!.shadowBlur = 0;
          }

          // Constellation lines with Domain Hue
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const ddx = p.x - p2.x;
            const ddy = p.y - p2.y;
            const d = Math.sqrt(ddx * ddx + ddy * ddy);
            if (d < 135) {
              ctx!.beginPath();
              ctx!.strokeStyle = isLight
                ? `hsla(${lineHue}, 50%, 35%, ${(1 - d / 135) * 0.32})`
                : `hsla(${lineHue}, 65%, 60%, ${(1 - d / 135) * 0.38})`;
              ctx!.lineWidth = 0.85;
              ctx!.moveTo(p.x, p.y);
              ctx!.lineTo(p2.x, p2.y);
              ctx!.stroke();
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("resize", onResize);
    };
  }, [initParticles, isCyber, activePalette, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas particle-canvas--interactive"
      aria-hidden="true"
    />
  );
}
