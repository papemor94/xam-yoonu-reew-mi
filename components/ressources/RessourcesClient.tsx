"use client";

import { useState, useMemo } from "react";
import { Search, User, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DocumentItem } from "@/data/mock/documents";

interface RessourcesClientProps {
  initialDocuments: DocumentItem[];
}

type TabType = "all" | DocumentItem["category"];

export default function RessourcesClient({ initialDocuments }: RessourcesClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const filteredDocs = useMemo(() => {
    return initialDocuments.filter((doc) => {
      const matchSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.author && doc.author.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchTab = activeTab === "all" || doc.category === activeTab;
      return matchSearch && matchTab;
    });
  }, [initialDocuments, searchTerm, activeTab]);

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
    return initialDocuments.some((d) => d.category === cat.value);
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

  return (
    <div className="space-y-12 py-8 md:py-12 animate-fadeIn max-w-6xl mx-auto">
      
      {/* 1. Header Hero Panel */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-xyrm-green-deep/5 via-xyrm-green-deep/[0.02] to-xyrm-gold/5 border border-xyrm-slate-100 p-8 md:p-12 text-center space-y-4 shadow-sm">
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
          Accédez librement à nos analyses de politiques publiques, nos guides juridiques vulgarisés et les documents institutionnels pour cultiver notre citoyenneté active.
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

      {/* 3. Publications Grid */}
      {filteredDocs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc) => (
            <Card
              key={doc.id}
              className="flex flex-col justify-between h-full p-6 border border-xyrm-slate-200 bg-white hover:shadow-lg transition-all duration-300 group"
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

                {/* Info Text */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xxs text-xyrm-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {doc.author || "Comité"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {doc.publishedDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-xyrm-slate-900 group-hover:text-xyrm-green-primary transition-colors line-clamp-2 leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-xyrm-slate-500 font-light leading-relaxed line-clamp-3">
                    {doc.description}
                  </p>
                </div>
              </div>

              {/* Download / View Button */}
              {doc.fileUrl && (
                <div className="pt-6">
                  <a
                    href={`/docs/${doc.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex h-10 items-center justify-center rounded-xl bg-xyrm-slate-50 hover:bg-xyrm-green-deep hover:text-white border border-xyrm-slate-200 text-xs font-bold text-xyrm-slate-700 transition-all gap-1.5"
                  >
                    <span>Consulter le Document</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
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
    </div>
  );
}
