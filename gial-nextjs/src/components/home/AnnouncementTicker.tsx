import { db } from "@/lib/db";
import { Bell, ChevronRight } from "lucide-react";
import Link from "next/link";

export async function AnnouncementTicker() {
  const tickerNotices = await db.notice.findMany({
    where: { isTickerActive: true },
    orderBy: { publishedDate: "desc" },
    take: 5,
  });

  if (tickerNotices.length === 0) return null;

  return (
    <div className="relative z-20 bg-emerald-950/60 border-y border-emerald-500/20 backdrop-blur-md overflow-hidden py-2.5">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-4">
        <div className="shrink-0 flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider shadow-sm">
          <Bell size={13} className="animate-bounce" />
          <span>Latest Updates</span>
        </div>

        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="inline-flex gap-12 animate-marquee items-center text-xs text-emerald-200">
            {tickerNotices.map((notice) => (
              <Link
                key={notice.id}
                href="/notices"
                className="hover:underline hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-semibold text-amber-300">[{notice.category}]</span>
                <span>{notice.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/notices"
          className="shrink-0 hidden sm:flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
        >
          View All <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
