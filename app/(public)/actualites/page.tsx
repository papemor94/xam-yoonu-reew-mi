"use client";

import { useState, useEffect, useMemo } from "react";
import { getGoogleDriveImageUrl } from "@/lib/utils";
import Link from "next/link";
import { Search, Calendar, User, FileText } from "lucide-react";
import { mockArticles } from "@/data/mock/articles";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

import { getArticles } from "@/lib/db";

type ArticleCategory = "all" | "actualite" | "analyse" | "initiative" | "formation";



export default function ActualitesPage() {
  const [articles, setArticles] = useState(mockArticles);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getArticles().then((data) => setArticles(data));
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

    </div>
  );
}
