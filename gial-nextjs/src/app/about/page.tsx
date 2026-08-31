import Link from "next/link";
import {
  Award,
  BookOpen,
  Building,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Users,
  Target,
} from "lucide-react";

export const metadata = {
  title: "About Us — Girideepam Institute of Advanced Learning",
  description: "Learn about the legacy, vision, leadership, and Bethany Navajyothi Province heritage of Girideepam Institute of Advanced Learning (GIAL), Kottayam.",
};

const LEADERSHIP = [
  {
    name: "Rev. Fr. Varghese Puthuparampil OIC",
    role: "Patron & Provincial Superior",
    designation: "Bethany Navajyothi Province",
    image: "/images/faculty/principal.jpg",
    bio: "Guiding the institution with visionary spiritual and educational leadership under the Bethany congregation.",
  },
  {
    name: "Rev. Fr. Mathew Thekkedathu OIC",
    role: "Director & Principal",
    designation: "Ph.D., M.Phil, M.Com",
    image: "/images/faculty/hod-management.jpg",
    bio: "Pioneering academic excellence, technological infrastructure, and holistic youth transformation at GIAL.",
  },
  {
    name: "Prof. Dr. Elizabeth Kurian",
    role: "Dean of Academics",
    designation: "Ph.D. Computer Science",
    image: "/images/faculty/hod-computer.jpg",
    bio: "Championing innovative pedagogy, interdisciplinary research, and industry-aligned skill building.",
  },
];

const CORE_VALUES = [
  {
    title: "Academic Rigor",
    desc: "Upholding uncompromising standards in curriculum delivery, practical labs, and research methodology.",
    icon: GraduationCap,
  },
  {
    title: "Integrity & Ethics",
    desc: "Nurturing values-driven character rooted in truth, social responsibility, and empathetic leadership.",
    icon: ShieldCheck,
  },
  {
    title: "Technological Innovation",
    desc: "Empowering students with hands-on AI, Cyber Forensics, Cloud, and Fintech competencies.",
    icon: Lightbulb,
  },
  {
    title: "Community & Service",
    desc: "Transforming societies through active field social work, outreach programs, and human empowerment.",
    icon: HeartHandshake,
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ─── Hero Header ─── */}
      <section className="text-center py-12 md:py-16 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4 backdrop-blur-xl">
          <Sparkles size={14} />
          <span>Bethany Navajyothi Province • Established 2005</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 font-[family-name:var(--font-outfit)] text-black dark:text-white leading-tight">
          In Pursuit of <span className="text-shimmer">Excellence</span>
        </h1>
        <p className="text-base sm:text-xl text-black/80 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
          Girideepam Institute of Advanced Learning (GIAL) stands as a premier institution affiliated with Mahatma Gandhi University, blending rigorous academic standards with state-of-the-art technological facilities in the serene hills of Kottayam.
        </p>
      </section>

      {/* ─── Vision & Mission ─── */}
      <section className="grid md:grid-cols-2 gap-6 my-12">
        <div className="liquid-glass rounded-3xl p-8 border border-white/70 dark:border-white/15 shadow-xl">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 w-fit mb-5">
            <Target size={24} />
          </div>
          <h2 className="text-2xl font-black font-[family-name:var(--font-outfit)] text-black dark:text-white mb-3">
            Our Vision
          </h2>
          <p className="text-black/80 dark:text-gray-200 leading-relaxed font-medium">
            To be a globally recognized center of higher learning that empowers youth through quality education, moral integrity, innovative research, and dynamic leadership for nation building and human progress.
          </p>
        </div>

        <div className="liquid-glass rounded-3xl p-8 border border-white/70 dark:border-white/15 shadow-xl">
          <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-600 dark:text-teal-400 w-fit mb-5">
            <Compass size={24} />
          </div>
          <h2 className="text-2xl font-black font-[family-name:var(--font-outfit)] text-black dark:text-white mb-3">
            Our Mission
          </h2>
          <p className="text-black/80 dark:text-gray-200 leading-relaxed font-medium">
            To provide comprehensive education combining academic excellence with practical skills, fostering spiritual, intellectual, and cultural growth through dedicated mentorship, advanced infrastructure, and community service.
          </p>
        </div>
      </section>

      {/* ─── Core Values ─── */}
      <section className="my-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black font-[family-name:var(--font-outfit)] text-black dark:text-white mb-3">
            Foundational <span className="text-shimmer">Pillars</span>
          </h2>
          <p className="text-sm md:text-base text-black/70 dark:text-gray-300 font-medium">
            The core tenets that guide every academic program, research endeavor, and community initiative.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((val) => (
            <div
              key={val.title}
              className="liquid-glass rounded-3xl p-6 border border-white/70 dark:border-white/15 shadow-lg hover:translate-y-[-4px] transition-transform"
            >
              <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 w-fit mb-4">
                <val.icon size={22} />
              </div>
              <h3 className="text-lg font-black text-black dark:text-white mb-2">
                {val.title}
              </h3>
              <p className="text-xs text-black/75 dark:text-gray-300 leading-relaxed font-medium">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Institutional Leadership ─── */}
      <section className="my-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black font-[family-name:var(--font-outfit)] text-black dark:text-white mb-3">
            Institutional <span className="text-shimmer">Leadership</span>
          </h2>
          <p className="text-sm md:text-base text-black/70 dark:text-gray-300 font-medium">
            Guided by dedicated spiritual leaders and accomplished academicians.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {LEADERSHIP.map((lead) => (
            <div
              key={lead.name}
              className="liquid-glass rounded-3xl p-6 border border-white/70 dark:border-white/15 shadow-xl text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white font-black text-2xl flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/25">
                {lead.name.split(" ")[1]?.[0] || "G"}
              </div>
              <h3 className="text-lg font-black text-black dark:text-white mb-1">
                {lead.name}
              </h3>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                {lead.role}
              </div>
              <div className="text-[11px] text-black/60 dark:text-gray-400 mb-3 font-semibold">
                {lead.designation}
              </div>
              <p className="text-xs text-black/75 dark:text-gray-300 leading-relaxed font-medium">
                {lead.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="my-12 liquid-glass rounded-3xl p-8 md:p-12 border border-emerald-500/30 text-center shadow-2xl relative overflow-hidden">
        <h2 className="text-2xl md:text-4xl font-black text-black dark:text-white mb-4 font-[family-name:var(--font-outfit)]">
          Join the GIAL Academic Community
        </h2>
        <p className="text-black/80 dark:text-gray-200 max-w-2xl mx-auto mb-8 font-medium">
          Admissions are open for UG & PG programs affiliated with Mahatma Gandhi University for the 2024-25 academic year.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/admissions"
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
          >
            Apply for Admission
          </Link>
          <Link
            href="/programs"
            className="px-8 py-3.5 liquid-glass text-black dark:text-white font-bold rounded-2xl border border-white/60 dark:border-white/20 hover:bg-white/20 transition-all hover:scale-105"
          >
            Explore Programs
          </Link>
        </div>
      </section>
    </div>
  );
}
