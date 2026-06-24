"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  ArrowLeft,
  Menu,
  X,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
    { name: "Actualités", href: "/admin/actualites", icon: BookOpen },
    { name: "Journées d'Activité", href: "/admin/journees", icon: Calendar },
    { name: "Contacts & Adhésions", href: "/admin/contacts", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-xyrm-slate-50 text-xyrm-slate-900 flex">
      {/* Sidebar - Desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-xyrm-green-light/20 bg-xyrm-green-deep text-white lg:flex">
        {/* Logo and Brand */}
        <div className="flex h-20 items-center gap-2.5 px-6 border-b border-xyrm-green-light/20">
          <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border border-white/10 bg-white shadow-md shrink-0">
            <img src="/logo.png" alt="Logo Xam Yoonu Reew Mi" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-white">
              XAM YOONU
            </span>
            <span className="text-[10px] font-bold tracking-widest text-xyrm-gold">
              REEW MI
            </span>
          </div>
        </div>

        {/* Info panel */}
        <div className="px-6 py-4 bg-xyrm-green-primary/30 border-b border-xyrm-green-light/10">
          <p className="text-[9px] uppercase font-bold tracking-widest text-xyrm-gold/80">
            Espace d&apos;Administration
          </p>
          <p className="text-[11px] text-white/70 font-medium">
            Gestion des Contenus
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group border-l-4",
                  isActive
                    ? "bg-xyrm-green-primary text-white border-xyrm-gold font-semibold"
                    : "text-white/70 border-transparent hover:bg-xyrm-green-primary/40 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-xyrm-gold" : "text-white/50 group-hover:text-white"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Back to site */}
        <div className="p-4 border-t border-xyrm-green-light/20 bg-xyrm-green-primary/10">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4.5 w-4.5 text-white/50 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
            <span>Retour au Site</span>
          </Link>
        </div>
      </aside>

      {/* Sidebar - Mobile drawer */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed bottom-0 top-0 z-50 flex w-64 flex-col border-r border-xyrm-green-light/20 bg-xyrm-green-deep text-white transition-all duration-300 ease-in-out lg:hidden",
          sidebarOpen ? "left-0" : "-left-64"
        )}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-xyrm-green-light/20">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border border-white/10 bg-white shadow-sm shrink-0">
              <img src="/logo.png" alt="Logo Xam Yoonu Reew Mi" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wider text-white">XAM YOONU</span>
              <span className="text-[10px] font-bold tracking-widest text-xyrm-gold">REEW MI</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg hover:bg-xyrm-green-primary text-xyrm-slate-200 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 border-l-4",
                  isActive
                    ? "bg-xyrm-green-primary text-white border-xyrm-gold font-semibold"
                    : "text-white/70 border-transparent hover:bg-xyrm-green-primary/40 hover:text-white"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-4.5 w-4.5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-xyrm-green-light/20">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <ArrowLeft className="h-4.5 w-4.5" />
            <span>Retour au Site</span>
          </Link>
        </div>
      </aside>

      {/* Main content body */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
        {/* Mobile top header bar */}
        <header className="flex h-16 items-center justify-between border-b border-xyrm-slate-200 bg-white px-6 lg:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-sm font-black text-xyrm-green-deep tracking-wider">XYRM</span>
            <span className="text-[10px] font-bold text-xyrm-gold bg-xyrm-green-deep/5 px-2 py-0.5 rounded border border-xyrm-gold/20">ADMIN</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-xyrm-slate-700 hover:bg-xyrm-slate-100"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {/* Page children wrapper */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
