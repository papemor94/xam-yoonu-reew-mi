import ArticleDetailClient from "@/components/articles/ArticleDetailClient";
import { getArticleBySlugServer, getArticlesServer } from "@/lib/db-server";

interface ArticleDetailPageProps {
  params: {
    slug: string;
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

  return (
    <ArticleDetailClient 
      initialArticle={article} 
      slug={params.slug} 
    />
  );
}
