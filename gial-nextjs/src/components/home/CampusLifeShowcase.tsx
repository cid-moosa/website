import Image from "next/image";
import { Sparkles, Monitor, BookOpen, Coffee, Building } from "lucide-react";

export function CampusLifeShowcase() {
  const facilities = [
    {
      title: "Hi-Tech Cyber & Computer Labs",
      description: "Equipped with state-of-the-art workstations, forensic software suites, high-speed Gigabit LAN, and dedicated cloud sandboxes.",
      image: "/images/computer-lab.jpg",
      icon: Monitor,
      tag: "Tech Hub",
    },
    {
      title: "Digital & Reference Library",
      description: "Over 15,000+ volumes, international journals, DELNET access, and quiet study carrels for research scholars.",
      image: "/images/library.jpg",
      icon: BookOpen,
      tag: "Knowledge Centre",
    },
    {
      title: "Smart Multimedia Classrooms",
      description: "Interactive smartboards, acoustic treatment, and ergonomic seating configured for blended digital learning.",
      image: "/images/classroom.jpg",
      icon: Building,
      tag: "Learning Spaces",
    },
    {
      title: "Cafeteria & Student Lounge",
      description: "Hygienic, vibrant culinary space serving nutritious meals and fostering cross-departmental student discussions.",
      image: "/images/cafeteria.jpg",
      icon: Coffee,
      tag: "Community",
    },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={14} />
              World-Class Infrastructure
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-outfit)]">
              Campus <span className="text-shimmer">Ecosystem</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
            Modern, ISO-standard infrastructure built across a lush green campus in Kottayam, fostering holistic student development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((fac, idx) => (
            <div
              key={fac.title}
              className="glass rounded-3xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={fac.image}
                  alt={fac.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--clr-surface)] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-emerald-400">
                  {fac.tag}
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <fac.icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {fac.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {fac.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
