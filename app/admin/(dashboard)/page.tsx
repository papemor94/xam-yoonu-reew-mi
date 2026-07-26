"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Plus,
  ArrowRight,
  Mail
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getArticles, getJournees, getContacts } from "@/lib/db";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [counts, setCounts] = useState({
    articles: 0,
    journees: 0,
    contacts: 0,
  });

  const loadCounts = async () => {
    try {
      const [articlesData, journeesData, contactsData] = await Promise.all([
        getArticles(),
        getJournees(),
        getContacts()
      ]);
      setCounts({
        articles: articlesData.length,
        journees: journeesData.length,
        contacts: contactsData.length,
      });
    } catch (e) {
      console.error("Error loading counts:", e);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadCounts();

    // Listen for storage events to update counts dynamically
    const handleStorageChange = () => {
      loadCounts();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Brand Welcome Header */}
      <div className="rounded-3xl bg-gradient-to-r from-xyrm-green-deep to-xyrm-green-primary p-6 md:p-8 text-white shadow-lg border border-xyrm-green-light/20 relative overflow-hidden">
        <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-xyrm-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-4 h-32 w-32 rounded-full bg-xyrm-green-light/25 blur-2xl pointer-events-none" />

        <div className="relative max-w-4xl space-y-4">
          <Badge className="bg-xyrm-gold text-xyrm-green-deep border-xyrm-gold/30 font-bold uppercase tracking-widest text-[10px] px-3 py-1">
            Administration • Xam Yoonu Reew Mi
          </Badge>
          <h2 className="text-2xl font-black md:text-3xl lg:text-4xl tracking-tight leading-tight">
            Système de Gestion du Portail Citoyen
          </h2>
          <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed max-w-2xl">
            Ajoutez, modifiez ou supprimez en toute simplicité les actualités citoyennes, les résumés des journées d&apos;activités et gérez les demandes de contact reçues.
          </p>
        </div>
      </div>

      {/* Grid of Contents Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Actualités */}
        <Card className="hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-xyrm-slate-500">
              Actualités et Vulgarisation
            </CardTitle>
            <div className="rounded-xl bg-xyrm-green-deep/5 p-2.5 text-xyrm-green-primary">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-3xl font-black text-xyrm-slate-900">
                {mounted ? counts.articles : "-"}
              </div>
              <p className="text-xs text-xyrm-slate-400 font-light">
                Articles d&apos;éducation civique, communiqués et initiatives.
              </p>
            </div>

            <div className="pt-4 border-t border-xyrm-slate-100 flex items-center justify-between gap-2">
              <Link
                href="/admin/actualites"
                className="inline-flex items-center gap-1 text-xs font-bold text-xyrm-green-primary hover:text-xyrm-green-deep transition-colors"
              >
                Gérer les articles
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Journées */}
        <Card className="hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-xyrm-slate-500">
              Journées de l&apos;Association
            </CardTitle>
            <div className="rounded-xl bg-xyrm-green-deep/5 p-2.5 text-xyrm-green-primary">
              <Calendar className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-3xl font-black text-xyrm-slate-900">
                {mounted ? counts.journees : "-"}
              </div>
              <p className="text-xs text-xyrm-slate-400 font-light">
                Résumés d&apos;événements, timelines interactives et vidéos.
              </p>
            </div>

            <div className="pt-4 border-t border-xyrm-slate-100 flex items-center justify-between gap-2">
              <Link
                href="/admin/journees"
                className="inline-flex items-center gap-1 text-xs font-bold text-xyrm-green-primary hover:text-xyrm-green-deep transition-colors"
              >
                Gérer les journées
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Contacts */}
        <Card className="hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-xyrm-slate-500">
              Contacts et Adhésions
            </CardTitle>
            <div className="rounded-xl bg-xyrm-green-deep/5 p-2.5 text-xyrm-green-primary">
              <Mail className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-3xl font-black text-xyrm-slate-900">
                {mounted ? counts.contacts : "-"}
              </div>
              <p className="text-xs text-xyrm-slate-400 font-light">
                Demandes de contact, d&apos;inscriptions ou adhésions.
              </p>
            </div>

            <div className="pt-4 border-t border-xyrm-slate-100 flex items-center justify-between gap-2">
              <Link
                href="/admin/contacts"
                className="inline-flex items-center gap-1 text-xs font-bold text-xyrm-green-primary hover:text-xyrm-green-deep transition-colors"
              >
                Gérer les contacts
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Panel */}
      <Card className="p-6 md:p-8">
        <h3 className="text-lg font-black text-xyrm-slate-900 mb-2 tracking-tight">
          Actions de Création Rapide
        </h3>
        <p className="text-xs text-xyrm-slate-500 font-light mb-6">
          Ajoutez instantanément du contenu qui sera directement synchronisé sur les pages publiques correspondantes.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/actualites?action=create"
            className="flex items-center justify-between rounded-2xl border border-xyrm-slate-200 p-4 hover:border-xyrm-green-primary/40 hover:bg-xyrm-green-deep/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-xyrm-green-deep/5 p-2 text-xyrm-green-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-xyrm-slate-900">Nouvelle Actualité</span>
                <span className="text-[10px] text-xyrm-slate-400">Rédiger un article</span>
              </div>
            </div>
            <Plus className="h-5 w-5 text-xyrm-slate-400 group-hover:text-xyrm-green-primary" />
          </Link>

          <Link
            href="/admin/journees?action=create"
            className="flex items-center justify-between rounded-2xl border border-xyrm-slate-200 p-4 hover:border-xyrm-green-primary/40 hover:bg-xyrm-green-deep/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-xyrm-green-deep/5 p-2 text-xyrm-green-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-xyrm-slate-900">Nouvelle Journée</span>
                <span className="text-[10px] text-xyrm-slate-400">Créer un compte-rendu</span>
              </div>
            </div>
            <Plus className="h-5 w-5 text-xyrm-slate-400 group-hover:text-xyrm-green-primary" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
