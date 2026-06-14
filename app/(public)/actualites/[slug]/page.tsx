import { mockArticles } from "@/data/mock/articles";
import ArticleDetailClient from "@/components/articles/ArticleDetailClient";

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

  return (
    <ArticleDetailClient 
      initialArticle={article || {
        id: "",
        slug: params.slug,
        title: "Chargement...",
        excerpt: "Chargement de l'article...",
        content: "<p>Chargement du contenu...</p>",
        category: "actualite",
        tags: [],
        authorName: "Chargement...",
        publishedAt: ""
      }} 
      slug={params.slug} 
    />
  );
}
