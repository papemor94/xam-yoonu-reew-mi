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
  const decodedSlug = decodeURIComponent(params.slug).toLowerCase().trim();
  const article = mockArticles.find((art) => decodeURIComponent(art.slug).toLowerCase().trim() === decodedSlug);

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
