"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Building,
  HelpCircle,
} from "lucide-react";

const DIRECTORY = [
  {
    dept: "Admissions & Inquiries",
    person: "Admissions Officer",
    phone: "+91 94471 23456",
    email: "admissions@gial.edu.in",
  },
  {
    dept: "Principal's Office",
    person: "Rev. Fr. Principal",
    phone: "+91 481 2578901",
    email: "principal@gial.edu.in",
  },
  {
    dept: "IQAC & Accreditation Cell",
    person: "Coordinator",
    phone: "+91 481 2578902",
    email: "iqac@gial.edu.in",
  },
  {
    dept: "Placement & Corporate Relations",
    person: "Placement Officer",
    phone: "+91 94472 34567",
    email: "placements@gial.edu.in",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ─── Hero Header ─── */}
      <section className="text-center py-12 md:py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-4 backdrop-blur-xl">
          <Sparkles size={14} />
          <span>Bethany Hills, Kottayam, Kerala</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 font-[family-name:var(--font-outfit)] text-black dark:text-white leading-tight">
          Get in <span className="text-shimmer">Touch</span>
        </h1>
        <p className="text-base sm:text-xl text-black/80 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
          Have questions regarding admissions, programs, campus life, or compliance? Our team is here to assist you.
        </p>
      </section>

      {/* ─── Main Grid: Form + Info ─── */}
      <div className="grid lg:grid-cols-12 gap-8 my-10">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 liquid-glass rounded-3xl p-6 sm:p-10 border border-white/70 dark:border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/10 dark:border-white/10">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <MessageSquare size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white font-[family-name:var(--font-outfit)]">
                Send an Official Inquiry
              </h2>
              <p className="text-xs text-black/70 dark:text-gray-300 font-medium">
                We usually respond within 1 business day.
              </p>
            </div>
          </div>

          {isSent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-black text-black dark:text-white mb-2 font-[family-name:var(--font-outfit)]">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-black/80 dark:text-gray-200 max-w-md mx-auto mb-6">
                Thank you for contacting Girideepam Institute of Advanced Learning. Our administrative desk will get back to you shortly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Nair"
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
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-black/40 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                  >
                    <option value="Admissions" className="text-black">Admissions & Eligibility</option>
                    <option value="Academics" className="text-black">Programs & Curriculum</option>
                    <option value="Fees" className="text-black">Fee Payment & Scholarships</option>
                    <option value="IQAC" className="text-black">IQAC & Compliance</option>
                    <option value="General" className="text-black">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black dark:text-white mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Address Card */}
          <div className="liquid-glass rounded-3xl p-6 border border-white/70 dark:border-white/20 shadow-xl">
            <h3 className="text-lg font-black text-black dark:text-white mb-4 font-[family-name:var(--font-outfit)] flex items-center gap-2">
              <Building size={18} className="text-emerald-500" />
              <span>Campus Address</span>
            </h3>
            <div className="space-y-3 text-xs text-black/80 dark:text-gray-200 font-medium">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-black dark:text-white">Girideepam Institute of Advanced Learning</div>
                  <div>Bethany Hills, Vadavathoor P.O.,</div>
                  <div>Kottayam, Kerala — 686 010, India</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-emerald-500 flex-shrink-0" />
                <span>+91 481 2578901 / +91 94471 23456</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-emerald-500 flex-shrink-0" />
                <span>info@gial.edu.in</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={16} className="text-emerald-500 flex-shrink-0" />
                <span>Monday – Friday: 8:30 AM – 4:30 PM</span>
              </div>
            </div>
          </div>

          {/* Directory Quick Cards */}
          <div className="liquid-glass rounded-3xl p-6 border border-white/70 dark:border-white/20 shadow-xl">
            <h3 className="text-lg font-black text-black dark:text-white mb-4 font-[family-name:var(--font-outfit)] flex items-center gap-2">
              <HelpCircle size={18} className="text-emerald-500" />
              <span>Key Contacts</span>
            </h3>
            <div className="space-y-3">
              {DIRECTORY.map((d) => (
                <div key={d.dept} className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs">
                  <div className="font-bold text-black dark:text-white mb-0.5">{d.dept}</div>
                  <div className="text-[11px] text-black/60 dark:text-gray-400 mb-1">{d.person}</div>
                  <div className="flex items-center justify-between text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>{d.phone}</span>
                    <span>{d.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
