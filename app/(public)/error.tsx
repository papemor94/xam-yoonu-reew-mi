"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public area error caught by boundary:", error);
  }, [error]);

  return (
    <div className="py-12 md:py-20 flex items-center justify-center w-full animate-fadeIn">
      <div className="max-w-xl w-full bg-white border border-xyrm-slate-200/80 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-sm relative overflow-hidden">
        {/* Background ambient glows (light theme matching homepage/articles/journees layout) */}
        <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-xyrm-green-deep/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-xyrm-gold/5 rounded-full blur-2xl pointer-events-none" />

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-xyrm-gold/10 text-xyrm-gold-dark border border-xyrm-gold/20 animate-pulse">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <div className="space-y-2 relative">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-xyrm-gold/10 px-3 py-0.5 text-[9px] font-black uppercase tracking-widest text-xyrm-gold-dark border border-xyrm-gold/10">
            Service indisponible
          </div>
          <h1 className="text-2xl font-black text-xyrm-slate-900 tracking-tight pt-2">
            Difficultés de connexion au serveur
          </h1>
          <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed max-w-sm mx-auto">
            Nous rencontrons des difficultés temporaires pour charger les données depuis notre serveur. Nous effectuons peut-être une opération de maintenance de routine.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center relative">
          <button
            onClick={() => reset()}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-xyrm-green-deep text-white px-5 text-xs font-bold shadow hover:bg-xyrm-green-primary transition-all active:scale-98"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Réessayer
          </button>
          
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-xyrm-slate-200 text-xyrm-slate-700 hover:bg-xyrm-slate-50 px-5 text-xs font-bold transition-all active:scale-98"
          >
            <Home className="h-3.5 w-3.5" />
            Retour à l&apos;accueil
          </Link>
        </div>

        <div className="pt-6 border-t border-xyrm-slate-100 text-[10px] text-xyrm-slate-400 font-mono">
          Identifiant d&apos;erreur : {error.digest || "SRV_TIMEOUT_OR_DB_DISCONNECT"}
        </div>
      </div>
    </div>
  );
}
