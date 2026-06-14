import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Video } from "lucide-react";
import { mockJournees } from "@/data/mock/journees";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function JourneesPage() {
  return (
    <div className="space-y-12 py-8 md:py-12 animate-fadeIn max-w-6xl mx-auto">
      
      {/* 1. Header */}
      <div className="space-y-4 text-center">
        <Badge variant="default" className="font-bold">ACTIVITÉS</Badge>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-5xl tracking-tight">
          Nos Journées thématiques
        </h1>
        <p className="text-sm md:text-base text-xyrm-slate-500 font-light max-w-2xl mx-auto">
          Découvrez les bilans complets, photographies et résumés vidéo de nos rencontres d&apos;échange et de vulgarisation.
        </p>
      </div>

      {/* 2. Journées List Grid */}
      <div className="grid gap-8 max-w-4xl mx-auto">
        {mockJournees.map((item) => (
          <Card key={item.id} className="p-0 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-all duration-300 group">
            
            {/* Visual Cover Side (replicates flyer theme) */}
            <div className="md:w-1/3 bg-xyrm-green-deep p-8 text-white flex flex-col justify-between relative overflow-hidden shrink-0 min-h-[200px]">
              <div className="absolute -left-12 -bottom-12 w-28 h-28 bg-xyrm-gold/15 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2 relative">
                <p className="text-[10px] uppercase font-bold tracking-widest text-xyrm-gold">
                  {item.subtitle}
                </p>
                <h3 className="text-lg font-black leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="space-y-2 pt-8 text-[11px] font-semibold text-white/80 relative">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-xyrm-gold" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-xyrm-gold" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Details Content Side */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="envoyee">Bilan disponible</Badge>
                  {item.youtubeId && (
                    <span className="inline-flex items-center gap-1 text-xxs font-bold text-xyrm-green-light bg-xyrm-green-deep/5 px-2 py-0.5 rounded-full border border-xyrm-green-light/10">
                      <Video className="h-3 w-3" />
                      Vidéo incluse
                    </span>
                  )}
                </div>
                
                <h4 className="text-xl font-bold text-xyrm-slate-900 group-hover:text-xyrm-green-primary transition-colors leading-snug">
                  Bilan & Déroulement de l&apos;événement
                </h4>
                <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-xyrm-slate-100 flex items-center justify-between mt-6">
                <span className="text-[10px] uppercase font-bold tracking-wider text-xyrm-slate-400">
                  Université Populaire
                </span>
                
                <Link
                  href={`/journees/${item.slug}`}
                  className="inline-flex h-9 items-center justify-center rounded-xl bg-xyrm-green-deep px-5 text-xs font-bold text-white shadow hover:bg-xyrm-green-primary transition-all group-hover:translate-x-0.5"
                >
                  Consulter le Bilan
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </div>
            </div>

          </Card>
        ))}
      </div>

    </div>
  );
}
