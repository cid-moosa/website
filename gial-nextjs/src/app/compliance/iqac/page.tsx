import { db } from "@/lib/db";
import { Download, ShieldCheck, FolderArchive } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function IqacPage(props: {
  searchParams: Promise<{ category?: string; year?: string }>;
}) {
  const searchParams = await props.searchParams;
  const categoryFilter = searchParams.category;
  const yearFilter = searchParams.year;

  // Fetch unique years for the filter dropdown
  const uniqueYearsRaw = await db.iqacDocument.findMany({
    select: { aqarYear: true },
    distinct: ["aqarYear"],
    where: { publicAccess: true },
    orderBy: { aqarYear: "desc" },
  });
  const uniqueYears = uniqueYearsRaw.map((y) => y.aqarYear);

  const documents = await db.iqacDocument.findMany({
    where: {
      publicAccess: true,
      ...(categoryFilter ? { category: categoryFilter } : {}),
      ...(yearFilter ? { aqarYear: yearFilter } : {}),
    },
    orderBy: [{ aqarYear: "desc" }, { category: "asc" }, { uploadedAt: "desc" }],
  });

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <ShieldCheck size={16} />
            Statutory Compliance & Accreditation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-4">
            IQAC Document <span className="text-shimmer">Vault</span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Internal Quality Assurance Cell (IQAC) repository containing official NAAC SSR reports, 
            AQAR submissions, meeting minutes, and feedback analysis reports.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Document Type</h3>
              <div className="space-y-2">
                {[
                  { id: "", label: "All Documents" },
                  { id: "SSR", label: "Self Study Reports (SSR)" },
                  { id: "AQAR", label: "AQAR Reports" },
                  { id: "Minutes", label: "Meeting Minutes" },
                  { id: "Feedback", label: "Feedback Analysis" },
                ].map((cat) => {
                  const isActive = (categoryFilter || "") === cat.id;
                  return (
                    <a
                      key={cat.label}
                      href={`/compliance/iqac?${new URLSearchParams({
                        ...(cat.id ? { category: cat.id } : {}),
                        ...(yearFilter ? { year: yearFilter } : {}),
                      }).toString()}`}
                      className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                        isActive 
                          ? "bg-blue-600 text-white border border-blue-500" 
                          : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
                      }`}
                    >
                      {cat.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Academic Year</h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`/compliance/iqac?${new URLSearchParams({
                    ...(categoryFilter ? { category: categoryFilter } : {}),
                  }).toString()}`}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    !yearFilter 
                      ? "bg-blue-600 text-white" 
                      : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  All Years
                </a>
                {uniqueYears.map((year) => (
                  <a
                    key={year}
                    href={`/compliance/iqac?${new URLSearchParams({
                      ...(categoryFilter ? { category: categoryFilter } : {}),
                      year: year,
                    }).toString()}`}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      yearFilter === year
                        ? "bg-blue-600 text-white" 
                        : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {year}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Document Grid */}
          <div className="lg:col-span-3">
            {documents.length === 0 ? (
              <div className="glass p-12 rounded-2xl text-center">
                <FolderArchive size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl text-white font-semibold mb-2">No documents found</h3>
                <p className="text-gray-400">There are no public records matching these filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="glass p-5 rounded-2xl hover:bg-white/5 transition-colors group flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="px-2 py-1 rounded bg-white/10 border border-white/10 text-xs font-semibold text-gray-300">
                          {doc.category}
                        </span>
                        <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                          {doc.aqarYear}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                        {doc.documentTitle}
                      </h3>
                      <div className="text-xs text-gray-500 mb-4">
                        Uploaded on {formatDate(doc.uploadedAt)}
                      </div>
                    </div>
                    
                    <a 
                      href={doc.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-black/40 border border-white/10 hover:bg-blue-600 hover:border-blue-500 text-sm font-medium text-white transition-all spring-bounce"
                    >
                      <Download size={16} />
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
