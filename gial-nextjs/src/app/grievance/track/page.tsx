"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Clock, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { trackGrievance } from "@/lib/actions/grievance.actions";
import { formatDate } from "@/lib/utils";

export default function GrievanceTrackPage() {
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId) return;
    
    setLoading(true);
    setError(null);
    
    const res = await trackGrievance(ticketId);
    
    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.error || "Failed to track ticket");
      setResult(null);
    }
    
    setLoading(false);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/grievance" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back to Grievance Registration
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-outfit)] mb-4">
            Track Your <span className="text-shimmer">Grievance</span>
          </h1>
          <p className="text-gray-400">
            Enter the unique Ticket ID provided when you submitted your grievance to check its current status and view any resolution notes from the committee.
          </p>
        </div>

        <div className="glass-heavy p-8 rounded-2xl relative overflow-hidden shadow-2xl mb-8">
          <form onSubmit={handleTrack} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="Enter Ticket ID (e.g. GRV-XXXX...)"
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 uppercase font-mono transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !ticketId}
              className="px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all spring-bounce disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Searching..." : "Track"}
            </button>
          </form>
          
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 animate-in fade-in">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {result && (
          <div className="glass p-8 rounded-2xl animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">Ticket ID</div>
                <div className="text-2xl font-mono font-bold text-white">{result.ticketId}</div>
              </div>
              
              <div className="flex items-center gap-3">
                {result.status === "Pending" && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Clock size={16} />
                    <span className="font-semibold text-sm">Under Review</span>
                  </div>
                )}
                {result.status === "In-Review" && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Search size={16} />
                    <span className="font-semibold text-sm">Action in Progress</span>
                  </div>
                )}
                {result.status === "Resolved" && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 size={16} />
                    <span className="font-semibold text-sm">Resolved</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-sm text-gray-400 mb-1">Category</div>
                <div className="font-medium text-white">{result.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1 flex items-center gap-1">
                  <Calendar size={14} /> Submitted On
                </div>
                <div className="font-medium text-white">{formatDate(result.createdAt)}</div>
              </div>
            </div>

            {result.resolutionNotes && (
              <div className="mt-8 p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 relative">
                <div className="absolute top-0 left-6 -translate-y-1/2 px-2 bg-[var(--clr-bg-deep)] text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                  Official Committee Resolution
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap mt-2">
                  {result.resolutionNotes}
                </p>
                <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  Resolved on {formatDate(result.updatedAt)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
