"use client";

import { useEffect, useState } from "react";
import { getGoogleDriveImageUrl } from "@/lib/utils";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import YouTubeEmbed from "@/components/videos/YouTubeEmbed";
import { getArticles } from "@/lib/db";
import { Article } from "@/data/mock/articles";

interface ArticleDetailClientProps {
  initialArticle: Article;
  slug: string;
}



export default function ArticleDetailClient({ initialArticle, slug }: ArticleDetailClientProps) {
  const [article, setArticle] = useState<Article | null>(initialArticle);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getArticles().then((dbArticles) => {
      const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();
      const current = dbArticles.find((art) => decodeURIComponent(art.slug).toLowerCase().trim() === decodedSlug);
      if (current) {
        setArticle(current);
      } else {
        // If deleted or not found in local db, set to null
        setArticle(null);
      }
    });
  }, [slug]);

  const displayArticle = mounted ? article : initialArticle;

  if (!displayArticle) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-xyrm-slate-800">Article non trouvé</h2>
        <p className="text-xs text-xyrm-slate-500">Cet article a pu être supprimé par un administrateur.</p>
        <Link
          href="/actualites"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-xyrm-green-deep text-xs font-bold text-white px-5"
        >
          Retour aux actualités
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-8 md:py-12 space-y-8 animate-fadeIn text-left">
      
      {/* Back Button */}
      <Link
        href="/actualites"
        className="inline-flex items-center gap-2 text-xs font-bold text-xyrm-slate-500 hover:text-xyrm-green-deep transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux actualités
      </Link>

      {/* Article Header info */}
      <div className="space-y-4">
        <Badge variant={displayArticle.category === "initiative" ? "payee" : displayArticle.category === "actualite" ? "envoyee" : "default"}>
          {displayArticle.category === "actualite" ? "actualité" : displayArticle.category}
        </Badge>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-4.5xl leading-tight tracking-tight">
          {displayArticle.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-xs text-xyrm-slate-500 font-bold border-y border-xyrm-slate-100 py-3">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-xyrm-slate-400" />
            {displayArticle.authorName}
          </span>
          <span className="hidden sm:inline text-xyrm-slate-200">|</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-xyrm-slate-400" />
            {displayArticle.publishedAt}
          </span>
          <span className="hidden sm:inline text-xyrm-slate-200">|</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-xyrm-slate-400" />
            5 min de lecture
          </span>
        </div>
      </div>
      
      {/* YouTube Video or Drive Photo Embed if present */}
      {displayArticle.youtubeId ? (
        <div className="my-6">
          <YouTubeEmbed id={displayArticle.youtubeId} title={displayArticle.title} />
        </div>
      ) : displayArticle.drivePhotoId ? (
        <div className="my-6 w-full aspect-video rounded-2xl overflow-hidden border border-xyrm-slate-200 shadow-sm relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={getGoogleDriveImageUrl(displayArticle.drivePhotoId)} 
            alt={displayArticle.title} 
            className="h-full w-full object-cover" 
          />
        </div>
      ) : null}

      {/* Main Content Body */}
      <Card className="p-8 md:p-10 shadow-sm border border-xyrm-slate-100 bg-white">
        <div 
          className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-xyrm-slate-900 prose-headings:mt-6 prose-p:leading-relaxed prose-p:font-light prose-p:text-xyrm-slate-700 prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6"
          dangerouslySetInnerHTML={{ __html: displayArticle.content }}
        />
      </Card>

      {/* Share / Next steps CTA */}
      <div className="rounded-2xl bg-xyrm-slate-50 border border-xyrm-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-xyrm-slate-900">Cet article vous a intéressé ?</h4>
          <p className="text-xs text-xyrm-slate-500 font-light mt-0.5">Partagez-le autour de vous pour soutenir l&apos;éducation populaire.</p>
        </div>
        <Link
          href="/actualites"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-xyrm-slate-200 bg-white text-xs font-bold text-xyrm-slate-700 px-4 hover:bg-xyrm-slate-50 transition-colors"
        >
          Retour aux actualités
        </Link>
      </div>

    </article>
  );
}
