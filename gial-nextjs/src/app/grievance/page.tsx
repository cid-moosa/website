"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, ChevronRight, FileWarning, Search } from "lucide-react";
import { GRIEVANCE_CATEGORIES } from "@/types";
import { submitGrievance } from "@/lib/actions/grievance.actions";

export default function GrievancePage() {
  const [state, formAction, isPending] = useActionState(submitGrievance, null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <FileWarning size={16} />
            Student Grievance Redressal Cell (SGRC)
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
            Register a <span className="text-shimmer">Grievance</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            GIAL is committed to providing a safe, fair, and transparent environment. 
            Use this portal to register complaints regarding academic issues, infrastructure, 
            or instances of ragging/harassment. You may choose to remain anonymous.
          </p>
          
          <div className="mt-8 flex justify-center">
            <Link 
              href="/grievance/track" 
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all spring-bounce"
            >
              <Search size={16} />
              Track Existing Grievance
              <ChevronRight size={16} className="text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="glass-heavy p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-2xl">
          {state?.success ? (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={40} className="text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Grievance Submitted</h3>
              <p className="text-gray-300 mb-6">
                {state.message}
              </p>
              <div className="inline-block bg-black/40 border border-white/10 rounded-xl px-8 py-4 mb-8">
                <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Your Ticket ID</div>
                <div className="text-3xl font-mono font-bold text-emerald-400 tracking-wider">
                  {state.ticketId}
                </div>
              </div>
              <div>
                <p className="text-sm text-amber-400/80 mb-6 flex items-center justify-center gap-2">
                  <AlertCircle size={16} />
                  Please save this ID safely. You will need it to track your resolution status.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form action={formAction} className="space-y-6">
              {state?.error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 animate-in fade-in">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p>{state.error}</p>
                </div>
              )}

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 mb-8">
                <input 
                  type="checkbox" 
                  id="isAnonymous" 
                  name="isAnonymous"
                  className="w-5 h-5 rounded border-gray-500 bg-transparent text-emerald-500 focus:ring-emerald-500/50 focus:ring-offset-0"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <label htmlFor="isAnonymous" className="text-gray-300 cursor-pointer select-none font-medium">
                  Submit Anonymously
                </label>
                <div className="ml-auto text-xs text-gray-500 hidden sm:block">
                  Your identity will be hidden from the investigation committee.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300" style={{ opacity: isAnonymous ? 0.5 : 1 }}>
                <div className="space-y-2">
                  <label htmlFor="studentName" className="text-sm font-medium text-gray-300">
                    Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    disabled={isAnonymous}
                    required={!isAnonymous}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                  <p className="text-xs text-gray-500">Required even for anonymous submissions (to receive updates securely).</p>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-gray-300">
                  Grievance Category <span className="text-emerald-400">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent appearance-none transition-all"
                >
                  <option value="" disabled selected>Select a category...</option>
                  {GRIEVANCE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-300">
                  Detailed Description <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  minLength={20}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all resize-y"
                  placeholder="Please describe your grievance in detail. Include relevant dates, times, and locations if applicable."
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all spring-bounce shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Grievance Securely"
                )}
              </button>
              
              <div className="text-center mt-6">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/50 inline-block mr-1"></span>
                  Your connection is secure. All data is encrypted in transit and at rest.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
