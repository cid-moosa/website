"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Download,
  BookOpen,
  Users,
  Briefcase,
  Monitor,
  CheckCircle2,
  Phone,
  Mail,
  X,
  Sparkles,
  ArrowRight,
  Layers,
  FileCheck,
  ChevronRight,
  Award,
} from "lucide-react";
import { PROGRAM_THEMES, ProgramTheme } from "@/types";

type Faculty = {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  specialization?: string | null;
  bio?: string | null;
  phone?: string | null;
  email?: string | null;
  profileImageUrl?: string | null;
  researchPapers?: string | null;
};

type CurriculumSem = {
  sem: string;
  subjects: string[];
};

type ProgramPortalProps = {
  program: {
    id: string;
    slug: string;
    title: string;
    shortTitle?: string | null;
    code: string;
    degreeLevel: string;
    department?: string | null;
    duration: string;
    eligibility?: string | null;
    overview?: string | null;
    objectives?: string | null;
    curriculum?: string | null;
    careerProspects?: string | null;
    syllabusPdfUrl?: string | null;
    faculty: Faculty[];
  };
};

const ALL_PROGRAMS = [
  { slug: "cyber", title: "B.Sc Cyber Forensics", image: "/images/programs/cyber.jpg", tag: "Tech & Security" },
  { slug: "bca", title: "BCA (Computer Applications)", image: "/images/programs/bca.jpg", tag: "Software & AI" },
  { slug: "bba", title: "BBA (Business Administration)", image: "/images/programs/bba.jpg", tag: "Management" },
  { slug: "psychology", title: "B.Sc Psychology", image: "/images/programs/psychology.jpg", tag: "Humanities" },
  { slug: "bcom-acc", title: "B.Com Accounting / Finance", image: "/images/programs/commerce.jpg", tag: "Commerce" },
  { slug: "bcom-log", title: "B.Com Logistics & Supply Chain", image: "/images/programs/logistics.jpg", tag: "Global Trade" },
  { slug: "msw", title: "Master of Social Work (MSW)", image: "/images/programs/msw.jpg", tag: "Postgraduate" },
];

export function ProgramPortalView({ program }: ProgramPortalProps) {
  const slug = program.slug;
  const theme: ProgramTheme =
    PROGRAM_THEMES[slug] ||
    PROGRAM_THEMES[slug.replace("bsc-", "").replace("-forensics", "")] ||
    PROGRAM_THEMES["bba"];

  // Helper to safely parse JSON
  function parseJson<T>(val: any, fallback: T): T {
    if (!val) return fallback;
    if (typeof val === "object") return val as T;
    try {
      return JSON.parse(val) as T;
    } catch {
      return fallback;
    }
  }

  const objectives = parseJson<string[]>(program.objectives, [
    "Cultivate in-depth theoretical grounding and modern analytical techniques.",
    "Master hands-on industry tools, software suites, and investigative frameworks.",
    "Acquire professional communication, leadership, and research capabilities.",
    "Engage with real-world case studies, industrial visits, and corporate internships.",
  ]);

  const curriculum = parseJson<CurriculumSem[]>(program.curriculum, []);
  const careers = parseJson<any[]>(program.careerProspects, [
    "Corporate Analyst",
    "Specialist Consultant",
    "Research Executive",
    "Domain Strategist",
  ]);

  // Image mapping
  const imageMap: Record<string, string> = {
    bba: "/images/programs/bba.jpg",
    bca: "/images/programs/bca.jpg",
    cyber: "/images/programs/cyber.jpg",
    "cyber-forensics": "/images/programs/cyber.jpg",
    "bsc-cyber": "/images/programs/cyber.jpg",
    psychology: "/images/programs/psychology.jpg",
    "bcom-acc": "/images/programs/commerce.jpg",
    "bcom-fin": "/images/programs/commerce.jpg",
    commerce: "/images/programs/commerce.jpg",
    bcom: "/images/programs/commerce.jpg",
    "bcom-log": "/images/programs/logistics.jpg",
    logistics: "/images/programs/logistics.jpg",
    "bcom-logistics": "/images/programs/logistics.jpg",
    msw: "/images/programs/msw.jpg",
    "social-work": "/images/programs/msw.jpg",
  };

  const heroImage = imageMap[slug] || "/images/campus-hero.jpg";

  // Navigation Items
  const navItems = [
    { id: "overview", label: "Overview & Scope", icon: BookOpen },
    { id: "objectives", label: "Objectives", icon: Award },
    { id: "curriculum", label: "Curriculum & Syllabus", icon: Layers },
    { id: "faculty", label: `Faculty Directory (${program.faculty.length})`, icon: Users },
    { id: "careers", label: "Career Pathways", icon: Briefcase },
    { id: "labs", label: "Laboratories", icon: Monitor },
    { id: "eligibility", label: "Admission & Eligibility", icon: FileCheck },
  ];

  // State
  const [activeNav, setActiveNav] = useState("overview");
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [cardOrigin, setCardOrigin] = useState<{
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
  } | null>(null);
  const [isFacultyClosing, setIsFacultyClosing] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const handleFacultySelect = (member: Faculty, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const modalW = Math.min(window.innerWidth * 0.9, 640);
    const modalH = Math.min(window.innerHeight * 0.85, 520);
    const scaleX = Math.max(0.2, Math.min(0.75, rect.width / modalW));
    const scaleY = Math.max(0.2, Math.min(0.75, rect.height / modalH));

    setCardOrigin({
      x: Math.round(cardCenterX - centerX),
      y: Math.round(cardCenterY - centerY),
      scaleX: parseFloat(scaleX.toFixed(3)),
      scaleY: parseFloat(scaleY.toFixed(3)),
    });
    setActiveCardId(member.id);
    setIsFacultyClosing(false);
    setSelectedFaculty(member);
  };

  const closeFacultyModal = () => {
    setIsFacultyClosing(true);
    setTimeout(() => {
      setSelectedFaculty(null);
      setIsFacultyClosing(false);
      setActiveCardId(null);
    }, 660);
  };

  // Keyboard accessibility
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedFaculty) closeFacultyModal();
        if (applyModalOpen) setApplyModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedFaculty, applyModalOpen]);

  // Scroll spy to highlight active nav button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="pt-24 pb-28 min-h-screen relative z-10">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--clr-border)] bg-gradient-to-b from-black/10 via-[var(--clr-bg-deep)] to-[var(--clr-bg-deep)]">
        {/* Ambient Glow */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none"
          style={{ backgroundColor: theme.primary }}
        />

        <div className="max-w-7xl mx-auto px-6 pt-12 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link href="/programs" className="hover:text-emerald-600 dark:hover:text-white transition-colors">
              Academic Programs
            </Link>
            <ChevronRight size={12} />
            <span style={{ color: theme.primary }} className="font-bold">
              {program.code}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Info */}
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 text-xs font-bold uppercase tracking-wider shadow-sm"
                style={{
                  borderColor: `${theme.primary}50`,
                  backgroundColor: `${theme.primary}15`,
                  color: theme.primary,
                }}
              >
                <GraduationCap size={15} />
                <span>
                  {program.degreeLevel} Degree • {program.duration} • Affiliated to M.G. University
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-[family-name:var(--font-outfit)] text-slate-900 dark:text-white mb-6 leading-tight">
                {program.title}
              </h1>

              <p className="text-slate-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8 font-normal">
                {program.overview ||
                  "A comprehensive curriculum combining theoretical excellence with hands-on industrial exposure, accredited academic standards, and vibrant student mentoring."}
              </p>

              {/* Meta Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl card-inner mb-8 shadow-sm">
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-bold">
                    Degree Level
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {program.degreeLevel}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-bold">
                    Duration
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {program.duration}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-bold">
                    Affiliation
                  </div>
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    M.G. University
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-bold">
                    Faculty Strength
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {program.faculty.length} Professors
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="px-8 py-3.5 font-bold rounded-xl text-black transition-all spring-bounce shadow-xl flex items-center gap-2 hover:brightness-110 cursor-pointer"
                  style={{
                    backgroundColor: theme.primary,
                    boxShadow: `0 10px 30px -10px ${theme.primary}`,
                  }}
                >
                  <Sparkles size={18} />
                  Apply for Admission
                </button>

                {program.syllabusPdfUrl && (
                  <a
                    href={program.syllabusPdfUrl}
                    download
                    className="px-6 py-3.5 font-semibold rounded-xl border border-[var(--clr-border)] card-inner hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-white transition-all spring-bounce flex items-center gap-2"
                  >
                    <Download size={18} />
                    Download Syllabus
                  </a>
                )}
              </div>
            </div>

            {/* Right Col: Program Photo Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[var(--clr-border)] shadow-xl group aspect-[4/3] bg-black/10">
                <Image
                  src={heroImage}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="text-white font-bold text-lg drop-shadow-md">
                    {program.department || "Girideepam Institute of Advanced Learning"}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 border border-white/20 text-white backdrop-blur-md">
                    ISO 9001:2015
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Sticky Scroll Navigation Bar (Scroll Spy) ─────────── */}
        <div className="sticky top-16 z-40 bg-[var(--clr-bg-deep)]/95 backdrop-blur-xl border-y border-[var(--clr-border)] shadow-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
              {navItems.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-black shadow-lg"
                        : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: theme.primary,
                            boxShadow: `0 4px 20px -4px ${theme.primary}60`,
                          }
                        : {}
                    }
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Seamless Continuous Scrollable Sections ──────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-12 space-y-16">
        
        {/* 1. OVERVIEW & SCOPE SECTION */}
        <section id="overview" className="scroll-mt-36">
          <div className="glass p-8 md:p-10 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${theme.primary}15`,
                  borderColor: `${theme.primary}30`,
                  color: theme.primary,
                }}
              >
                <BookOpen size={20} />
              </div>
              Program Scope & Pedagogy
            </h2>
            <p className="text-slate-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8">
              {program.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[var(--clr-border)]">
              <div className="p-5 rounded-2xl card-inner">
                <div className="text-emerald-700 dark:text-emerald-400 font-bold mb-1">Affiliated & Approved</div>
                <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                  CBCSS curriculum aligned strictly to Mahatma Gandhi University regulations and UGC standards.
                </p>
              </div>
              <div className="p-5 rounded-2xl card-inner">
                <div className="text-emerald-700 dark:text-emerald-400 font-bold mb-1">Industry Internships</div>
                <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                  Mandatory corporate internships, case study reviews, and project dissertations in the final year.
                </p>
              </div>
              <div className="p-5 rounded-2xl card-inner">
                <div className="text-emerald-700 dark:text-emerald-400 font-bold mb-1">Holistic Mentoring</div>
                <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                  1-on-1 faculty counseling, soft-skills training, and placement bootcamp preparation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. OBJECTIVES SECTION */}
        <section id="objectives" className="scroll-mt-36">
          <div className="glass p-8 md:p-10 rounded-3xl">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${theme.primary}15`,
                  borderColor: `${theme.primary}30`,
                  color: theme.primary,
                }}
              >
                <Award size={20} />
              </div>
              Core Program Educational Objectives (PEOs)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objectives.map((obj: any, i: number) => {
                const text = typeof obj === "string" ? obj : obj?.title || obj?.desc || obj?.text || "";
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl card-inner flex items-start gap-4 hover:border-emerald-500/40 transition-colors shadow-sm"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5"
                      style={{
                        backgroundColor: `${theme.primary}20`,
                        color: theme.primary,
                      }}
                    >
                      0{i + 1}
                    </div>
                    <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-medium">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. CURRICULUM SECTION */}
        <section id="curriculum" className="scroll-mt-36">
          <div className="glass p-8 md:p-10 rounded-3xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--clr-border)]">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${theme.primary}15`,
                      borderColor: `${theme.primary}30`,
                      color: theme.primary,
                    }}
                  >
                    <Layers size={20} />
                  </div>
                  Semester Curriculum Breakdown
                </h2>
                <p className="text-slate-600 dark:text-gray-400 text-sm">
                  Complete CBCSS course syllabus across all semesters prescribed by Mahatma Gandhi University.
                </p>
              </div>

              {program.syllabusPdfUrl && (
                <a
                  href={program.syllabusPdfUrl}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all spring-bounce shadow-lg self-start md:self-auto"
                >
                  <Download size={14} /> Download Official Syllabus PDF
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curriculum.map((sem, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl card-inner flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--clr-border)]">
                      <span className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {sem.sem}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-gray-400">
                        {sem.subjects.length} Subjects
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {sem.subjects.map((sub, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-700 dark:text-gray-300 flex items-start gap-2 font-medium">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">•</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[var(--clr-border)] text-[10px] text-slate-500 dark:text-gray-500 font-semibold uppercase tracking-wider">
                    M.G. University CBCSS Scheme
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FACULTY DIRECTORY SECTION */}
        <section id="faculty" className="scroll-mt-36">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${theme.primary}15`,
                    borderColor: `${theme.primary}30`,
                    color: theme.primary,
                  }}
                >
                  <Users size={20} />
                </div>
                Department Faculty Directory
              </h2>
              <p className="text-slate-600 dark:text-gray-400 text-sm">
                Distinguished academicians, research guides, and mentors. Click any faculty card to inspect their liquid glass profile modal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {program.faculty.map((member) => (
                <div
                  key={member.id}
                  onClick={(e) => handleFacultySelect(member, e)}
                  className={`glass p-6 rounded-3xl hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-md ${
                    activeCardId === member.id ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar Frame */}
                    <div
                      className="w-24 h-24 rounded-full p-1 mb-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                      }}
                    >
                      <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden relative">
                        {member.profileImageUrl ? (
                          <Image
                            src={member.profileImageUrl}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-2xl">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1">
                      {member.name}
                    </h3>
                    <div
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: theme.secondary }}
                    >
                      {member.designation}
                    </div>
                    <div className="text-xs text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 mb-4 font-medium">
                      {member.qualification}
                    </div>

                    {member.specialization && (
                      <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-2 italic mb-4">
                        Area: {member.specialization}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[var(--clr-border)] flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                    View Full Profile & Credentials →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CAREER PATHWAYS SECTION */}
        <section id="careers" className="scroll-mt-36">
          <div className="glass p-8 md:p-10 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${theme.primary}15`,
                  borderColor: `${theme.primary}30`,
                  color: theme.primary,
                }}
              >
                <Briefcase size={20} />
              </div>
              Industry Placements & Career Horizons
            </h2>

            <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-8 font-normal">
              Graduates of the {program.title} program are positioned for high-growth roles across leading MNCs, government bodies, fintech firms, and research laboratories.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {careers.map((career: any, i: number) => {
                const title = typeof career === "string" ? career : career?.role || career?.title || "Specialist";
                const description = typeof career === "object" ? career?.desc : null;

                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl card-inner flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{title}</span>
                    </div>
                    {description && (
                      <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed pl-7 font-medium">
                        {description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Placement Support Box */}
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-base mb-1">
                  GIAL Placement & Corporate Relations Cell
                </h4>
                <p className="text-xs text-slate-600 dark:text-gray-400">
                  Provides campus recruitment drives, industry workshops, and aptitude bootcamps.
                </p>
              </div>
              <button
                onClick={() => setApplyModalOpen(true)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all spring-bounce shrink-0 cursor-pointer shadow-md"
              >
                Enquire for Placements
              </button>
            </div>
          </div>
        </section>

        {/* 6. LABORATORIES SECTION */}
        <section id="labs" className="scroll-mt-36">
          <div className="glass p-8 md:p-10 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${theme.primary}15`,
                  borderColor: `${theme.primary}30`,
                  color: theme.primary,
                }}
              >
                <Monitor size={20} />
              </div>
              Department Laboratories & Specialized Infrastructure
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl card-inner space-y-3 shadow-sm">
                <h4 className="text-lg font-bold" style={{ color: theme.secondary }}>
                  Specialized Practical Lab
                </h4>
                <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-normal">
                  Configured with high-performance multi-core workstations, specialized domain software suites, and high-speed network connectivity.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-gray-400 pt-2 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Gigabit Optical Fiber Internet (100 Mbps Dedicated)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Individual Workstation for Every Student
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Licensed & Open-Source Academic Toolchains
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl card-inner space-y-3 shadow-sm">
                <h4 className="text-lg font-bold" style={{ color: theme.secondary }}>
                  Department Library & Research Corner
                </h4>
                <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-normal">
                  Curated departmental repository holding specialized reference books, IEEE/Springer journals, and project archives.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-gray-400 pt-2 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    DELNET & National Digital Library Access
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Previous Years University Question Bank Archive
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. ADMISSION & ELIGIBILITY SECTION */}
        <section id="eligibility" className="scroll-mt-36">
          <div className="glass p-8 md:p-10 rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${theme.primary}15`,
                  borderColor: `${theme.primary}30`,
                  color: theme.primary,
                }}
              >
                <FileCheck size={20} />
              </div>
              Admission Criteria & Eligibility Guidelines
            </h2>

            <div className="p-6 rounded-2xl card-inner mb-8 space-y-4 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Minimum Academic Requirement</h4>
              <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-normal">
                {program.eligibility ||
                  "Candidates who have passed Plus Two (+2) or equivalent examination recognized by Mahatma Gandhi University with qualifying marks in relevant stream are eligible to apply."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl card-inner space-y-3 shadow-sm">
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Required Documents for Admission
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-gray-300 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">✓</span> 10th Standard / SSLC Mark Sheet
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">✓</span> 12th / Higher Secondary (+2) Mark Sheet
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">✓</span> Transfer Certificate (TC) & Conduct Certificate
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">✓</span> Migration Certificate (for other state/boards)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">✓</span> Recent Passport Size Photographs
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Need Guidance on the Admission Process?
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                    Our admissions office is ready to assist you with course selection, scholarship options, and document verification.
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="tel:+917592802949"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Phone size={14} /> +91 7592802949
                  </a>
                  <button
                    onClick={() => setApplyModalOpen(true)}
                    className="px-4 py-2.5 bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    Apply Online
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. EXPLORE OTHER PROGRAMS BANNER */}
        <section id="other-programs" className="pt-8 border-t border-[var(--clr-border)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                Explore More
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Discover Other Degree Programs
              </h3>
            </div>
            <Link
              href="/programs"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              View Full Catalog <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ALL_PROGRAMS.filter((p) => p.slug !== slug).slice(0, 4).map((other) => (
              <Link
                key={other.slug}
                href={`/programs/${other.slug}`}
                className="glass rounded-2xl overflow-hidden group hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between shadow-md"
              >
                <div className="relative h-40 w-full overflow-hidden bg-black/10">
                  <Image
                    src={other.image}
                    alt={other.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-emerald-400 border border-white/10">
                    {other.tag}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                    {other.title}
                  </h4>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    Explore Program →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ─── 3D Fluid Flipping Liquid Glass Faculty Profile Modal ─── */}
      {selectedFaculty && (
        <div
          onClick={closeFacultyModal}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md perspective-stage ${
            isFacultyClosing ? "animate-backdrop-fade-out" : "animate-in fade-in duration-300"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              "--orig-x": `${cardOrigin?.x || 0}px`,
              "--orig-y": `${cardOrigin?.y || 0}px`,
              "--scale-x": `${cardOrigin?.scaleX || 0.45}`,
              "--scale-y": `${cardOrigin?.scaleY || 0.45}`,
            } as React.CSSProperties}
            className={`relative w-full max-w-2xl liquid-glass-modal p-6 sm:p-8 md:p-10 rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto border border-white/80 dark:border-white/20 ${
              isFacultyClosing ? "animate-card-unflip-putdown" : "animate-card-pickup-flip"
            }`}
          >
            {/* Ambient Refraction Beam Sweep & Speed Streak Flare */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 dark:via-emerald-400/30 to-transparent -skew-x-12 animate-speed-streak" />
            </div>

            {/* Specular Highlight Top Edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 dark:via-emerald-400 to-transparent pointer-events-none" />

            {/* High-Contrast Responsive Close Button with Interactive Spin */}
            <button
              onClick={closeFacultyModal}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/10 hover:bg-black/25 dark:bg-white/15 dark:hover:bg-white/30 text-black dark:text-white transition-all duration-200 cursor-pointer border border-black/15 dark:border-white/20 z-30 flex items-center justify-center active:scale-85 hover:rotate-90 shadow-md group"
              aria-label="Close modal"
            >
              <X size={22} className="stroke-[2.5] group-hover:scale-110 transition-transform" />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-6 border-b border-[var(--clr-border)] relative z-10">
              <div
                className="w-28 h-28 rounded-2xl p-1 shrink-0 relative overflow-hidden shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                }}
              >
                <div className="w-full h-full rounded-2xl bg-slate-900 overflow-hidden relative">
                  {selectedFaculty.profileImageUrl ? (
                    <Image
                      src={selectedFaculty.profileImageUrl}
                      alt={selectedFaculty.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-3xl">
                      {selectedFaculty.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-black text-black dark:text-white mb-1">
                  {selectedFaculty.name}
                </h3>
                <div className="text-sm font-bold mb-2" style={{ color: theme.primary }}>
                  {selectedFaculty.designation}
                </div>
                <div className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/10 px-3.5 py-1 rounded-full inline-block border border-emerald-300 dark:border-emerald-500/20 mb-3 font-bold">
                  {selectedFaculty.qualification}
                </div>
                {selectedFaculty.specialization && (
                  <div className="text-xs text-black dark:text-gray-400 font-medium">
                    <span className="text-slate-600 dark:text-gray-500 font-bold">Specialization: </span>
                    {selectedFaculty.specialization}
                  </div>
                )}
              </div>
            </div>

            {/* Biography */}
            {selectedFaculty.bio && (
              <div className="mb-8 relative z-10">
                <h4 className="text-xs font-bold text-black dark:text-gray-400 uppercase tracking-wider mb-2">
                  Academic Biography & Credentials
                </h4>
                <p className="text-sm text-black dark:text-gray-100 leading-relaxed whitespace-pre-line font-semibold">
                  {selectedFaculty.bio}
                </p>
              </div>
            )}

            {/* Contact Details */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-[var(--clr-border)] relative z-10">
              {selectedFaculty.phone && (
                <a
                  href={`tel:${selectedFaculty.phone}`}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all spring-bounce shadow-md"
                >
                  <Phone size={14} /> Call {selectedFaculty.phone}
                </a>
              )}
              {selectedFaculty.email && (
                <a
                  href={`mailto:${selectedFaculty.email}`}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all spring-bounce shadow-md"
                >
                  <Mail size={14} /> Email {selectedFaculty.email}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Apply Online Modal ─────────────────────────────────────── */}
      {applyModalOpen && (
        <div
          onClick={() => setApplyModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg liquid-glass-modal p-8 rounded-[2rem] shadow-2xl animate-modal-pop"
          >
            <button
              onClick={() => setApplyModalOpen(false)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-black dark:text-white transition-colors cursor-pointer border border-black/10 dark:border-white/10"
            >
              <X size={18} />
            </button>

            <h3 className="text-2xl font-black text-black dark:text-white mb-2">Apply for Admission</h3>
            <p className="text-xs text-black dark:text-gray-400 mb-6 font-medium">
              You are applying for: <strong className="text-emerald-700 dark:text-emerald-400">{program.title}</strong>
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your enquiry has been submitted. Our admission counselor will contact you shortly.");
                setApplyModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-slate-50 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all spring-bounce shadow-lg shadow-emerald-500/20 cursor-pointer mt-4"
              >
                Submit Application Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
