import ActualitesClient from "@/components/articles/ActualitesClient";
import { getArticlesServer } from "@/lib/db-server";

export default async function ActualitesPage() {
  const articles = await getArticlesServer();

  return (
    <ActualitesClient initialArticles={articles} />
  );
}
