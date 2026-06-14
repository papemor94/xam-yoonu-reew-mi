import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, ArrowLeft, Clock, Image as ImageIcon } from "lucide-react";
import { mockJournees } from "@/data/mock/journees";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import YouTubeEmbed from "@/components/videos/YouTubeEmbed";

interface JourneeDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return mockJournees.map((item) => ({
    slug: item.slug,
  }));
}

export default function JourneeDetailPage({ params }: JourneeDetailPageProps) {
  const journee = mockJournees.find((item) => item.slug === params.slug);

  if (!journee) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 space-y-10 animate-fadeIn">
      
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
          <Badge variant="default">{journee.subtitle}</Badge>
          <span className="text-xxs font-bold text-xyrm-slate-400 uppercase tracking-widest">
            Compte-rendu officiel
          </span>
        </div>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-4.5xl leading-tight tracking-tight">
          {journee.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-xs text-xyrm-slate-500 font-bold border-y border-xyrm-slate-100 py-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-xyrm-slate-400" />
            Organisé le {journee.date}
          </span>
          <span className="hidden sm:inline text-xyrm-slate-200">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-xyrm-slate-400" />
            {journee.location}
          </span>
        </div>
      </div>

      {/* Video Embed */}
      {journee.youtubeId && (
        <div className="space-y-3">
          <h3 className="text-lg font-black text-xyrm-slate-900 tracking-tight">
            Retour en Vidéo
          </h3>
          <YouTubeEmbed id={journee.youtubeId} title={journee.title} />
        </div>
      )}

      {/* Bilan Content Card */}
      <Card className="p-8 md:p-10 shadow-sm border border-xyrm-slate-100 bg-white">
        <h3 className="text-xl font-black text-xyrm-slate-900 mb-6 tracking-tight border-b border-xyrm-slate-100 pb-3">
          Résumé Synthétique
        </h3>
        <div 
          className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:font-light prose-p:text-xyrm-slate-700 space-y-4"
          dangerouslySetInnerHTML={{ __html: journee.description }}
        />
      </Card>

      {/* Program Timeline */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-xyrm-slate-900 tracking-tight">
          Déroulement & Chronologie de la Journée
        </h3>
        
        <div className="relative border-l border-xyrm-slate-200 ml-4 pl-6 space-y-8">
          {journee.timeline.map((evt, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border border-xyrm-slate-300 ring-4 ring-white group-hover:border-xyrm-green-primary transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-xyrm-slate-400 group-hover:bg-xyrm-green-emerald transition-colors" />
              </span>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-xyrm-gold bg-xyrm-green-deep/5 px-2 py-0.5 rounded-md border border-xyrm-gold/20">
                    <Clock className="h-3 w-3" />
                    {evt.time}
                  </span>
                  <h4 className="text-sm font-bold text-xyrm-slate-900 group-hover:text-xyrm-green-primary transition-colors">
                    {evt.title}
                  </h4>
                </div>
                <p className="text-xs text-xyrm-slate-500 font-light leading-relaxed max-w-2xl pl-1">
                  {evt.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-xyrm-slate-900 tracking-tight">
          Galerie Photos de l&apos;événement
        </h3>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {journee.galleryPlaceholders.map((desc, idx) => (
            <Card key={idx} className="p-0 overflow-hidden group hover:border-xyrm-green-light/35 transition-all duration-300">
              <div className="h-40 bg-xyrm-green-deep/5 flex flex-col justify-between p-5 relative overflow-hidden">
                <div className="absolute right-4 top-4 h-8 w-8 rounded-lg bg-white/50 backdrop-blur-md flex items-center justify-center text-xyrm-green-primary shadow-sm">
                  <ImageIcon className="h-4 w-4" />
                </div>
                
                <div className="mt-auto relative z-10 space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-xyrm-gold-dark bg-xyrm-green-deep/5 px-2 py-0.5 rounded border border-xyrm-gold/10">
                    Photo #{idx + 1}
                  </span>
                  <p className="text-xs font-bold text-xyrm-slate-800 leading-snug pt-1">
                    {desc}
                  </p>
                </div>
                
                {/* Decorative visual grids to simulate a photo frame */}
                <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-xyrm-green-light/5 rounded-full blur-2xl pointer-events-none" />
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
