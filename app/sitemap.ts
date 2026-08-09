export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { getArticlesServer, getJourneesServer } from "@/lib/db-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://xam-yoonu-reew-mi.org";

  // Pages statiques
  const staticPages = ["", "/association", "/gouvernance", "/actualites", "/journees", "/contact", "/ressources"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  // Pages dynamiques - Actualités
  let articleUrls: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticlesServer();
    articleUrls = articles.map((art) => ({
      url: `${baseUrl}/actualites/${art.slug}`,
      lastModified: new Date(art.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Error generating sitemap articles:", e);
  }

  // Pages dynamiques - Journées
  let jrnUrls: MetadataRoute.Sitemap = [];
  try {
    const journees = await getJourneesServer();
    jrnUrls = journees.map((jrn) => ({
      url: `${baseUrl}/journees/${jrn.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Error generating sitemap journees:", e);
  }

  return [...staticPages, ...articleUrls, ...jrnUrls];
}
