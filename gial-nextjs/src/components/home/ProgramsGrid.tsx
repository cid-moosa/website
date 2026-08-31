import Link from "next/link";
import { ArrowRight, BookOpen, Users, Trophy } from "lucide-react";
import { PROGRAM_THEMES } from "@/types";

type ProgramPreview = {
  slug: string;
  title: string;
  code: string;
  duration: string;
  themeKey: string;
};

const PROGRAMS: ProgramPreview[] = [
  { slug: "bba", title: "Bachelor of Business Administration", code: "BBA", duration: "3 Years", themeKey: "bba" },
  { slug: "bca", title: "Bachelor of Computer Applications", code: "BCA", duration: "3 Years", themeKey: "bca" },
  { slug: "cyber", title: "B.Sc Cyber Forensics", code: "Cyber", duration: "3 Years", themeKey: "cyber" },
  { slug: "psychology", title: "B.Sc Psychology", code: "Psychology", duration: "3 Years", themeKey: "psychology" },
  { slug: "bcom-acc", title: "B.Com Computer Applications", code: "B.Com", duration: "3 Years", themeKey: "bcom-acc" },
  { slug: "msw", title: "Master of Social Work", code: "MSW", duration: "2 Years", themeKey: "msw" },
];

export function ProgramsGrid() {
  return (
    <section id="programs" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-4">
            Academic <span className="text-shimmer">Programs</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our diverse range of undergraduate and postgraduate programs designed to equip you with the skills and knowledge needed for a successful career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((program) => {
            const theme = PROGRAM_THEMES[program.themeKey];
            
            return (
              <Link
                href={`/programs/${program.slug}`}
                key={program.slug}
                className="group relative glass rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl spring-bounce"
                style={{
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 10px 40px -10px ${theme.primary}20`,
                }}
              >
                {/* Background Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${theme.primary}, transparent 70%)`,
                  }}
                />
                
                {/* Emojis bg pattern */}
                <div className="absolute -top-4 -right-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity duration-500 rotate-12 select-none pointer-events-none">
                  {theme.emojis[0]}
                </div>

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}40)`,
                      border: `1px solid ${theme.primary}40`,
                      color: theme.primary,
                    }}
                  >
                    <BookOpen size={24} />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: theme.secondary }}>
                    <span>{program.code}</span>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    <span>{program.duration}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 min-h-[3.5rem]">
                    {program.title}
                  </h3>

                  <div className="flex items-center text-sm font-medium transition-colors" style={{ color: theme.primary }}>
                    View Program Details
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
