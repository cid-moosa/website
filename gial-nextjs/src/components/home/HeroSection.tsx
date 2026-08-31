"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown, Compass, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface CampusSlide {
  image: string;
  title: string;
  subtitle: string;
  location: string;
}

const HERO_SLIDES: CampusSlide[] = [
  {
    image: "/images/campus-hero.jpg",
    title: "Girideepam Main Campus Block",
    subtitle: "Bethany Hills, Vadavathoor, Kottayam",
    location: "Main Academic Building",
  },
  {
    image: "/images/computer-lab.jpg",
    title: "Advanced AI & Computing Labs",
    subtitle: "Cyber Forensics & Software Engineering Center",
    location: "Tech Innovation Hub",
  },
  {
    image: "/images/library.jpg",
    title: "Central Digital & Research Library",
    subtitle: "Thousands of journals, research papers & e-resources",
    location: "Knowledge Center",
  },
  {
    image: "/images/campus-aerial.jpg",
    title: "Panoramic Green Hilltop Campus",
    subtitle: "Eco-friendly, serene learning environment in Kottayam",
    location: "Campus Grounds",
  },
  {
    image: "/images/classroom.jpg",
    title: "Smart Digital Classrooms",
    subtitle: "Interactive digital displays & ergonomic learning spaces",
    location: "Academic Complex",
  },
];

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Next slide helper
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-slide interval (5.5 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Calculate scroll progress over the first 500px of travel
  const scrollLimit = 500;
  const progress = Math.min(1, Math.max(0, scrollY / scrollLimit));

  // LERP easing: Ease out cubic
  const eased = 1 - Math.pow(1 - progress, 3);

  // Dynamic transforms: At top (scrollY = 0), text & vignette are 0% for pure photo clarity
  const titleTranslateY = (1 - eased) * 60;
  const contentOpacity = Math.max(0, Math.min(1, (progress - 0.04) / 0.6));
  const photoScale = 1 + eased * 0.06;
  const vignetteOpacity = eased * 0.75;

  return (
    <section className="relative min-h-[160vh] w-full p-0 m-0 overflow-visible">
      {/* Sticky Fullscreen Panoramic Viewport */}
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden p-0 m-0 inset-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Layered Cross-fading Panoramic Slides */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.image}
            className={`absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
            style={{
              backgroundImage: `url('${slide.image}')`,
              transform: `scale(${Math.max(1.02, photoScale)})`,
              transitionProperty: "opacity, transform",
              transitionDuration: idx === currentSlide ? "1000ms, 150ms" : "1000ms, 150ms",
            }}
          />
        ))}

        {/* Dynamic High-Contrast Vignette */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/85 transition-opacity duration-150 pointer-events-none z-1"
          style={{ opacity: vignetteOpacity }}
        />

        {/* Liquid Glass Refraction Ring */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.6)] z-2" />

        {/* Content Container (Glides smoothly up as you scroll) */}
        <div
          className={`container relative z-10 mx-auto px-6 max-w-5xl text-center transition-all duration-100 ease-out ${
            contentOpacity > 0.05 ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{
            transform: `translateY(${titleTranslateY}px)`,
            opacity: contentOpacity,
          }}
        >
          {/* Admissions Badge with Liquid Glass Glow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full border border-emerald-400/40 bg-black/45 text-emerald-300 text-[11px] sm:text-xs md:text-sm font-bold mb-4 md:mb-6 backdrop-blur-xl shadow-[0_0_25px_rgba(16,185,129,0.25)] max-w-[90vw]">
            <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-emerald-500"></span>
            </span>
            <span className="truncate">Admissions Open 2024-25 • M.G. University Affiliated</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 md:mb-6 font-[family-name:var(--font-outfit)] text-white leading-[1.12] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            Girideepam Institute <br />
            <span className="text-shimmer drop-shadow-[0_0_35px_rgba(16,185,129,0.4)]">
              of Advanced Learning
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-gray-100 mb-6 md:mb-10 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] px-2">
            In pursuit of academic excellence, technological innovation, and values-based higher education under the Bethany Navajyothi Province, Kottayam.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
            <Link
              href="/programs"
              className="group relative px-7 py-3.5 md:px-8 md:py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl overflow-hidden shadow-[0_10px_35px_-5px_rgba(16,185,129,0.5)] transition-all spring-bounce w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base"
            >
              <Sparkles size={16} />
              <span>Explore Programs</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href="/about"
              className="px-7 py-3.5 md:px-8 md:py-4 liquid-glass text-white font-semibold rounded-2xl hover:bg-white/20 transition-all spring-bounce w-full sm:w-auto flex items-center justify-center shadow-lg border border-white/20 backdrop-blur-2xl cursor-pointer text-sm md:text-base"
            >
              <Compass size={16} className="mr-2 text-emerald-400" />
              Discover GIAL Campus
            </Link>
          </div>
        </div>

        {/* ─── Smooth Liquid Glass Campus Slide Controller (Responsive) ─── */}
        <div className="absolute bottom-20 md:bottom-8 right-4 md:right-10 z-20 flex items-center gap-2 md:gap-3 animate-in fade-in duration-500 max-w-[95vw]">
          {/* Active Slide Info Pill */}
          <div className="liquid-glass px-3 py-1.5 md:px-4 md:py-2.5 rounded-2xl flex items-center gap-2 md:gap-3 text-white backdrop-blur-2xl border border-white/20 shadow-2xl">
            <div className="p-1 md:p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <MapPin size={12} className="md:w-3.5 md:h-3.5" />
            </div>
            <div className="text-left max-w-[140px] sm:max-w-[200px] truncate">
              <div className="text-[11px] md:text-xs font-bold text-white leading-tight drop-shadow-sm truncate">
                {HERO_SLIDES[currentSlide].title}
              </div>
              <div className="text-[9px] md:text-[10px] text-emerald-300 font-medium truncate">
                {HERO_SLIDES[currentSlide].location}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xl p-1 md:p-1.5 rounded-2xl border border-white/15">
            <button
              onClick={prevSlide}
              className="p-1.5 md:p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={14} className="md:w-4 md:h-4" />
            </button>
            <div className="flex items-center gap-1 px-0.5 md:px-1">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1 md:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide ? "w-4 md:w-6 bg-emerald-400" : "w-1 md:w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-1.5 md:p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={14} className="md:w-4 md:h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator Prompt (Visible when at top) */}
        {progress < 0.25 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/90 animate-bounce pointer-events-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300 drop-shadow-md">
              Scroll to Explore
            </span>
            <ChevronDown size={20} className="text-emerald-400" />
          </div>
        )}

        {/* Bottom Seamless Gradient Fade into Ticker */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--clr-bg-deep)] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
