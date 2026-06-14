"use client";

import { useState } from "react";
import { Download, Search, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { mockDocuments } from "@/data/mock/documents";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

type DocCategory = "all" | "institutionnel" | "reglement" | "rapport" | "communique";

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<DocCategory>("all");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const filteredDocs = mockDocuments.filter((doc) => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (docId: string) => {
    setDownloadingId(docId);
    setDownloadedId(null);
    // Simulate premium download micro-interaction
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedId(docId);
      // Reset success checkmark after 3 seconds
      setTimeout(() => {
        setDownloadedId(null);
      }, 3000);
    }, 1200);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "institutionnel": return "Doc. Institutionnel";
      case "reglement": return "Règlement Intérieur";
      case "rapport": return "Rapport d'Activité";
      case "communique": return "Communiqué";
      default: return cat;
    }
  };

  return (
    <div className="space-y-12 py-8 md:py-12 animate-fadeIn max-w-6xl mx-auto">
      
      {/* 1. Header */}
      <div className="space-y-4 text-center">
        <Badge variant="default" className="font-bold">RESSOURCES</Badge>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-5xl tracking-tight">
          Documents & Publications
        </h1>
        <p className="text-sm md:text-base text-xyrm-slate-500 font-light max-w-2xl mx-auto">
          Accédez en libre téléchargement aux statuts officiels, règlements, communiqués et rapports d&apos;activité de notre association.
        </p>
      </div>

      {/* 2. Search & Category Tabs */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between border-b border-xyrm-slate-200 pb-6">
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4.5 w-4.5 text-xyrm-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Rechercher un document..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-xyrm-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-xyrm-slate-800 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
          />
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {[
            { label: "Tout", value: "all" },
            { label: "Institutionnels", value: "institutionnel" },
            { label: "Règlements", value: "reglement" },
            { label: "Rapports", value: "rapport" },
            { label: "Communiqués", value: "communique" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value as DocCategory)}
              className={`rounded-lg px-4 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === cat.value
                  ? "bg-xyrm-green-deep text-white shadow-sm"
                  : "bg-xyrm-slate-100 hover:bg-xyrm-slate-200 text-xyrm-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Documents Grid List */}
      {filteredDocs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredDocs.map((doc) => {
            const isDownloading = downloadingId === doc.id;
            const isDownloaded = downloadedId === doc.id;
            
            return (
              <Card key={doc.id} className="flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant={
                      doc.category === "institutionnel" ? "default" :
                      doc.category === "reglement" ? "envoyee" :
                      doc.category === "rapport" ? "payee" : "brouillon"
                    }>
                      {getCategoryLabel(doc.category)}
                    </Badge>
                    <span className="text-xxs font-bold text-xyrm-slate-400 font-mono">
                      {doc.fileFormat} • {doc.fileSize}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-black text-xyrm-slate-900 leading-snug">
                    {doc.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
                    {doc.description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-xyrm-slate-100 pt-4 mt-auto">
                    <span className="text-[10px] text-xyrm-slate-400 font-bold uppercase tracking-wider">
                      Publié le {doc.publishedDate}
                    </span>
                    
                    <button
                      onClick={() => handleDownload(doc.id)}
                      disabled={isDownloading}
                      className={`inline-flex h-9 items-center justify-center rounded-xl px-4 text-xs font-bold transition-all gap-1.5 ${
                        isDownloaded 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-xyrm-green-deep text-white hover:bg-xyrm-green-primary shadow-sm hover:shadow"
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <span className="h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
                          <span>Obtention...</span>
                        </>
                      ) : isDownloaded ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Téléchargé</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" />
                          <span>Télécharger</span>
                        </>
                      )}
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-xyrm-slate-400">
          Aucun document ne correspond à vos critères.
        </div>
      )}

      {/* Info Notice card */}
      <div className="rounded-2xl border border-xyrm-gold/20 bg-xyrm-gold/5 p-6 md:p-8 flex flex-col sm:flex-row items-center gap-4 text-xyrm-slate-800">
        <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-xyrm-gold text-xyrm-green-deep">
          <FileText className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-xyrm-green-deep">Transparence & Gouvernance</h4>
          <p className="text-xs text-xyrm-slate-600 font-light leading-relaxed">
            Conformément à nos principes d&apos;Université Populaire, toutes nos chartes d&apos;orientation, bilans d&apos;activité annuelle et résolutions réglementaires sont publics. Si vous avez besoin d&apos;une copie signée certifiée, veuillez contacter le secrétariat.
          </p>
        </div>
        <ArrowRight className="h-5 w-5 text-xyrm-gold hidden md:block shrink-0 ml-auto" />
      </div>

    </div>
  );
}
