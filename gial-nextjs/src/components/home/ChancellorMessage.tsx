import Image from "next/image";
import { Quote, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export function ChancellorMessage() {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award size={14} />
            Leadership & Vision
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-4">
            Guiding <span className="text-shimmer">Excellence</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Under the patronage of the Bethany Navajyothi Province, our academic leadership nurtures holistic human development and intellectual pursuit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Principal's Desk */}
          <div className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <Quote className="text-emerald-500/20 mb-6" size={48} />
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 italic">
              "At GIAL, education transcends rote academic absorption. We empower young minds with analytical precision, ethical grounding, and digital resilience to lead in a hyper-connected global ecosystem."
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 overflow-hidden relative flex items-center justify-center font-bold text-emerald-400 text-lg shadow-lg">
                P
              </div>
              <div>
                <h4 className="text-white font-bold text-base">Office of the Principal</h4>
                <p className="text-xs text-emerald-400 font-medium">Girideepam Institute of Advanced Learning</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Ph.D, M.G. University Research Guide</p>
              </div>
            </div>
          </div>

          {/* Director / Manager's Message */}
          <div className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
            <Quote className="text-blue-500/20 mb-6" size={48} />
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 italic">
              "Rooted in the spiritual and social vision of the Bethany Congregation, our mission is to make transformative tertiary education accessible, innovative, and deeply transformative."
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-blue-950/80 border border-blue-500/30 overflow-hidden relative flex items-center justify-center font-bold text-blue-400 text-lg shadow-lg">
                M
              </div>
              <div>
                <h4 className="text-white font-bold text-base">Manager / Director</h4>
                <p className="text-xs text-blue-400 font-medium">Bethany Navajyothi Educational Society</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Vadavathoor Campus, Kottayam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
