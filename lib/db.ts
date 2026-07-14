"use client";

import { Article, mockArticles } from "@/data/mock/articles";
import { DocumentItem, mockDocuments } from "@/data/mock/documents";
import { JourneeItem, mockJournees } from "@/data/mock/journees";
import { supabase } from "./supabaseClient";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  activitySector?: string;
  subject: string;
  message: string;
  status: "Nouveau" | "Traité" | "Archivé";
  createdAt: string;
  isMembershipRequest?: boolean;
}

const ARTICLES_KEY = "xyrm_articles";
const DOCUMENTS_KEY = "xyrm_documents";
const JOURNEES_KEY = "xyrm_journees";
const CONTACTS_KEY = "xyrm_contacts";

export const mockContacts: ContactMessage[] = [
  {
    id: "c-001",
    name: "Moussa Diop",
    email: "moussa.diop@example.com",
    phone: "+221 77 123 45 67",
    activitySector: "Droit / Justice",
    subject: "Rejoindre l'association - Pôle Juridique",
    message: "Bonjour, je suis avocat au barreau de Dakar et je souhaiterais rejoindre le pôle juridique pour aider à la vulgarisation du droit auprès des populations locales.",
    status: "Nouveau",
    createdAt: "14/06/2026",
    isMembershipRequest: true,
  },
  {
    id: "c-002",
    name: "Fatou Sow",
    email: "fatou.sow@example.com",
    phone: "+33 6 12 34 56 78",
    activitySector: "Technologies / Communication",
    subject: "Adhésion de la diaspora toulousaine",
    message: "J'ai participé au Forum de Toulouse et j'ai été très impressionnée par la qualité des échanges. Je veux m'engager en tant que bénévole active pour organiser la prochaine édition.",
    status: "Traité",
    createdAt: "10/06/2026",
    isMembershipRequest: true,
  }
];

const isSupabaseConfigured = (): boolean => {
  return (
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.trim() !== "" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http") &&
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() !== ""
  );
};

export function initDatabase() {
  if (typeof window === "undefined") return;
  
  if (!localStorage.getItem(ARTICLES_KEY)) {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(mockArticles));
  }
  if (!localStorage.getItem(DOCUMENTS_KEY)) {
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(mockDocuments));
  }
  if (!localStorage.getItem(JOURNEES_KEY)) {
    localStorage.setItem(JOURNEES_KEY, JSON.stringify(mockJournees));
  }
  if (!localStorage.getItem(CONTACTS_KEY)) {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(mockContacts));
  }
}

// Helper translations for Supabase snake_case schema

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

const jsToDbArticle = (art: Article) => ({
  id: art.id,
  slug: art.slug,
  title: art.title,
  excerpt: art.excerpt || "",
  content: art.content || "",
  category: art.category,
  tags: art.tags || [],
  author_name: art.authorName || "Comité de Rédaction",
  published_at: art.publishedAt,
  youtube_id: art.youtubeId || null,
  drive_photo_id: art.drivePhotoId || null,
  is_featured: !!art.isFeatured
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

const jsToDbJournee = (jrn: JourneeItem) => ({
  id: jrn.id,
  slug: jrn.slug,
  title: jrn.title,
  subtitle: jrn.subtitle || "Journée Xam Yoonu Reew Mi",
  summary: jrn.summary || "",
  description: jrn.description || "",
  date: jrn.date,
  location: jrn.location,
  location_details: jrn.locationDetails || null,
  youtube_id: jrn.youtubeId || null,
  drive_photo_id: jrn.drivePhotoId || null,
  timeline: jrn.timeline || [],
  gallery_placeholders: jrn.galleryPlaceholders || []
});

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const dbToJsContact = (row: any): ContactMessage => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone || undefined,
  activitySector: row.activity_sector || undefined,
  subject: row.subject,
  message: row.message,
  status: row.status,
  createdAt: row.created_at_str,
  isMembershipRequest: !!row.is_membership_request
});

const jsToDbContact = (c: ContactMessage) => ({
  id: c.id,
  name: c.name,
  email: c.email,
  phone: c.phone || null,
  activity_sector: c.activitySector || null,
  subject: c.subject,
  message: c.message,
  status: c.status,
  created_at_str: c.createdAt,
  is_membership_request: !!c.isMembershipRequest
});

// Articles CRUD
export async function getArticles(): Promise<Article[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (data) {
        return data.map(dbToJsArticle);
      }
    } catch (e) {
      console.error("Supabase getArticles error, falling back to localStorage:", e);
    }
  }

  // Local storage fallback
  if (typeof window === "undefined") return mockArticles;
  initDatabase();
  const data = localStorage.getItem(ARTICLES_KEY);
  if (!data) return mockArticles;

  try {
    const parsed = JSON.parse(data) as Article[];
    let updated = false;

    const sanitized = parsed.map((art) => {
      const generateSlug = (title: string): string => {
        return title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      };

      const correctSlug = generateSlug(art.slug || art.title);
      if (art.slug !== correctSlug) {
        art.slug = correctSlug;
        updated = true;
      }
      return art;
    });

    if (updated) {
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(sanitized));
    }
    return sanitized;
  } catch (e) {
    console.error("Error parsing articles from localStorage:", e);
    return mockArticles;
  }
}

export async function saveArticle(article: Article): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const dbArticle = jsToDbArticle(article);
      const { error } = await supabase.from("articles").upsert(dbArticle);
      if (error) throw error;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("storage"));
      }
      return;
    } catch (e) {
      console.error("Supabase saveArticle error, falling back to localStorage:", e);
    }
  }

  if (typeof window === "undefined") return;
  const articles = await getArticles();
  const idx = articles.findIndex((a) => a.id === article.id);
  if (idx !== -1) {
    articles[idx] = article;
  } else {
    articles.unshift(article);
  }
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  window.dispatchEvent(new Event("storage"));
}

export async function deleteArticle(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("storage"));
      }
      return;
    } catch (e) {
      console.error("Supabase deleteArticle error, falling back to localStorage:", e);
    }
  }

  if (typeof window === "undefined") return;
  const articles = (await getArticles()).filter((a) => a.id !== id);
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  window.dispatchEvent(new Event("storage"));
}

// Documents CRUD (mock only, as not used dynamically in admin or pages)
export async function getDocuments(): Promise<DocumentItem[]> {
  if (typeof window === "undefined") return mockDocuments;
  initDatabase();
  const data = localStorage.getItem(DOCUMENTS_KEY);
  return data ? JSON.parse(data) : mockDocuments;
}

export async function saveDocument(doc: DocumentItem): Promise<void> {
  if (typeof window === "undefined") return;
  const docs = await getDocuments();
  const idx = docs.findIndex((d) => d.id === doc.id);
  if (idx !== -1) {
    docs[idx] = doc;
  } else {
    docs.unshift(doc);
  }
  localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(docs));
  window.dispatchEvent(new Event("storage"));
}

export async function deleteDocument(id: string): Promise<void> {
  if (typeof window === "undefined") return;
  const docs = (await getDocuments()).filter((d) => d.id !== id);
  localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(docs));
  window.dispatchEvent(new Event("storage"));
}

// Journees CRUD
export async function getJournees(): Promise<JourneeItem[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("journees").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (data) {
        return data.map(dbToJsJournee);
      }
    } catch (e) {
      console.error("Supabase getJournees error, falling back to localStorage:", e);
    }
  }

  if (typeof window === "undefined") return mockJournees;
  initDatabase();
  const data = localStorage.getItem(JOURNEES_KEY);
  return data ? JSON.parse(data) : mockJournees;
}

export async function saveJournee(journee: JourneeItem): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const dbJrn = jsToDbJournee(journee);
      const { error } = await supabase.from("journees").upsert(dbJrn);
      if (error) throw error;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("storage"));
      }
      return;
    } catch (e) {
      console.error("Supabase saveJournee error, falling back to localStorage:", e);
    }
  }

  if (typeof window === "undefined") return;
  const journees = await getJournees();
  const idx = journees.findIndex((j) => j.id === journee.id);
  if (idx !== -1) {
    journees[idx] = journee;
  } else {
    journees.unshift(journee);
  }
  localStorage.setItem(JOURNEES_KEY, JSON.stringify(journees));
  window.dispatchEvent(new Event("storage"));
}

export async function deleteJournee(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("journees").delete().eq("id", id);
      if (error) throw error;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("storage"));
      }
      return;
    } catch (e) {
      console.error("Supabase deleteJournee error, falling back to localStorage:", e);
    }
  }

  if (typeof window === "undefined") return;
  const journees = (await getJournees()).filter((j) => j.id !== id);
  localStorage.setItem(JOURNEES_KEY, JSON.stringify(journees));
  window.dispatchEvent(new Event("storage"));
}

// Contacts CRUD
export async function getContacts(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (data) {
        return data.map(dbToJsContact);
      }
    } catch (e) {
      console.error("Supabase getContacts error, falling back to localStorage:", e);
    }
  }

  if (typeof window === "undefined") return mockContacts;
  initDatabase();
  const data = localStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : mockContacts;
}

export async function saveContact(contact: ContactMessage): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const dbContact = jsToDbContact(contact);
      const { error } = await supabase.from("contacts").upsert(dbContact);
      if (error) throw error;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("storage"));
      }
      return;
    } catch (e) {
      console.error("Supabase saveContact error, falling back to localStorage:", e);
    }
  }

  if (typeof window === "undefined") return;
  const contacts = await getContacts();
  const idx = contacts.findIndex((c) => c.id === contact.id);
  if (idx !== -1) {
    contacts[idx] = contact;
  } else {
    contacts.unshift(contact);
  }
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  window.dispatchEvent(new Event("storage"));
}

export async function deleteContact(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) throw error;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("storage"));
      }
      return;
    } catch (e) {
      console.error("Supabase deleteContact error, falling back to localStorage:", e);
    }
  }

  if (typeof window === "undefined") return;
  const contacts = (await getContacts()).filter((c) => c.id !== id);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  window.dispatchEvent(new Event("storage"));
}
