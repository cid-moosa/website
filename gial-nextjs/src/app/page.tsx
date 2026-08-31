import { HeroSection } from "@/components/home/HeroSection";
import { AnnouncementTicker } from "@/components/home/AnnouncementTicker";
import { ProgramsGrid } from "@/components/home/ProgramsGrid";
import { ChancellorMessage } from "@/components/home/ChancellorMessage";
import { CampusLifeShowcase } from "@/components/home/CampusLifeShowcase";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AnnouncementTicker />
      
      {/* About Section - Brief Intro */}
      <section id="about" className="py-24 relative z-10 glass-section my-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-8">
            In Pursuit of <span className="text-shimmer">Excellence</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Girideepam Institute of Advanced Learning (GIAL) stands as a premier institution affiliated with Mahatma Gandhi University, 
            blending rigorous academic standards with state-of-the-art technological facilities. Driven by the visionary 
            Bethany Navajyothi Province, we empower future leaders equipped to tackle global challenges 
            with integrity, innovation, and compassion.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-12">
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2 font-[family-name:var(--font-outfit)]">2005</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Established</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2 font-[family-name:var(--font-outfit)]">10+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">UG & PG Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2 font-[family-name:var(--font-outfit)]">50+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Expert Faculty</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2 font-[family-name:var(--font-outfit)]">1000+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">Students Enrolled</div>
            </div>
          </div>
        </div>
      </section>

      <ProgramsGrid />
      <ChancellorMessage />
      <CampusLifeShowcase />
    </>
  );
}
