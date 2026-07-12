"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Calendar, User, FileText, GraduationCap, Clock, ArrowRight } from "lucide-react";
import { mockArticles } from "@/data/mock/articles";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

import { getArticles } from "@/lib/db";

type ArticleCategory = "all" | "actualite" | "analyse" | "initiative" | "formation";

interface Formation {
  id: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  target: string;
  pills: string[];
}

const mockFormations: Formation[] = [
  {
    id: "form-001",
    title: "Comprendre la Constitution et les Droits Fondamentaux",
    description: "Un module d'éducation populaire pour décrypter les lois, le fonctionnement de l'État et les droits des citoyens dans un langage accessible à tous.",
    duration: "4 modules d'1h30",
    format: "Hybride",
    target: "Tout public / Citoyens",
    pills: ["Droit", "Civisme", "Vulgarisation"]
  },
  {
    id: "form-002",
    title: "Parentalité et Transmission Culturelle dans la Diaspora",
    description: "Atelier d'échange et d'outillage pour accompagner les parents de la diaspora dans l'éducation biculturelle et la transmission des valeurs familiales.",
    duration: "3 sessions de 2h",
    format: "Présentiel (Toulouse)",
    target: "Parents de la diaspora",
    pills: ["Diaspora", "Éducation", "Famille"]
  },
  {
    id: "form-003",
    title: "Leadership Associatif et Gestion de Projets Locaux",
    description: "Formation pratique destinée aux porteurs de projets et dirigeants associatifs pour structurer, financer et pérenniser leurs initiatives solidaires.",
    duration: "5 modules de 2h",
    format: "En Ligne",
    target: "Porteurs de projet",
    pills: ["Méthodologie", "Projets", "Solidarité"]
  }
];

const getGoogleDriveImageUrl = (idOrUrl: string): string => {
  if (!idOrUrl) return "";
  if (idOrUrl.startsWith("https://lh3.googleusercontent.com/")) return idOrUrl;
  const match = idOrUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || idOrUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  if (idOrUrl.length > 15 && !idOrUrl.startsWith("http")) {
    return `https://lh3.googleusercontent.com/d/${idOrUrl}`;
  }
  return idOrUrl;
};

export default function ActualitesPage() {
  const [articles, setArticles] = useState(mockArticles);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setArticles(getArticles());
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("all");

  const displayArticles = mounted ? articles : mockArticles;

  const categoriesToShow = useMemo(() => {
    return [
      { label: "Tout", value: "all" },
      { label: "Actualités", value: "actualite" },
      { label: "Analyses", value: "analyse" },
      { label: "Initiatives", value: "initiative" },
      { label: "Vulgarisation", value: "formation" },
    ].filter((cat) => {
      if (cat.value === "all") return true;
      return displayArticles.some((art) => art.category === cat.value);
    });
  }, [displayArticles]);

  useEffect(() => {
    const isVisible = categoriesToShow.some((cat) => cat.value === activeCategory);
    if (!isVisible) {
      setActiveCategory("all");
    }
  }, [categoriesToShow, activeCategory]);

  const filteredArticles = displayArticles.filter((art) => {
    const matchesCategory = activeCategory === "all" || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-8 md:py-12 animate-fadeIn max-w-6xl mx-auto">
      
      {/* 1. Header */}
      <div className="space-y-4 text-center">
        <Badge variant="default" className="font-bold">PUBLICATIONS</Badge>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-5xl tracking-tight">
          Actualités et Analyses
        </h1>
        <p className="text-sm md:text-base text-xyrm-slate-500 font-light max-w-2xl mx-auto">
          Explorez nos articles d&apos;éducation populaire, comptes-rendus d&apos;ateliers et décryptages juridiques.
        </p>
      </div>

      {/* 2. Controls: Search and Categories */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border-b border-xyrm-slate-200 pb-6">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4.5 w-4.5 text-xyrm-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-xyrm-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-xyrm-slate-800 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
          />
        </div>

        {/* Categories Tab */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categoriesToShow.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value as ArticleCategory)}
              className={`rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === cat.value
                  ? "bg-xyrm-green-deep text-white shadow-sm"
                  : "bg-xyrm-slate-100 hover:bg-xyrm-slate-200 text-xyrm-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* 3. Grid List */}
      {filteredArticles.length > 0 ? (
        <div className={
          filteredArticles.length === 1 
            ? "flex justify-center" 
            : filteredArticles.length === 2 
            ? "flex flex-wrap justify-center gap-6" 
            : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        }>
          {filteredArticles.map((art) => (
            <div key={art.id} className={filteredArticles.length <= 2 ? "w-full max-w-sm" : ""}>
              <Card className="flex flex-col justify-between h-full group hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  {/* Visual placeholder header */}
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
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <FileText className="h-8 w-8 text-xyrm-green-light opacity-45 group-hover:scale-105 transition-transform" />
                    )}
                    <div className="absolute right-3 top-3">
                      <Badge variant={art.category === "initiative" ? "payee" : art.category === "formation" ? "payee" : art.category === "actualite" ? "envoyee" : "default"}>
                        {art.category === "actualite" ? "actualité" : art.category === "formation" ? "vulgarisation" : art.category}
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
                    className="w-full inline-flex h-10 items-center justify-center rounded-lg border border-xyrm-slate-200 text-xs font-bold text-xyrm-slate-700 hover:bg-xyrm-slate-50 transition-colors"
                  >
                    Lire l&apos;Article
                  </Link>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-xyrm-slate-400">
          Aucun article ne correspond à votre recherche.
        </div>
      )}

      {/* 4. Ateliers et Formations Section */}
      <div className="border-t border-xyrm-slate-200 pt-16 mt-20 space-y-12">
        <div className="space-y-4 text-center">
          <Badge variant="payee" className="font-bold">FORMATIONS</Badge>
          <h2 className="text-2xl font-black text-xyrm-slate-900 md:text-4xl tracking-tight">
            Nos Formations et Ateliers Citoyens
          </h2>
          <p className="text-sm md:text-base text-xyrm-slate-500 font-light max-w-2xl mx-auto">
            Découvrez nos programmes d&apos;apprentissage gratuits pour comprendre vos droits, gérer vos initiatives et renforcer la citoyenneté active.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockFormations.map((form) => (
            <Card key={form.id} className="flex flex-col justify-between h-full hover:-translate-y-1 transition-all duration-300 border border-xyrm-slate-200/80 shadow-md">
              <div className="space-y-5">
                {/* Icon & Format */}
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-xyrm-green-deep/5 text-xyrm-green-primary shrink-0">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-xyrm-green-primary bg-xyrm-green-deep/5 px-3 py-1 rounded-full">
                    {form.format}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2.5">
                  <h3 className="text-base font-black text-xyrm-slate-900 leading-snug">
                    {form.title}
                  </h3>
                  <p className="text-xs text-xyrm-slate-500 font-light leading-relaxed">
                    {form.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-xyrm-slate-100 mt-6 space-y-4">
                <div className="flex items-center gap-2 text-[10px] text-xyrm-slate-400 font-bold uppercase tracking-wider">
                  <Clock className="h-3.5 w-3.5 text-xyrm-gold" />
                  <span>{form.duration}</span>
                  <span>•</span>
                  <span>{form.target}</span>
                </div>

                <Link
                  href="/contact"
                  className="w-full inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary text-xs font-bold text-white shadow-sm transition-all group"
                >
                  <span>S&apos;inscrire à l&apos;Atelier</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
