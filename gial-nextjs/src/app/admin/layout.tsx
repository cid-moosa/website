import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, FileText, Users, ShieldAlert, BookOpen, LogOut } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const role = (session.user as any).role;
  if (role !== "SUPER_ADMIN" && role !== "IQAC_COORDINATOR") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass p-8 rounded-xl text-center">
          <h2 className="text-xl text-red-400 mb-2">Access Denied</h2>
          <p className="text-gray-400">You do not have permission to view the admin panel.</p>
          <Link href="/" className="text-emerald-400 mt-4 inline-block hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Grievances", href: "/admin/grievances", icon: ShieldAlert },
    { label: "Notices & Circulars", href: "/admin/notices", icon: FileText },
    { label: "IQAC Documents", href: "/admin/iqac", icon: BookOpen },
    { label: "Faculty Directory", href: "/admin/faculty", icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--clr-bg-deep)]">
      {/* Sidebar */}
      <aside className="w-64 glass-heavy border-r border-white/5 flex flex-col relative z-20">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="block">
            <span className="text-2xl font-bold tracking-tight text-white font-[family-name:var(--font-outfit)]">
              GIAL <span className="text-emerald-400">Admin</span>
            </span>
          </Link>
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Signed in as {role}
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link 
            href="/api/auth/signout"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors w-full"
          >
            <LogOut size={18} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
