export const dynamic = "force-dynamic";

import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getGoogleDriveImageUrl } from "@/lib/utils";
import { getJourneesServer } from "@/lib/db-server";

export default async function JourneesPage() {
  const displayJournees = await getJourneesServer();
  return (
    <div className="space-y-12 py-8 md:py-12 animate-fadeIn max-w-6xl mx-auto">

      {/* 1. Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-xyrm-green-deep/5 via-xyrm-green-deep/[0.02] to-xyrm-gold/5 border border-xyrm-slate-100 p-8 md:p-12 text-center space-y-4 shadow-sm">
        <div className="absolute -left-16 -top-16 w-36 h-36 bg-xyrm-green-light/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-xyrm-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 rounded-full bg-xyrm-green-deep/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-xyrm-green-deep border border-xyrm-green-deep/10">
          <span className="h-1.5 w-1.5 rounded-full bg-xyrm-gold animate-pulse" />
          ACTIVITÉS
        </div>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-4.5xl tracking-tight max-w-3xl mx-auto">
          Nos Journées thématiques
        </h1>
        <div className="w-12 h-1 bg-gradient-to-r from-xyrm-green-deep to-xyrm-gold mx-auto rounded-full" />
        <p className="text-xs md:text-sm text-xyrm-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          Découvrez les bilans complets, photographies et résumés vidéo de nos rencontres d&apos;échange et de vulgarisation.
        </p>
      </div>

      {/* 2. Journées List Grid (styled like actualités) */}
      {displayJournees.length > 0 ? (
        <div className={
          displayJournees.length === 1
            ? "flex justify-center"
            : displayJournees.length === 2
              ? "flex flex-wrap justify-center gap-6"
              : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        }>
          {displayJournees.map((item) => (
            <div key={item.id} className={displayJournees.length <= 2 ? "w-full max-w-sm" : ""}>
              <Card className="flex flex-col justify-between h-full group hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  {/* Visual placeholder header */}
                  <div className="h-44 w-full bg-xyrm-green-deep/5 rounded-xl border border-xyrm-slate-100 flex items-center justify-center relative overflow-hidden">
                    {item.youtubeId ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : item.drivePhotoId ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={getGoogleDriveImageUrl(item.drivePhotoId)}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <Calendar className="h-8 w-8 text-xyrm-green-light opacity-45 group-hover:scale-105 transition-transform" />
                    )}
                    <div className="absolute right-3 top-3">
                      <Badge variant="payee">
                        {item.subtitle || "Université Populaire"}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 px-1 text-left">
                    <div className="flex items-center gap-2 text-xxs text-xyrm-slate-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</span>
                    </div>
                    <h3 className="text-lg font-black text-xyrm-slate-900 group-hover:text-xyrm-green-primary transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-xyrm-slate-500 font-light leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-6 px-1">
                  <Link
                    href={`/journees/${item.slug}`}
                    className="w-full inline-flex h-10 items-center justify-center rounded-lg border border-xyrm-slate-200 text-xs font-bold text-xyrm-slate-700 hover:bg-xyrm-slate-50 transition-colors"
                  >
                    Consulter
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-xl mx-auto bg-xyrm-slate-50 border border-xyrm-slate-200/60 rounded-3xl p-10 md:p-12 text-center space-y-6 shadow-sm animate-fadeIn">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-xyrm-gold/10 text-xyrm-gold-dark ring-4 ring-xyrm-gold/5">
            <Calendar className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-xyrm-slate-900 tracking-tight">
              Aucun bilan disponible pour le moment
            </h3>
            <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed max-w-sm mx-auto">
              Nos futurs ateliers de vulgarisation populaire, forums citoyens et actions solidaires seront répertoriés ici dès leur tenue.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/actualites"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-xyrm-green-deep px-6 text-xs font-bold text-white shadow hover:bg-xyrm-green-primary transition-all"
            >
              Consulter nos Actualités
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
