import { db } from "@/lib/db";
import { FileText, Download, Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function NoticesPage(props: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const categoryFilter = searchParams.category;
  const searchQuery = searchParams.q;

  const notices = await db.notice.findMany({
    where: {
      AND: [
        categoryFilter ? { category: categoryFilter } : {},
        searchQuery ? {
          OR: [
            { title: { contains: searchQuery } },
            { content: { contains: searchQuery } },
          ],
        } : {},
      ],
    },
    orderBy: { publishedDate: "desc" },
  });

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-4">
            Notices & <span className="text-shimmer">Circulars</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Official announcements, academic schedules, examination timetables, and university circulars.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Search</h3>
              <form className="relative">
                <input 
                  type="text" 
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Search notices..." 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
                {categoryFilter && <input type="hidden" name="category" value={categoryFilter} />}
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h3>
              <div className="space-y-2">
                {[
                  { id: "", label: "All Notices" },
                  { id: "Academic", label: "Academic" },
                  { id: "Exam", label: "Examinations" },
                  { id: "Event", label: "Events & Fests" },
                  { id: "Urgent", label: "Urgent/Important" },
                ].map((cat) => {
                  const isActive = (categoryFilter || "") === cat.id;
                  return (
                    <a
                      key={cat.label}
                      href={`/notices?${new URLSearchParams({
                        ...(cat.id ? { category: cat.id } : {}),
                        ...(searchQuery ? { q: searchQuery } : {}),
                      }).toString()}`}
                      className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                        isActive 
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                          : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                      }`}
                    >
                      {cat.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
            {notices.length === 0 ? (
              <div className="glass p-12 rounded-2xl text-center">
                <FileText size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl text-white font-semibold mb-2">No notices found</h3>
                <p className="text-gray-400">Try adjusting your search or category filters.</p>
              </div>
            ) : (
              notices.map((notice) => (
                <div key={notice.id} className="glass p-6 rounded-2xl hover:bg-white/5 transition-colors group relative overflow-hidden">
                  {notice.category === "Urgent" && (
                    <div className="absolute top-0 right-0 w-2 h-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider ${
                          notice.category === "Urgent" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                          notice.category === "Exam" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                          "bg-white/10 text-gray-300 border border-white/10"
                        }`}>
                          {notice.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar size={12} />
                          {formatDate(notice.publishedDate)}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {notice.title}
                      </h3>
                      
                      {notice.content && (
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                          {notice.content}
                        </p>
                      )}
                    </div>
                    
                    {notice.attachmentUrl && (
                      <div className="shrink-0">
                        <a 
                          href={notice.attachmentUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-black/40 hover:bg-emerald-600 hover:border-emerald-500 hover:text-white text-gray-300 text-sm font-medium transition-all spring-bounce"
                        >
                          <Download size={16} />
                          Download PDF
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
