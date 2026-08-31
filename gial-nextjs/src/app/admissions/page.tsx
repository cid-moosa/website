"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  FileText,
  CreditCard,
  GraduationCap,
  Calendar,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  Download,
  AlertCircle,
} from "lucide-react";

const PROGRAMS_LIST = [
  { id: "bba", name: "BBA (Bachelor of Business Administration)", duration: "3 Years", fee: "₹24,000 / sem" },
  { id: "bca", name: "BCA (Bachelor of Computer Applications)", duration: "3 Years", fee: "₹26,000 / sem" },
  { id: "cyber", name: "B.Sc Cyber Forensics", duration: "3 Years", fee: "₹28,000 / sem" },
  { id: "psychology", name: "B.Sc Psychology", duration: "3 Years", fee: "₹25,000 / sem" },
  { id: "bcom-acc", name: "B.Com Computer Applications", duration: "3 Years", fee: "₹22,000 / sem" },
  { id: "bcom-fin", name: "B.Com Finance & Taxation", duration: "3 Years", fee: "₹22,000 / sem" },
  { id: "bcom-log", name: "B.Com Logistics & Supply Chain", duration: "3 Years", fee: "₹25,000 / sem" },
  { id: "mcom-fin", name: "M.Com Finance", duration: "2 Years", fee: "₹24,000 / sem" },
  { id: "mcom-mkt", name: "M.Com Marketing", duration: "2 Years", fee: "₹24,000 / sem" },
  { id: "msw", name: "MSW (Master of Social Work)", duration: "2 Years", fee: "₹26,000 / sem" },
];

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "bca",
    category: "General",
    plusTwoMarks: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Fee Payment Modal state
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [feeStudentId, setFeeStudentId] = useState("");
  const [feeAmount, setFeeAmount] = useState("26000");
  const [feePaidSuccess, setFeePaidSuccess] = useState(false);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const appId = `GIAL-2024-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedAppId(appId);
    }, 1000);
  };

  const handlePayFee = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFeePaidSuccess(true);
    }, 1200);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ─── Hero Header ─── */}
      <section className="text-center py-12 md:py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4 backdrop-blur-xl">
          <Sparkles size={14} />
          <span>Admissions 2024–25 Academic Year</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 font-[family-name:var(--font-outfit)] text-black dark:text-white leading-tight">
          Shape Your <span className="text-shimmer">Future</span>
        </h1>
        <p className="text-base sm:text-xl text-black/80 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
          Join Kerala&apos;s leading institution for business, technology, cyber sciences, and social leadership. Apply online or make your semester fee payment in seconds.
        </p>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a
            href="#apply-form"
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
          >
            Apply Online (UG / PG)
          </a>
          <button
            onClick={() => setFeeModalOpen(true)}
            className="px-8 py-3.5 liquid-glass text-black dark:text-white font-bold rounded-2xl border border-white/60 dark:border-white/20 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <CreditCard size={18} className="text-emerald-500" />
            <span>Online Fee Payment</span>
          </button>
        </div>
      </section>

      {/* ─── 4-Step Admission Process ─── */}
      <section className="my-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black font-[family-name:var(--font-outfit)] text-black dark:text-white mb-2">
            Admission <span className="text-shimmer">Process</span>
          </h2>
          <p className="text-sm text-black/70 dark:text-gray-300 font-medium">
            Seamless 4-step registration and enrollment workflow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Submit Application", desc: "Fill out the online application form with personal and academic details." },
            { step: "02", title: "Document Verification", desc: "Verification of Plus Two / Degree marks, certificates, and ID proof." },
            { step: "03", title: "Interview & Counseling", desc: "Short personal interaction with department faculty for course alignment." },
            { step: "04", title: "Fee & Seat Allotment", desc: "Payment of semester fee and issuance of official admission number." },
          ].map((item) => (
            <div key={item.step} className="liquid-glass rounded-3xl p-6 border border-white/70 dark:border-white/15 shadow-lg">
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-3 font-[family-name:var(--font-outfit)]">
                {item.step}
              </div>
              <h3 className="text-base font-black text-black dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-black/75 dark:text-gray-300 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Online Application Form ─── */}
      <section id="apply-form" className="my-16 scroll-mt-28">
        <div className="liquid-glass rounded-3xl p-6 sm:p-10 border border-white/70 dark:border-white/20 shadow-2xl max-w-3xl mx-auto">
          {submittedAppId ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-white mb-2 font-[family-name:var(--font-outfit)]">
                Application Submitted Successfully!
              </h2>
              <p className="text-sm text-black/80 dark:text-gray-200 mb-6 font-medium">
                Your application has been received. Our Admissions Officer will contact you within 24 hours.
              </p>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 max-w-sm mx-auto mb-6 text-left">
                <div className="text-xs text-black/60 dark:text-gray-400 font-semibold">Application Number:</div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{submittedAppId}</div>
                <div className="text-xs text-black/60 dark:text-gray-400 font-semibold mt-2">Selected Program:</div>
                <div className="text-sm font-bold text-black dark:text-white uppercase">{formData.program}</div>
              </div>
              <button
                onClick={() => setSubmittedAppId(null)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/10 dark:border-white/10">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white font-[family-name:var(--font-outfit)]">
                    Online Admission Registration Form
                  </h2>
                  <p className="text-xs text-black/70 dark:text-gray-300 font-medium">
                    Please provide accurate details as per your official educational records.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Candidate's full name"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                      Select Program *
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-black/40 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                    >
                      {PROGRAMS_LIST.map((p) => (
                        <option key={p.id} value={p.id} className="text-black dark:text-black">
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                      Plus Two / Degree Marks Percentage (%) *
                    </label>
                    <input
                      type="number"
                      min="40"
                      max="100"
                      required
                      value={formData.plusTwoMarks}
                      onChange={(e) => setFormData({ ...formData, plusTwoMarks: e.target.value })}
                      placeholder="e.g. 85%"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                      Admission Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-black/40 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                    >
                      <option value="General" className="text-black">General Merit</option>
                      <option value="Management" className="text-black">Management Quota</option>
                      <option value="Community" className="text-black">Community Merit (Bethany)</option>
                      <option value="Sports" className="text-black">Sports Quota</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                    Permanent Address
                  </label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House name, street, district, PIN code"
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Admission Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ─── Fee Structure Table ─── */}
      <section className="my-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black font-[family-name:var(--font-outfit)] text-black dark:text-white mb-2">
            Tuition & Semester <span className="text-shimmer">Fee Structure</span>
          </h2>
          <p className="text-sm text-black/70 dark:text-gray-300 font-medium">
            Affiliated to Mahatma Gandhi University fee regulations (2024–25).
          </p>
        </div>

        <div className="liquid-glass rounded-3xl border border-white/70 dark:border-white/15 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 text-black dark:text-white font-black uppercase tracking-wider">
                <tr>
                  <th className="p-4">Program Name</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Semester Fee</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 font-medium">
                {PROGRAMS_LIST.map((prog) => (
                  <tr key={prog.id} className="hover:bg-white/30 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-black dark:text-white">
                      {prog.name}
                    </td>
                    <td className="p-4 text-black/70 dark:text-gray-300">
                      {prog.duration}
                    </td>
                    <td className="p-4 text-emerald-600 dark:text-emerald-400 font-bold">
                      {prog.fee}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setFeeModalOpen(true);
                          setFeeAmount(prog.fee.replace(/[^\d]/g, ""));
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] transition-all"
                      >
                        Pay Online
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Online Fee Payment Modal ─── */}
      {feeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="liquid-glass-modal rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/70 dark:border-white/20 shadow-2xl animate-peek-expand">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <CreditCard size={18} />
                </div>
                <h3 className="text-lg font-black text-black dark:text-white font-[family-name:var(--font-outfit)]">
                  GIAL Fee Payment Gateway
                </h3>
              </div>
              <button
                onClick={() => {
                  setFeeModalOpen(false);
                  setFeePaidSuccess(false);
                }}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white"
              >
                ✕
              </button>
            </div>

            {feePaidSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-black text-black dark:text-white mb-1">
                  Payment Successful!
                </h4>
                <p className="text-xs text-black/70 dark:text-gray-300 mb-4">
                  Receipt TXN-GIAL-{Math.floor(100000 + Math.random() * 900000)} generated.
                </p>
                <button
                  onClick={() => {
                    setFeeModalOpen(false);
                    setFeePaidSuccess(false);
                  }}
                  className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Close & Download Receipt
                </button>
              </div>
            ) : (
              <form onSubmit={handlePayFee} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-black dark:text-white mb-1">
                    Student ID / Admission No.
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GIAL2024012"
                    value={feeStudentId}
                    onChange={(e) => setFeeStudentId(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/40 dark:bg-white/5 border border-black/15 dark:border-white/15 text-xs text-black dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black dark:text-white mb-1">
                    Fee Amount (₹)
                  </label>
                  <input
                    type="text"
                    required
                    value={feeAmount}
                    onChange={(e) => setFeeAmount(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/40 dark:bg-white/5 border border-black/15 dark:border-white/15 text-xs text-black dark:text-white font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black dark:text-white mb-1">
                    Payment Method
                  </label>
                  <select className="w-full px-3.5 py-2 rounded-xl bg-white/40 dark:bg-black/40 border border-black/15 dark:border-white/15 text-xs text-black dark:text-white outline-none">
                    <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="card">Debit / Credit Card</option>
                    <option value="netbanking">Net Banking (All Indian Banks)</option>
                  </select>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? "Processing Transaction..." : `Pay ₹${feeAmount} Securely`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
