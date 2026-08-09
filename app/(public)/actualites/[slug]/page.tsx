export const dynamic = "force-dynamic";

import { Metadata } from "next";
import ArticleDetailClient from "@/components/articles/ArticleDetailClient";
import { getArticleBySlugServer, getArticlesServer } from "@/lib/db-server";
import { getGoogleDriveImageUrl } from "@/lib/utils";

interface ArticleDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const article = await getArticleBySlugServer(params.slug);
  if (!article) return {};
  
  const imageUrl = article.drivePhotoId 
    ? getGoogleDriveImageUrl(article.drivePhotoId)
    : "https://xam-yoonu-reew-mi.org/logo.png";

  return {
    title: `${article.title} — Xam Yoonu Réew Mi`,
    description: article.excerpt || "Découvrez notre nouvel article sur Xam Yoonu Réew Mi.",
    openGraph: {
      title: article.title,
      description: article.excerpt || "Découvrez notre nouvel article sur Xam Yoonu Réew Mi.",
      type: "article",
      url: `https://xam-yoonu-reew-mi.org/actualites/${article.slug}`,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || "Découvrez notre nouvel article sur Xam Yoonu Réew Mi.",
      images: [imageUrl],
    }
  };
}

export async function generateStaticParams() {
  const articles = await getArticlesServer();
  return articles.map((art) => ({
    slug: art.slug,
  }));
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const article = await getArticleBySlugServer(params.slug);

  const jsonLd = article ? {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.excerpt || "",
    "datePublished": article.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Comité de Rédaction Xam Yoonu Réew Mi"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Xam Yoonu Réew Mi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://xam-yoonu-reew-mi.org/logo.png"
      }
    }
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ArticleDetailClient 
        initialArticle={article} 
        slug={params.slug} 
      />
    </>
  );
}
