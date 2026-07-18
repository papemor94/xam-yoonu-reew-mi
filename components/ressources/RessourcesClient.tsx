"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, User, Calendar, ExternalLink, Download, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DocumentItem } from "@/data/mock/documents";
import { getDocuments } from "@/lib/db";

interface RessourcesClientProps {
  initialDocuments: DocumentItem[];
}

type TabType = "all" | DocumentItem["category"];

export default function RessourcesClient({ initialDocuments }: RessourcesClientProps) {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    getDocuments().then((data) => {
      setDocuments(data);
    });
  }, []);

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.author && doc.author.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchTab = activeTab === "all" || doc.category === activeTab;
      return matchSearch && matchTab;
    });
  }, [documents, searchTerm, activeTab]);

  const categories = [
    { label: "Tout", value: "all" },
    { label: "Ressources Juridiques", value: "juridique" },
    { label: "Politiques Publiques", value: "politique" },
    { label: "Documents Institutionnels", value: "institutionnel" },
    { label: "Règlements", value: "reglement" },
    { label: "Rapports d'Activité", value: "rapport" },
    { label: "Communiqués", value: "communique" },
  ].filter((cat) => {
    if (cat.value === "all") return true;
    return documents.some((d) => d.category === cat.value);
  });

  const getCategoryLabel = (cat: DocumentItem["category"]) => {
    switch (cat) {
      case "juridique":
        return "Ressource Juridique";
      case "politique":
        return "Politique Publique";
      case "institutionnel":
        return "Document Institutionnel";
      case "reglement":
        return "Règlement";
      case "rapport":
        return "Rapport d'Activité";
      case "communique":
        return "Communiqué";
      default:
        return cat;
    }
  };

  const cleanFileUrl = useMemo(() => {
    return selectedDoc?.fileUrl ? selectedDoc.fileUrl.replace(/^\/+/, "") : "";
  }, [selectedDoc]);

  const driveParam = useMemo(() => {
    return selectedDoc?.driveId ? `?driveId=${selectedDoc.driveId}` : "";
  }, [selectedDoc]);

  // Handle escape key to close fullscreen reader
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullScreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="space-y-10 py-8 md:py-12 animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. Header Hero Panel */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-xyrm-green-deep/5 via-xyrm-green-deep/[0.02] to-xyrm-gold/5 border border-xyrm-slate-100 p-8 md:p-10 text-center space-y-4 shadow-sm">
        <div className="absolute -left-16 -top-16 w-36 h-36 bg-xyrm-green-light/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-xyrm-gold/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-1.5 rounded-full bg-xyrm-green-deep/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-xyrm-green-deep border border-xyrm-green-deep/10">
          <span className="h-1.5 w-1.5 rounded-full bg-xyrm-gold animate-pulse" />
          CENTRE DE DOCUMENTATION
        </div>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-4.5xl tracking-tight max-w-3xl mx-auto">
          Publications & Ressources
        </h1>
        <div className="w-12 h-1 bg-gradient-to-r from-xyrm-green-deep to-xyrm-gold mx-auto rounded-full" />
        <p className="text-xs md:text-sm text-xyrm-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          Accédez à nos synthèses juridiques, d&apos;activité et analyses de politiques publiques. Cliquez sur un document pour l&apos;ouvrir directement sur la page.
        </p>
      </div>

      {/* 2. Search and Filtering Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-xyrm-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un document ou auteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-xyrm-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-xyrm-slate-800 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary transition-all"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value as TabType)}
              className={`rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === cat.value
                  ? "bg-xyrm-green-deep text-white shadow-sm"
                  : "bg-xyrm-slate-100 hover:bg-xyrm-slate-200 text-xyrm-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Clean Grid Layout (Instantly Loaded) */}
      {filteredDocs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc) => (
            <Card
              key={doc.id}
              onClick={() => {
                setSelectedDoc(doc);
                setIsFullScreen(true);
              }}
              className="flex flex-col justify-between h-full p-6 border border-xyrm-slate-200 bg-white hover:shadow-lg transition-all duration-350 cursor-pointer rounded-2xl group relative hover:scale-[1.01]"
            >
              <div className="space-y-4">
                {/* Category & Badge */}
                <div className="flex items-center justify-between">
                  <Badge variant={
                    doc.category === "juridique" || doc.category === "politique" ? "payee" : "default"
                  }>
                    {getCategoryLabel(doc.category)}
                  </Badge>
                  <div className="text-[10px] text-xyrm-slate-400 font-mono font-bold uppercase">
                    {doc.fileFormat} • {doc.fileSize}
                  </div>
                </div>

                {/* Content Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xxs text-xyrm-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> {doc.author || "Comité"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {doc.publishedDate}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-xyrm-slate-900 group-hover:text-xyrm-green-primary transition-colors line-clamp-2 leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-xyrm-slate-500 font-light leading-relaxed line-clamp-3">
                    {doc.description}
                  </p>
                </div>
              </div>

              {/* Consultation trigger footer */}
              {doc.fileUrl && (
                <div className="pt-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDoc(doc);
                      setIsFullScreen(true);
                    }}
                    className="w-full inline-flex h-10 items-center justify-center rounded-xl bg-xyrm-slate-50 hover:bg-xyrm-green-deep hover:text-white border border-xyrm-slate-200 text-xs font-bold text-xyrm-slate-700 transition-all gap-1.5"
                  >
                    <span>Consulter le Document</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-xyrm-slate-400 font-light border border-dashed border-xyrm-slate-200 rounded-3xl bg-xyrm-slate-50/50">
          Aucune publication disponible ou ne correspond à vos critères de recherche.
        </div>
      )}

      {/* 4. Full-Screen Reader Modal on Same Page */}
      {isFullScreen && selectedDoc && (
        <div className="fixed inset-0 z-[9999] bg-xyrm-slate-900/95 backdrop-blur-md flex flex-col animate-fadeIn">
          
          {/* Controls Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/10 bg-xyrm-slate-950 text-white shrink-0">
            <div className="flex flex-col min-w-0 pr-4">
              <h2 className="text-sm font-black truncate leading-tight">
                {selectedDoc.title}
              </h2>
              <p className="text-[10px] text-white/50 font-light truncate mt-0.5">
                Publié par {selectedDoc.author || "Comité"} le {selectedDoc.publishedDate}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`/docs/${cleanFileUrl}${driveParam}`}
                download
                className="inline-flex h-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 px-4 text-xs font-bold text-white transition-colors gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Télécharger
              </a>
              <button
                onClick={() => setIsFullScreen(false)}
                className="rounded-lg p-1.5 bg-white/10 hover:bg-red-650 hover:text-white transition-colors"
                title="Fermer le lecteur"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Full Page Native PDF frame viewer */}
          <div className="flex-1 bg-xyrm-slate-800">
            <iframe
              key={selectedDoc.id}
              src={`/docs/${cleanFileUrl}${driveParam}`}
              className="w-full h-full border-0 bg-white"
              title={selectedDoc.title}
            />
          </div>
        </div>
      )}

    </div>
  );
}
