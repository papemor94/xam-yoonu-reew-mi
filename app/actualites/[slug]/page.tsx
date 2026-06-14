import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { mockArticles } from "@/data/mock/articles";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import YouTubeEmbed from "@/components/videos/YouTubeEmbed";

interface ArticleDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return mockArticles.map((art) => ({
    slug: art.slug,
  }));
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const article = mockArticles.find((art) => art.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8 md:py-12 space-y-8 animate-fadeIn">
      
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
        <Badge variant={article.category === "initiative" ? "payee" : article.category === "actualite" ? "envoyee" : "default"}>
          {article.category}
        </Badge>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-4.5xl leading-tight tracking-tight">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-xs text-xyrm-slate-500 font-bold border-y border-xyrm-slate-100 py-3">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-xyrm-slate-400" />
            {article.authorName}
          </span>
          <span className="hidden sm:inline text-xyrm-slate-200">|</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-xyrm-slate-400" />
            {article.publishedAt}
          </span>
          <span className="hidden sm:inline text-xyrm-slate-200">|</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-xyrm-slate-400" />
            5 min de lecture
          </span>
        </div>
      </div>
      
      {/* YouTube Video Embed if present */}
      {article.youtubeId && (
        <div className="my-6">
          <YouTubeEmbed id={article.youtubeId} title={article.title} />
        </div>
      )}

      {/* Main Content Body */}
      <Card className="p-8 md:p-10 shadow-sm border border-xyrm-slate-100 bg-white">
        <div 
          className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-xyrm-slate-900 prose-headings:mt-6 prose-p:leading-relaxed prose-p:font-light prose-p:text-xyrm-slate-700 prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 space-y-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </Card>

      {/* Share / Next steps CTA */}
      <div className="rounded-2xl bg-xyrm-slate-50 border border-xyrm-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-xyrm-slate-900">Cet article vous a intéressé ?</h4>
          <p className="text-xs text-xyrm-slate-500 font-light mt-0.5">Partagez-le autour de vous pour soutenir l&apos;éducation populaire.</p>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-9 items-center justify-center rounded-lg bg-xyrm-green-deep text-xs font-bold text-white px-4 hover:bg-xyrm-green-primary transition-colors"
        >
          Rejoindre l&apos;association
        </Link>
      </div>

    </article>
  );
}
