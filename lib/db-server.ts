import { supabase } from "./supabaseClient";
import { Article } from "@/data/mock/articles";
import { JourneeItem } from "@/data/mock/journees";

const isSupabaseConfigured = (): boolean => {
  return (
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.trim() !== "" &&
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() !== ""
  );
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const dbToJsArticle = (row: any): Article => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  content: row.content,
  category: row.category,
  tags: row.tags || [],
  authorName: row.author_name || "Comité de Rédaction",
  publishedAt: row.published_at,
  youtubeId: row.youtube_id || undefined,
  drivePhotoId: row.drive_photo_id || undefined,
  isFeatured: !!row.is_featured
});

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const dbToJsJournee = (row: any): JourneeItem => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  subtitle: row.subtitle,
  summary: row.summary,
  description: row.description,
  date: row.date,
  location: row.location,
  locationDetails: row.location_details || undefined,
  youtubeId: row.youtube_id || undefined,
  drivePhotoId: row.drive_photo_id || undefined,
  timeline: row.timeline || [],
  galleryPlaceholders: row.gallery_placeholders || []
});

export async function getArticlesServer(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ? data.map(dbToJsArticle) : [];
  } catch (e) {
    console.error("Error in getArticlesServer:", e);
    return [];
  }
}

export async function getJourneesServer(): Promise<JourneeItem[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }
  try {
    const { data, error } = await supabase
      .from("journees")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ? data.map(dbToJsJournee) : [];
  } catch (e) {
    console.error("Error in getJourneesServer:", e);
    return [];
  }
}

export async function getJourneeBySlugServer(slug: string): Promise<JourneeItem | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }
  try {
    const { data, error } = await supabase
      .from("journees")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data ? dbToJsJournee(data) : null;
  } catch (e) {
    console.error(`Error in getJourneeBySlugServer for slug ${slug}:`, e);
    return null;
  }
}

export async function getArticleBySlugServer(slug: string): Promise<Article | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }
  try {
    const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", decodedSlug)
      .maybeSingle();
    if (error) throw error;
    return data ? dbToJsArticle(data) : null;
  } catch (e) {
    console.error(`Error in getArticleBySlugServer for slug ${slug}:`, e);
    return null;
  }
}
