"use client";

import { useEffect, useState } from "react";
import { getGoogleDriveImageUrl } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Calendar, User, FileText, Scale, Landmark, HeartHandshake } from "lucide-react";
import { mockArticles } from "@/data/mock/articles";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { getArticles, getJournees } from "@/lib/db";
import { JourneeItem } from "@/data/mock/journees";



export default function HomePage() {
  const [articles, setArticles] = useState(mockArticles);
  const [upcomingJrn, setUpcomingJrn] = useState<JourneeItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getArticles().then((data) => setArticles(data));

    // Date parser for DD/MM/YYYY
    const parseDate = (dateStr: string) => {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        return new Date(
          parseInt(parts[2], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[0], 10)
        );
      }
      return new Date();
    };

    getJournees().then((dbJournees) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const sortedUpcoming = dbJournees
        .filter((jrn) => {
          const eventDate = parseDate(jrn.date);
          eventDate.setHours(23, 59, 59, 999); // show on the event day itself
          return eventDate >= today;
        })
        .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

      if (sortedUpcoming.length > 0) {
        setUpcomingJrn(sortedUpcoming[0]);
      } else {
        setUpcomingJrn(null);
      }
    });
  }, []);

  const latestArticles = (mounted ? articles : mockArticles)
    .filter((art) => art.isFeatured)
    .slice(0, 3);

  return (
    <div className="space-y-20 pb-20 animate-fadeIn">

      {/* 1. Hero Section (Cinematic brand identity) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-xyrm-green-deep to-xyrm-green-primary text-white shadow-2xl border border-xyrm-green-light/20">
        {/* Ambient lighting mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-xyrm-gold/15 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-xyrm-gold/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute right-10 bottom-10 w-72 h-72 bg-xyrm-green-light/15 rounded-full blur-3xl pointer-events-none" />

        {/* Visual vertical bands like in the flyer */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.04] flex gap-4 pointer-events-none">
          <div className="w-1/3 bg-xyrm-gold h-full" />
          <div className="w-1/3 bg-xyrm-gold h-full" />
          <div className="w-1/3 bg-xyrm-gold h-full" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20 text-center space-y-8">
          {/* Logo badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-xyrm-gold">
            <div className="h-5 w-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-sm">
              <img src="/logo.png" alt="Logo Xam Yoonu Reew Mi" className="h-full w-full object-cover" />
            </div>
            Université Populaire Citoyenne et Solidaire
          </div>

          <h1 className="text-4xl font-black md:text-6.5xl tracking-tight leading-none bg-gradient-to-r from-white via-amber-50 to-xyrm-gold text-transparent bg-clip-text max-w-4xl mx-auto drop-shadow-sm">
            XAM YOONU REEW MI
          </h1>

          <div className="mx-auto max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 md:p-6 shadow-inner relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-xyrm-gold via-xyrm-gold/50 to-transparent rounded-l-2xl" />
            <p className="text-xs md:text-sm text-amber-50/80 leading-relaxed font-semibold italic text-left pl-3">
              « Vulgariser le droit, les politiques publiques et les sciences utiles au vivre-ensemble et au développement harmonieux de nos sociétés. »
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link
              href="/association"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl bg-xyrm-gold px-8 text-sm font-black text-xyrm-green-deep shadow-lg hover:bg-xyrm-gold/90 transition-all hover:scale-105"
            >
              Découvrir Notre Mission
            </Link>
            <Link
              href="/journees"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-8 text-sm font-bold text-white transition-all hover:border-white/25"
            >
              Voir Nos Journées
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Featured Event / Banner (Visual Flyer Reconstructed) */}
      {upcomingJrn && (
        <section className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="rounded-3xl border border-xyrm-slate-200 bg-white p-8 md:p-12 shadow-lg relative overflow-hidden grid md:grid-cols-2 gap-8 items-center">
            <div className="absolute right-0 top-0 w-32 h-32 bg-xyrm-gold/5 rounded-full blur-2xl pointer-events-none" />

            {/* Text Detail */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-xyrm-green-emerald animate-ping" />
                <Badge variant="envoyee" className="font-bold">ÉVÉNEMENT À VENIR</Badge>
              </div>
              <h3 className="text-2xl font-black text-xyrm-slate-900 md:text-3xl leading-tight">
                {upcomingJrn.title}
              </h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-xyrm-gold-dark">
                {upcomingJrn.subtitle}
              </p>
              <div className="space-y-3 p-4 bg-xyrm-slate-50 rounded-2xl border border-xyrm-slate-100">
                <p className="text-xs font-bold text-xyrm-slate-500 uppercase tracking-widest">Thème Central</p>
                <p className="text-sm font-black text-xyrm-green-deep leading-snug">
                  {upcomingJrn.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-bold items-center">
                <span className="bg-xyrm-green-deep text-white px-4 py-2.5 rounded-xl border border-xyrm-green-deep shadow-sm">
                  {upcomingJrn.date}
                </span>
                <span className="bg-white border border-xyrm-slate-200 text-xyrm-slate-700 px-4 py-2.5 rounded-xl">
                  {upcomingJrn.location}
                </span>

                <Link
                  href={`/journees/${upcomingJrn.slug}`}
                  className="inline-flex h-9 items-center justify-center rounded-xl bg-xyrm-gold px-5 text-xs font-black text-xyrm-green-deep hover:bg-xyrm-gold/90 transition-all ml-auto hover:scale-105"
                >
                  En savoir plus
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Graphical/Illustrative Box */}
            <div className="relative h-64 md:h-80 w-full rounded-2xl bg-xyrm-green-deep flex flex-col justify-between p-6 overflow-hidden border border-xyrm-green-light/20 shadow-inner">
              <div className="absolute -left-16 -top-16 w-40 h-40 bg-xyrm-gold/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute right-4 bottom-4 w-32 h-32 bg-xyrm-green-light/30 rounded-full blur-2xl pointer-events-none" />

              {/* Logo watermark */}
              <div className="flex justify-between items-start w-full">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-white/10 p-1 shrink-0">
                  <img src="/logo.png" alt="Logo Xam Yoonu Reew Mi" className="h-full w-full object-cover" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-xyrm-gold/80 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {upcomingJrn.location.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 relative">
                <p className="text-xxs uppercase font-bold tracking-widest text-xyrm-gold">Lieu de l&apos;événement</p>
                <p className="text-sm font-black text-white leading-normal">
                  {upcomingJrn.locationDetails ? upcomingJrn.locationDetails.split(",")[0] : upcomingJrn.location}
                </p>
                <p className="text-xs text-white/70 font-light">
                  {upcomingJrn.locationDetails && upcomingJrn.locationDetails.split(",").length > 1
                    ? upcomingJrn.locationDetails.split(",").slice(1).join(",")
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Core Pillars (Université Populaire Citoyenne et Solidaire) */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 space-y-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-xyrm-green-deep/5 via-xyrm-green-deep/[0.02] to-xyrm-gold/5 border border-xyrm-slate-100 p-8 md:p-12 text-center space-y-4 shadow-sm max-w-5xl mx-auto">
          <div className="absolute -left-16 -top-16 w-36 h-36 bg-xyrm-green-light/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-xyrm-gold/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 rounded-full bg-xyrm-green-deep/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-xyrm-green-deep border border-xyrm-green-deep/10">
            <span className="h-1.5 w-1.5 rounded-full bg-xyrm-gold animate-pulse" />
            NOS PILIERS
          </div>
          <h2 className="text-2xl font-black text-xyrm-slate-900 md:text-3.5xl tracking-tight max-w-3xl mx-auto">
            Université Populaire Citoyenne et Solidaire
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-xyrm-green-deep to-xyrm-gold mx-auto rounded-full" />
          <p className="text-xs md:text-sm text-xyrm-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            Notre structure repose sur trois engagements fondamentaux pour émanciper, débattre et soutenir activement.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {/* Pillar 1: Vulgarisation du Droit */}
          <Card className="flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-xyrm-green-deep/5 text-xyrm-green-primary">
                <Scale className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-xyrm-slate-900">
                Vulgarisation du Droit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
                Rendre accessibles les normes constitutionnelles, administratives et civiles utiles à la vie quotidienne, y compris en langues nationales sénégalaises.
              </p>
            </CardContent>
          </Card>

          {/* Pillar 2: Explication des Institutions */}
          <Card className="flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-xyrm-green-deep/5 text-xyrm-green-primary">
                <Landmark className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-xyrm-slate-900">
                Les politiques publiques et autres sciences utiles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
                Expliquer le fonctionnement de l&apos;État, la gestion des finances publiques, de l&apos;éducation, de la santé, et l&apos;impact concret des politiques publiques.
              </p>
            </CardContent>
          </Card>

          {/* Pillar 3: Actions Sociales et Solidarité */}
          <Card className="flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-xyrm-green-deep/5 text-xyrm-green-primary">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-xyrm-slate-900">
                Actions Sociales et Solidarité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
                Déployer des actions de solidarité pour les familles de la diaspora, soutenir les écoles en difficulté et accompagner les populations vulnérables.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* 4. Latest News (Blog Grid) */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 space-y-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-xyrm-green-deep/5 via-xyrm-green-deep/[0.02] to-xyrm-gold/5 border border-xyrm-slate-100 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="absolute -left-16 -top-16 w-36 h-36 bg-xyrm-green-light/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-xyrm-gold/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3 relative text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-xyrm-green-deep/10 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-xyrm-green-deep border border-xyrm-green-deep/10">
              <span className="h-1 w-1 rounded-full bg-xyrm-gold animate-pulse" />
              ACTUALITÉS & MÉDIAS
            </div>
            <h2 className="text-xl md:text-2.5xl font-black text-xyrm-slate-900 tracking-tight">
              Dernières Actualités
            </h2>
            <p className="text-xs md:text-sm text-xyrm-slate-600 font-light max-w-2xl leading-relaxed">
              Suivez l&apos;impact de nos actions et accédez à nos publications d&apos;éducation populaire.
            </p>
          </div>

          <Link
            href="/actualites"
            className="group shrink-0 inline-flex h-11 items-center justify-center rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary px-6 text-xs font-bold text-white shadow-md transition-all hover:scale-105"
          >
            Voir Tous les Articles
            <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {!mounted ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 w-full bg-xyrm-slate-100/70 animate-pulse rounded-2xl border border-xyrm-slate-100" />
            ))}
          </div>
        ) : latestArticles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((art) => (
              <Card key={art.id} className="flex flex-col justify-between h-full group hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  {/* Simulated cover card */}
                  <div className="h-44 w-full bg-xyrm-green-deep/5 rounded-xl border border-xyrm-slate-100 flex items-center justify-center relative overflow-hidden">
                    {art.youtubeId ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={`https://img.youtube.com/vi/${art.youtubeId}/mqdefault.jpg`}
                        alt={art.title}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : art.drivePhotoId ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={getGoogleDriveImageUrl(art.drivePhotoId)}
                        alt={art.title}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-350"
                        loading="lazy"
                      />
                    ) : (
                      <FileText className="h-8 w-8 text-xyrm-green-light opacity-45 group-hover:scale-105 transition-transform" />
                    )}
                    <div className="absolute right-3 top-3">
                      <Badge variant={art.category === "initiative" ? "payee" : art.category === "actualite" ? "envoyee" : "default"}>
                        {art.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 px-1">
                    <div className="flex items-center gap-2 text-xxs text-xyrm-slate-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {art.authorName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {art.publishedAt}</span>
                    </div>
                    <h3 className="text-lg font-black text-xyrm-slate-900 group-hover:text-xyrm-green-primary transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-xyrm-slate-500 font-light leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-6 px-1">
                  <Link
                    href={`/actualites/${art.slug}`}
                    className="w-full inline-flex h-9 items-center justify-center rounded-lg border border-xyrm-slate-200 text-xs font-bold text-xyrm-slate-700 hover:bg-xyrm-slate-50 transition-colors"
                  >
                    Lire l&apos;Article
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-xyrm-slate-400 font-light">
            Aucun article en vedette disponible pour le moment.
          </div>
        )}
      </section>

      {/* 5. CTA Section (Join / Support) */}
      <section className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="rounded-3xl bg-xyrm-slate-900 p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden border border-xyrm-slate-800">
          <div className="absolute -left-20 -bottom-20 h-52 w-52 rounded-full bg-xyrm-gold/5 blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-xyrm-green-light/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl font-black md:text-3.5xl tracking-tight leading-tight">
              Bâtissons Ensemble une Citoyenneté Solidaire
            </h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Que vous soyez juriste, éducateur, parent ou citoyen désireux de vous former, vous avez votre place à l&apos;Université Populaire. Contactez notre équipe pour participer à nos prochains ateliers.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-xyrm-gold px-8 text-sm font-black text-xyrm-green-deep shadow-md hover:bg-xyrm-gold/90 transition-all hover:-translate-y-0.5"
              >
                Rejoindre l&apos;Initiative
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
