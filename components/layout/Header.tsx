"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "L'Association", href: "/association" },
    { name: "Actualités", href: "/actualites" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-xyrm-slate-200 bg-white/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
        
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-xyrm-green-deep text-xyrm-gold font-bold shadow-md transition-transform duration-300 group-hover:scale-105">
            <Compass className="h-6 w-6 text-xyrm-gold" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-wider text-xyrm-green-deep leading-none">
              XAM YOONU
            </span>
            <span className="text-xxs font-bold tracking-widest text-xyrm-gold leading-none mt-1">
              REEW MI
            </span>
            <span className="text-[9px] text-xyrm-slate-500 hidden sm:inline leading-none mt-0.5">
              Université Populaire Citoyenne & Solidaire
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-colors relative py-2",
                  isActive
                    ? "text-xyrm-green-primary"
                    : "text-xyrm-slate-600 hover:text-xyrm-green-deep"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-xyrm-gold animate-fadeIn" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-xyrm-green-deep px-5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-xyrm-green-primary hover:shadow-lg hover:-translate-y-0.5"
          >
            Nous Rejoindre
          </Link>
        </div>

        {/* Mobile Hamburger menu toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2.5 text-xyrm-slate-700 hover:bg-xyrm-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-xyrm-slate-100 p-6 flex flex-col md:hidden animate-fadeIn">
          <nav className="flex flex-col gap-6 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-lg font-bold tracking-wide transition-colors border-b border-xyrm-slate-100 pb-3",
                    isActive
                      ? "text-xyrm-green-primary border-xyrm-green-primary/30 pl-2"
                      : "text-xyrm-slate-800 hover:text-xyrm-green-deep"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto py-6">
            <Link
              href="/contact"
              className="flex w-full h-12 items-center justify-center rounded-xl bg-xyrm-green-deep text-base font-bold text-white shadow-lg transition-colors hover:bg-xyrm-green-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nous Rejoindre
            </Link>
            <p className="mt-4 text-center text-xs text-xyrm-slate-400">
              Xam Yoonu Reew Mi • UPCS
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
