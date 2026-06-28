"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import YouTubeEmbed from "@/components/videos/YouTubeEmbed";
import { getJournees } from "@/lib/db";
import { JourneeItem } from "@/data/mock/journees";

interface JourneeDetailClientProps {
  initialJournee: JourneeItem;
  slug: string;
}

export default function JourneeDetailClient({ initialJournee, slug }: JourneeDetailClientProps) {
  const [journee, setJournee] = useState<JourneeItem | null>(initialJournee);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dbJournees = getJournees();
    const current = dbJournees.find((item) => item.slug === slug);
    if (current) {
      setJournee(current);
    } else {
      setJournee(null);
    }
  }, [slug]);

  const displayJrn = mounted ? journee : initialJournee;

  if (!displayJrn) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-xyrm-slate-800">Événement non trouvé</h2>
        <p className="text-xs text-xyrm-slate-500">Ce compte-rendu a pu être supprimé ou désactivé.</p>
        <Link
          href="/journees"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-xyrm-green-deep text-xs font-bold text-white px-5"
        >
          Retour aux journées
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 space-y-10 animate-fadeIn text-left">
      
      {/* Back Button */}
      <Link
        href="/journees"
        className="inline-flex items-center gap-2 text-xs font-bold text-xyrm-slate-500 hover:text-xyrm-green-deep transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux Journées
      </Link>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="default">{displayJrn.subtitle}</Badge>
          <span className="text-xxs font-bold text-xyrm-slate-400 uppercase tracking-widest">
            Compte-rendu officiel
          </span>
        </div>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-4.5xl leading-tight tracking-tight">
          {displayJrn.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-xs text-xyrm-slate-500 font-bold border-y border-xyrm-slate-100 py-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-xyrm-slate-400" />
            Organisé le {displayJrn.date}
          </span>
          <span className="hidden sm:inline text-xyrm-slate-200">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-xyrm-slate-400" />
            {displayJrn.location}
          </span>
        </div>
      </div>

      {/* Video Embed */}
      {displayJrn.youtubeId && (
        <div className="space-y-3">
          <h3 className="text-lg font-black text-xyrm-slate-900 tracking-tight">
            Retour en Vidéo
          </h3>
          <YouTubeEmbed id={displayJrn.youtubeId} title={displayJrn.title} />
        </div>
      )}

      {/* Bilan Content Card */}
      <Card className="p-8 md:p-10 shadow-sm border border-xyrm-slate-100 bg-white">
        <h3 className="text-xl font-black text-xyrm-slate-900 mb-6 tracking-tight border-b border-xyrm-slate-100 pb-3">
          Résumé Synthétique
        </h3>
        <div 
          className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:font-light prose-p:text-xyrm-slate-700 space-y-4"
          dangerouslySetInnerHTML={{ __html: displayJrn.description }}
        />
      </Card>



    </div>
  );
}
