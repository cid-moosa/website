import Link from "next/link";
import { db } from "@/lib/db";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  Laptop,
  Brain,
  BarChart3,
  Award,
  HeartHandshake,
  ShieldCheck,
  Clock,
  Building,
} from "lucide-react";

export const metadata = {
  title: "Academic Programs — Girideepam Institute of Advanced Learning",
  description: "Explore MG University affiliated UG and PG degree programs in Computer Applications, Cyber Forensics, Management, Psychology, Commerce, and Social Work.",
};

const ICON_MAP: Record<string, any> = {
  bba: BarChart3,
  bca: Laptop,
  cyber: ShieldCheck,
  psychology: Brain,
  "bcom-acc": BookOpen,
  "bcom-fin": Award,
  "bcom-log": BarChart3,
  "mcom-fin": Award,
  "mcom-mkt": BarChart3,
  msw: HeartHandshake,
};

export default async function ProgramsDirectoryPage() {
  const programs = await db.program.findMany({
    orderBy: { degreeLevel: "asc" },
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ─── Hero Header ─── */}
      <section className="text-center py-12 md:py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4 backdrop-blur-xl">
          <Sparkles size={14} />
          <span>Affiliated with Mahatma Gandhi University</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 font-[family-name:var(--font-outfit)] text-black dark:text-white leading-tight">
          Academic <span className="text-shimmer">Directory</span>
        </h1>
        <p className="text-base sm:text-xl text-black/80 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
          Choose from industry-aligned undergraduate and postgraduate degree courses designed for future-ready careers in computing, business, cyber forensics, and social empowerment.
        </p>
      </section>

      {/* ─── Programs Grid ─── */}
      <section className="my-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog) => {
            const IconComponent = ICON_MAP[prog.slug] || GraduationCap;
            return (
              <Link
                key={prog.id}
                href={`/programs/${prog.slug}`}
                className="group liquid-glass rounded-3xl p-6 border border-white/70 dark:border-white/15 shadow-lg hover:border-emerald-500/40 hover:shadow-2xl transition-all duration-300 hover:translate-y-[-4px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 uppercase">
                      {prog.degreeLevel}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-black dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-[family-name:var(--font-outfit)]">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-black/75 dark:text-gray-300 leading-relaxed font-medium line-clamp-3 mb-4">
                    {prog.overview}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-black/60 dark:text-gray-400 font-semibold text-[11px]">
                    <Clock size={13} className="text-emerald-500" />
                    <span>{prog.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>View Curriculum</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── Admissions Redirection Banner ─── */}
      <section className="my-12 liquid-glass rounded-3xl p-8 md:p-12 border border-emerald-500/30 text-center shadow-2xl">
        <h2 className="text-2xl md:text-4xl font-black text-black dark:text-white mb-4 font-[family-name:var(--font-outfit)]">
          Ready to Enroll for 2024–25?
        </h2>
        <p className="text-black/80 dark:text-gray-200 max-w-2xl mx-auto mb-8 font-medium">
          Merit and management quota applications are currently being processed. Secure your seat today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/admissions"
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
          >
            Apply Online Now
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3.5 liquid-glass text-black dark:text-white font-bold rounded-2xl border border-white/60 dark:border-white/20 hover:bg-white/20 transition-all hover:scale-105"
          >
            Contact Admissions Desk
          </Link>
        </div>
      </section>
    </div>
  );
}
