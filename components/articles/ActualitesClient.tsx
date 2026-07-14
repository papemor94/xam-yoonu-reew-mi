"use client";

import { useState, useEffect, useMemo } from "react";
import { getGoogleDriveImageUrl } from "@/lib/utils";
import Link from "next/link";
import { Search, Calendar, User, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getArticles } from "@/lib/db";
import { Article } from "@/data/mock/articles";

type ArticleCategory = "all" | "actualite" | "analyse" | "initiative" | "formation";

interface ActualitesClientProps {
  initialArticles: Article[];
}

export default function ActualitesClient({ initialArticles }: ActualitesClientProps) {
  const [articles, setArticles] = useState(initialArticles);

  useEffect(() => {
    // Client-side synchronization to keep it dynamic in case of real-time database updates
    getArticles().then((data) => setArticles(data));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<ArticleCategory>("all");

  const categoriesToShow = useMemo(() => {
    return [
      { label: "Tout", value: "all" },
      { label: "Actualités", value: "actualite" },
      { label: "Analyses", value: "analyse" },
      { label: "Initiatives", value: "initiative" },
      { label: "Vulgarisation", value: "formation" },
    ].filter((cat) => {
      if (cat.value === "all") return true;
      return articles.some((art) => art.category === cat.value);
    });
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchSearch =
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (art.excerpt && art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCat = activeCategory === "all" || art.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [articles, searchTerm, activeCategory]);

  return (
    <div className="space-y-12 py-8 md:py-12 animate-fadeIn max-w-6xl mx-auto">
      
      {/* 1. Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-xyrm-green-deep/5 via-xyrm-green-deep/[0.02] to-xyrm-gold/5 border border-xyrm-slate-100 p-8 md:p-12 text-center space-y-4 shadow-sm">
        <div className="absolute -left-16 -top-16 w-36 h-36 bg-xyrm-green-light/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-xyrm-gold/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-1.5 rounded-full bg-xyrm-green-deep/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-xyrm-green-deep border border-xyrm-green-deep/10">
          <span className="h-1.5 w-1.5 rounded-full bg-xyrm-gold animate-pulse" />
          PUBLICATIONS
        </div>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-4.5xl tracking-tight max-w-3xl mx-auto">
          Actualités & Vulgarisation
        </h1>
        <div className="w-12 h-1 bg-gradient-to-r from-xyrm-green-deep to-xyrm-gold mx-auto rounded-full" />
        <p className="text-xs md:text-sm text-xyrm-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          Accédez à nos analyses juridiques, comptes-rendus d&apos;ateliers et communiqués officiels pour mieux décrypter nos institutions.
        </p>
      </div>

      {/* 2. Controls and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-xyrm-slate-400" />
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
              className={`rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap transition-colors ${activeCategory === cat.value
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

    </div>
  );
}
