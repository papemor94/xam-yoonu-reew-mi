export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "actualite" | "analyse" | "initiative" | "formation";
  tags: string[];
  coverUrl?: string;
  authorName: string;
  publishedAt: string;
  youtubeId?: string;
  drivePhotoId?: string;
  isFeatured?: boolean;
}

export const mockArticles: Article[] = [];
