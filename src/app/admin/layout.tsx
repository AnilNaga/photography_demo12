"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Image as ImageIcon,
    Video,
    Briefcase,
    Users,
    FileText,
    LogOut,
    Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/photos", label: "Photos", icon: ImageIcon },
    { href: "/admin/videos", label: "Videos", icon: Video },
    { href: "/admin/services", label: "Services", icon: Briefcase },
    { href: "/admin/bookings", label: "Bookings", icon: Users },
    { href: "/admin/blog", label: "Blog", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/admin/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    if (pathname?.startsWith("/admin/login")) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col fixed h-full glass-panel z-20">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold text-white tracking-widest">LUMINA <span className="text-xs font-normal text-white/50">ADMIN</span></h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                                    isActive
                                        ? "bg-white text-black shadow-lg shadow-white/10"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className={cn("w-5 h-5", isActive ? "text-black" : "text-white/60 group-hover:text-white")} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
