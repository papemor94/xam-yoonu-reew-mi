"use client";

import { Article, mockArticles } from "@/data/mock/articles";
import { DocumentItem, mockDocuments } from "@/data/mock/documents";
import { JourneeItem, mockJournees } from "@/data/mock/journees";

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

// Articles CRUD
export function getArticles(): Article[] {
  if (typeof window === "undefined") return mockArticles;
  initDatabase();
  const data = localStorage.getItem(ARTICLES_KEY);
  return data ? JSON.parse(data) : mockArticles;
}

export function saveArticle(article: Article) {
  if (typeof window === "undefined") return;
  const articles = getArticles();
  const idx = articles.findIndex((a) => a.id === article.id);
  if (idx !== -1) {
    articles[idx] = article;
  } else {
    articles.unshift(article);
  }
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  window.dispatchEvent(new Event("storage"));
}

export function deleteArticle(id: string) {
  if (typeof window === "undefined") return;
  const articles = getArticles().filter((a) => a.id !== id);
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  window.dispatchEvent(new Event("storage"));
}

// Documents CRUD
export function getDocuments(): DocumentItem[] {
  if (typeof window === "undefined") return mockDocuments;
  initDatabase();
  const data = localStorage.getItem(DOCUMENTS_KEY);
  return data ? JSON.parse(data) : mockDocuments;
}

export function saveDocument(doc: DocumentItem) {
  if (typeof window === "undefined") return;
  const docs = getDocuments();
  const idx = docs.findIndex((d) => d.id === doc.id);
  if (idx !== -1) {
    docs[idx] = doc;
  } else {
    docs.unshift(doc);
  }
  localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(docs));
  window.dispatchEvent(new Event("storage"));
}

export function deleteDocument(id: string) {
  if (typeof window === "undefined") return;
  const docs = getDocuments().filter((d) => d.id !== id);
  localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(docs));
  window.dispatchEvent(new Event("storage"));
}

// Journees CRUD
export function getJournees(): JourneeItem[] {
  if (typeof window === "undefined") return mockJournees;
  initDatabase();
  const data = localStorage.getItem(JOURNEES_KEY);
  return data ? JSON.parse(data) : mockJournees;
}

export function saveJournee(journee: JourneeItem) {
  if (typeof window === "undefined") return;
  const journees = getJournees();
  const idx = journees.findIndex((j) => j.id === journee.id);
  if (idx !== -1) {
    journees[idx] = journee;
  } else {
    journees.unshift(journee);
  }
  localStorage.setItem(JOURNEES_KEY, JSON.stringify(journees));
  window.dispatchEvent(new Event("storage"));
}

export function deleteJournee(id: string) {
  if (typeof window === "undefined") return;
  const journees = getJournees().filter((j) => j.id !== id);
  localStorage.setItem(JOURNEES_KEY, JSON.stringify(journees));
  window.dispatchEvent(new Event("storage"));
}

// Contacts CRUD
export function getContacts(): ContactMessage[] {
  if (typeof window === "undefined") return mockContacts;
  initDatabase();
  const data = localStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : mockContacts;
}

export function saveContact(contact: ContactMessage) {
  if (typeof window === "undefined") return;
  const contacts = getContacts();
  const idx = contacts.findIndex((c) => c.id === contact.id);
  if (idx !== -1) {
    contacts[idx] = contact;
  } else {
    contacts.unshift(contact);
  }
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  window.dispatchEvent(new Event("storage"));
}

export function deleteContact(id: string) {
  if (typeof window === "undefined") return;
  const contacts = getContacts().filter((c) => c.id !== id);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  window.dispatchEvent(new Event("storage"));
}
