import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Search, Filter, MessageSquare, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function AdminGrievancesPage(props: {
  searchParams: Promise<{ status?: string }>;
}) {
  const searchParams = await props.searchParams;
  const session = await auth();
  if (!session) redirect("/admin/login");

  const statusFilter = searchParams.status || "All";

  const grievances = await db.grievance.findMany({
    where: statusFilter !== "All" ? { status: statusFilter } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-outfit)]">
            Grievance Redressal Cell
          </h1>
          <p className="text-gray-400">Manage and respond to student complaints securely.</p>
        </div>
      </div>

      <div className="glass-heavy rounded-2xl border border-white/5 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between bg-black/20">
          <div className="flex gap-2">
            {["All", "Pending", "In-Review", "Resolved"].map((status) => (
              <Link
                key={status}
                href={`/admin/grievances${status !== "All" ? `?status=${status}` : ""}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? "bg-emerald-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {status}
              </Link>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search Ticket ID..."
              className="w-full sm:w-64 bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 text-gray-300 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Ticket ID & Date</th>
                <th className="px-6 py-4 font-medium">Student Info</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {grievances.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No grievances found matching the current filter.
                  </td>
                </tr>
              ) : (
                grievances.map((g) => (
                  <tr key={g.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-mono text-emerald-400 font-medium">{g.ticketId}</div>
                      <div className="text-xs text-gray-500 mt-1">{formatDate(g.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4">
                      {g.isAnonymous ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-800 text-gray-400 text-xs">
                          <ShieldAlert size={12} /> Anonymous
                        </span>
                      ) : (
                        <div>
                          <div className="text-white font-medium">{g.studentName}</div>
                          <div className="text-xs text-gray-500">{g.email}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300">
                        {g.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {g.status === "Pending" && (
                        <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-medium">
                          <Clock size={14} /> Pending
                        </span>
                      )}
                      {g.status === "In-Review" && (
                        <span className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-medium">
                          <Search size={14} /> In Review
                        </span>
                      )}
                      {g.status === "Resolved" && (
                        <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                          <CheckCircle2 size={14} /> Resolved
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors">
                        <MessageSquare size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
