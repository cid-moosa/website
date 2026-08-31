import Link from "next/link";
import {
  Compass,
  Sparkles,
  Users,
  Trophy,
  Coffee,
  BookOpen,
  Laptop,
  Music,
  Heart,
  ArrowRight,
  Shield,
} from "lucide-react";

export const metadata = {
  title: "Campus Life — Girideepam Institute of Advanced Learning",
  description: "Experience vibrant student life, clubs, cultural festivals, sports, and world-class facilities at GIAL Kottayam.",
};

const CLUBS = [
  {
    name: "ByteForge IT Club",
    dept: "Computer Applications & Cyber",
    desc: "Hackathons, competitive coding tournaments, CTF cybersecurity challenges, and AI workshops.",
    icon: Laptop,
    badge: "Tech & Cyber",
  },
  {
    name: "Excellencia Management Forum",
    dept: "Business Administration",
    desc: "Business plan pitches, corporate case studies, marketing fests, and entrepreneurship summits.",
    icon: Trophy,
    badge: "Leadership",
  },
  {
    name: "Commercio Society",
    dept: "Commerce & Finance",
    desc: "Stock market simulations, budget analyses, tax clinics, and logistics industry visits.",
    icon: BookOpen,
    badge: "Finance",
  },
  {
    name: "Sanctuary Social Action",
    dept: "Master of Social Work",
    desc: "Rural community immersion, tribal welfare projects, child education drives, and medical camps.",
    icon: Heart,
    badge: "Impact",
  },
  {
    name: "Psyche Wellbeing Guild",
    dept: "Psychology",
    desc: "Mental health awareness campaigns, psychological assessments, peer counseling, and mindfulness.",
    icon: Users,
    badge: "Wellness",
  },
  {
    name: "Cultural Arts & Music Troupe",
    dept: "Extracurriculars",
    desc: "Annual arts fest, theater productions, western and classical music bands, and dance competitions.",
    icon: Music,
    badge: "Arts",
  },
];

const FACILITIES = [
  {
    title: "Advanced Computing & Cyber Labs",
    desc: "High-performance workstations equipped with forensic toolkits, AI frameworks, and gigabit fiber network.",
    image: "/images/facilities/computer-lab.jpg",
  },
  {
    title: "Central Digital Library",
    desc: "Over 15,000 reference volumes, national journals, DELNET digital archives, and quiet study pods.",
    image: "/images/facilities/library.jpg",
  },
  {
    title: "Smart Multimedia Auditoriums",
    desc: "Acoustically treated halls with 4K projection for national conferences, webinars, and cultural fests.",
    image: "/images/facilities/classroom.jpg",
  },
  {
    title: "Eco-Cafeteria & Student Lounge",
    desc: "Hygienic multi-cuisine dining surrounded by lush greenery for group discussions and relaxation.",
    image: "/images/facilities/cafeteria.jpg",
  },
];

export default function CampusLifePage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ─── Hero Header ─── */}
      <section className="text-center py-12 md:py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4 backdrop-blur-xl">
          <Sparkles size={14} />
          <span>Vibrant Student Experience</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 font-[family-name:var(--font-outfit)] text-black dark:text-white leading-tight">
          Life at <span className="text-shimmer">Girideepam</span>
        </h1>
        <p className="text-base sm:text-xl text-black/80 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
          A dynamic ecosystem where academic ambition meets cultural vibrancy, sporting energy, and lifelong friendships across our hilltop campus.
        </p>
      </section>

      {/* ─── Student Clubs Grid ─── */}
      <section className="my-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black font-[family-name:var(--font-outfit)] text-black dark:text-white mb-3">
            Clubs & <span className="text-shimmer">Societies</span>
          </h2>
          <p className="text-sm md:text-base text-black/70 dark:text-gray-300 font-medium">
            Student-led initiatives driving skill development, creativity, and community outreach.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLUBS.map((club) => (
            <div
              key={club.name}
              className="liquid-glass rounded-3xl p-6 border border-white/70 dark:border-white/15 shadow-lg hover:translate-y-[-4px] transition-transform flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <club.icon size={22} />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    {club.badge}
                  </span>
                </div>
                <h3 className="text-lg font-black text-black dark:text-white mb-1">
                  {club.name}
                </h3>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {club.dept}
                </div>
                <p className="text-xs text-black/75 dark:text-gray-300 leading-relaxed font-medium">
                  {club.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Campus Facilities ─── */}
      <section className="my-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black font-[family-name:var(--font-outfit)] text-black dark:text-white mb-3">
            Campus <span className="text-shimmer">Infrastructure</span>
          </h2>
          <p className="text-sm md:text-base text-black/70 dark:text-gray-300 font-medium">
            Designed for collaborative learning, high-tech research, and physical well-being.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {FACILITIES.map((fac) => (
            <div
              key={fac.title}
              className="liquid-glass rounded-3xl p-6 border border-white/70 dark:border-white/15 shadow-xl hover:translate-y-[-3px] transition-transform"
            >
              <h3 className="text-xl font-black text-black dark:text-white mb-2 font-[family-name:var(--font-outfit)]">
                {fac.title}
              </h3>
              <p className="text-xs text-black/80 dark:text-gray-300 leading-relaxed font-medium">
                {fac.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="my-12 liquid-glass rounded-3xl p-8 md:p-12 border border-emerald-500/30 text-center shadow-2xl">
        <h2 className="text-2xl md:text-4xl font-black text-black dark:text-white mb-4 font-[family-name:var(--font-outfit)]">
          Experience GIAL in Person
        </h2>
        <p className="text-black/80 dark:text-gray-200 max-w-2xl mx-auto mb-8 font-medium">
          Schedule a campus tour or connect with our student ambassadors to discover life at Bethany Hills.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
          >
            Book Campus Tour
          </Link>
          <Link
            href="/admissions"
            className="px-8 py-3.5 liquid-glass text-black dark:text-white font-bold rounded-2xl border border-white/60 dark:border-white/20 hover:bg-white/20 transition-all hover:scale-105"
          >
            Apply for Admission
          </Link>
        </div>
      </section>
    </div>
  );
}
