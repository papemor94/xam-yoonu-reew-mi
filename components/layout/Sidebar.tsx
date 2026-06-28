"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Calendar, 
  Video, 
  Settings, 
  LogOut,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
    { name: "Factures et Dons", href: "/factures", icon: FileText },
    { name: "Membres", href: "/membres", icon: Users },
    { name: "Événements", href: "/evenements", icon: Calendar },
    { name: "Vidéothèque", href: "/videos", icon: Video },
    { name: "Paramètres", href: "/parametres", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed bottom-0 top-0 z-50 flex w-64 flex-col border-r border-xyrm-green-light/20 bg-xyrm-green-deep text-white transition-all duration-300 ease-in-out lg:left-0",
          isOpen ? "left-0" : "-left-64",
          "lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="relative flex h-20 items-center justify-between px-6 border-b border-xyrm-green-light/20">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            {/* Brand Logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border border-white/10 bg-white transition-transform duration-300 group-hover:scale-105 shrink-0 shadow-sm">
              <img src="/logo.png" alt="Logo Xam Yoonu Reew Mi" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-white">
                XAM YOONU
              </span>
              <span className="text-xxs font-semibold tracking-widest text-xyrm-gold">
                REEW MI
              </span>
            </div>
          </Link>

          {/* Close button for Mobile Menu */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-xyrm-green-primary text-xyrm-slate-200 hover:text-white transition-colors lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Institution Info */}
        <div className="px-6 py-4 bg-xyrm-green-primary/30 border-b border-xyrm-green-light/10">
          <p className="text-[10px] uppercase font-bold tracking-widest text-xyrm-gold/80">
            Université Populaire
          </p>
          <p className="text-[11px] text-white/70 font-medium">
            Citoyenne et Solidaire
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? "bg-xyrm-green-primary text-white shadow-inner font-semibold border-l-4 border-xyrm-gold"
                    : "text-white/70 hover:bg-xyrm-green-primary/40 hover:text-white"
                )}
                onClick={onClose}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-xyrm-gold" : "text-white/60 group-hover:text-white"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Logout button */}
        <div className="p-4 border-t border-xyrm-green-light/20 bg-xyrm-green-primary/10">
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 hover:bg-rose-950/30 hover:text-rose-200 cursor-pointer transition-colors group">
            <LogOut className="h-5 w-5 text-white/50 group-hover:text-rose-400" />
            <span>Déconnexion</span>
          </div>
          <div className="mt-4 text-center">
            <p className="text-[10px] text-white/40">© 2026 Xam Yoonu Reew Mi</p>
          </div>
        </div>
      </aside>
    </>
  );
}
