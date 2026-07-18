"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Save,
  Download,
  Info
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getDocuments, saveDocument, deleteDocument } from "@/lib/db";
import { DocumentItem } from "@/data/mock/documents";

function DocumentsAdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | DocumentItem["category"]>("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<Partial<DocumentItem>>({});

  // Delete confirm state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    loadDocuments();

    if (searchParams.get("action") === "create") {
      handleOpenCreate();
      router.replace("/admin/documents");
    }
  }, [searchParams, router]);

  const loadDocuments = () => {
    getDocuments().then((data) => setDocuments(data));
  };

  const handleOpenCreate = () => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

    setCurrentDoc({
      id: "doc-" + Math.random().toString(36).substring(2, 9),
      title: "",
      description: "",
      category: "juridique",
      fileSize: "1.0 Mo",
      fileFormat: "PDF",
      publishedDate: formattedDate,
      fileUrl: "",
      author: "Comité de Rédaction",
      driveId: ""
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (doc: DocumentItem) => {
    setCurrentDoc({ ...doc });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDoc.title?.trim() || !currentDoc.description?.trim()) return;

    // Clean up filename: convert spaces or uppercase in fileUrl to clean names
    let fileUrl = currentDoc.fileUrl?.trim() || "";
    if (fileUrl) {
      fileUrl = fileUrl.replace(/^\/+/, "").replace(/^docs\/+/, "").replace(/^\/+/, "");
      
      // Reject if file does not end with .pdf but has a different extension
      const lowerUrl = fileUrl.toLowerCase();
      if (lowerUrl.includes(".") && !lowerUrl.endsWith(".pdf")) {
        alert("Erreur : Le fichier doit obligatoirement être au format PDF (.pdf).");
        return;
      }
      
      if (!fileUrl.endsWith(".pdf")) {
        fileUrl = fileUrl + ".pdf";
      }
    } else {
      // Auto-generate a clean file url if left blank
      const cleanSlug = currentDoc.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      fileUrl = `${cleanSlug}.pdf`;
    }

    const docToSave: DocumentItem = {
      id: currentDoc.id || "doc-" + Math.random().toString(36).substring(2, 9),
      title: currentDoc.title.trim(),
      description: currentDoc.description.trim(),
      category: currentDoc.category || "juridique",
      fileSize: currentDoc.fileSize?.trim() || "1.0 Mo",
      fileFormat: "PDF",
      publishedDate: currentDoc.publishedDate || "",
      fileUrl: fileUrl,
      author: currentDoc.author?.trim() || "Comité de Rédaction",
      driveId: currentDoc.driveId?.trim() || undefined,
    };

    await saveDocument(docToSave);
    setIsModalOpen(false);
    loadDocuments();
  };

  const handleDelete = async (id: string) => {
    await deleteDocument(id);
    setDeleteConfirmId(null);
    loadDocuments();
  };

  const filteredDocs = documents.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.author && doc.author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchTab = activeTab === "all" || doc.category === activeTab;

    return matchSearch && matchTab;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-xyrm-slate-900 tracking-tight">
            Publications & Ressources
          </h1>
          <p className="text-sm text-xyrm-slate-500 font-light mt-0.5">
            Gérez les documents juridiques, synthèses de politiques publiques et communiqués de l&apos;association.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary px-5 text-sm font-bold text-white shadow-md transition-all hover:scale-102 gap-2"
        >
          <Plus className="h-4 w-4" />
          Ajouter une ressource
        </button>
      </div>

      {/* Info Notice about Google Drive Sharing */}
      <div className="rounded-2xl border border-xyrm-gold/20 bg-xyrm-gold/5 p-4 text-xs text-xyrm-slate-700 flex gap-3 items-start leading-relaxed">
        <Info className="h-5 w-5 text-xyrm-gold shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-xyrm-slate-900 block mb-0.5">Note importante sur les PDFs Google Drive :</span>
          Pour que les fichiers PDF soient lisibles directement sur le site, assurez-vous de partager le document Google Drive en mode <strong>« Tous les utilisateurs disposant du lien peuvent lire »</strong> dans les paramètres de partage de Google Drive. Entrez ensuite l&apos;identifiant de fichier (composé de lettres et chiffres) dans le champ correspondant.
        </div>
      </div>

      {/* Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {(
            [
              { label: "Tout", value: "all" },
              { label: "Juridiques", value: "juridique" },
              { label: "Politiques Publiques", value: "politique" },
              { label: "Institutionnels", value: "institutionnel" },
            ] as Array<{ label: string; value: "all" | DocumentItem["category"] }>
          ).map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                activeTab === tab.value
                  ? "bg-xyrm-green-deep text-white shadow-sm"
                  : "bg-white border border-xyrm-slate-200 text-xyrm-slate-650 hover:bg-xyrm-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:max-w-xs shrink-0">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-xyrm-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une publication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-xyrm-slate-200 bg-white py-2 pl-9 pr-4 text-xs text-xyrm-slate-800 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
          />
        </div>
      </div>

      {/* Documents List */}
      <Card className="p-0 overflow-hidden border border-xyrm-slate-200/80">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-xyrm-slate-200 bg-xyrm-slate-50 text-[10px] uppercase font-bold tracking-wider text-xyrm-slate-500">
                <th className="px-6 py-4">Document / Titre</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Auteur & Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-xyrm-slate-100 text-sm">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-xyrm-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-xyrm-gold/10 p-2 text-xyrm-gold shrink-0 flex items-center justify-center">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col max-w-md">
                          <span className="font-bold text-xyrm-slate-900 group-hover:text-xyrm-green-primary transition-colors leading-snug">
                            {doc.title}
                          </span>
                          <span className="text-xxs text-xyrm-slate-400 mt-0.5 line-clamp-1 font-light leading-relaxed">
                            {doc.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        doc.category === "juridique" || doc.category === "politique" ? "payee" : "default"
                      }>
                        {doc.category === "juridique" ? "Juridique" : doc.category === "politique" ? "Politique" : doc.category}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-xs">
                      <div className="flex flex-col text-xyrm-slate-650 font-medium">
                        <span>{doc.author || "Comité"}</span>
                        <span className="text-xxs text-xyrm-slate-400 font-mono mt-0.5">{doc.publishedDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {deleteConfirmId === doc.id ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="text-[10px] font-bold text-red-600 mr-1 animate-pulse">Supprimer ?</span>
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="rounded bg-red-600 px-2.5 py-1 text-xxs font-black text-white hover:bg-red-700"
                          >
                            Oui
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="rounded bg-xyrm-slate-200 px-2.5 py-1 text-xxs font-bold text-xyrm-slate-700 hover:bg-xyrm-slate-300"
                          >
                            Non
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2.5 opacity-80 group-hover:opacity-100 transition-opacity">
                          {doc.fileUrl && (
                            <a
                              href={`/docs/${doc.fileUrl}`}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg p-1.5 text-xyrm-slate-400 hover:text-xyrm-slate-650 hover:bg-xyrm-slate-100 transition-all"
                              title="Visualiser le fichier"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          )}
                          <button
                            onClick={() => handleOpenEdit(doc)}
                            className="rounded-lg p-1.5 text-xyrm-slate-400 hover:text-xyrm-green-primary hover:bg-xyrm-green-deep/5 transition-all"
                            title="Modifier"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(doc.id)}
                            className="rounded-lg p-1.5 text-xyrm-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-xyrm-slate-400 font-light">
                    Aucune ressource disponible. Ajoutez-en une pour commencer.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Creation / Edition Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-xyrm-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6 relative flex flex-col justify-between">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 p-1 rounded-lg text-xyrm-slate-400 hover:text-xyrm-slate-600 hover:bg-xyrm-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-xyrm-slate-900 tracking-tight">
                {currentDoc.id && documents.some(d => d.id === currentDoc.id) ? "Modifier la ressource" : "Ajouter une nouvelle ressource"}
              </h3>
              <p className="text-xs text-xyrm-slate-500 font-light">
                Tous les champs sont requis pour structurer l&apos;information.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700">Titre de la publication</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : Constitution de la République du Sénégal"
                    value={currentDoc.title || ""}
                    onChange={(e) => setCurrentDoc({ ...currentDoc, title: e.target.value })}
                    className="w-full rounded-xl border border-xyrm-slate-200 px-4 py-2.5 text-xs focus:border-xyrm-green-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700">Catégorie</label>
                  <select
                    value={currentDoc.category || "juridique"}
                    onChange={(e) => setCurrentDoc({ ...currentDoc, category: e.target.value as DocumentItem["category"] })}
                    className="w-full rounded-xl border border-xyrm-slate-200 px-4 py-2.5 text-xs focus:border-xyrm-green-primary focus:outline-none bg-white"
                  >
                    <option value="juridique">Ressource Juridique</option>
                    <option value="politique">Politique Publique</option>
                    <option value="institutionnel">Document Institutionnel</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-xyrm-slate-700">Description / Résumé court</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ex : Explication didactique des droits fondamentaux garantis par le texte de la constitution..."
                  value={currentDoc.description || ""}
                  onChange={(e) => setCurrentDoc({ ...currentDoc, description: e.target.value })}
                  className="w-full rounded-xl border border-xyrm-slate-200 px-4 py-2.5 text-xs focus:border-xyrm-green-primary focus:outline-none resize-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700">Auteur</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : Commission Droit"
                    value={currentDoc.author || ""}
                    onChange={(e) => setCurrentDoc({ ...currentDoc, author: e.target.value })}
                    className="w-full rounded-xl border border-xyrm-slate-200 px-4 py-2.5 text-xs focus:border-xyrm-green-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700">Date de publication</label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/YYYY"
                    value={currentDoc.publishedDate || ""}
                    onChange={(e) => setCurrentDoc({ ...currentDoc, publishedDate: e.target.value })}
                    className="w-full rounded-xl border border-xyrm-slate-200 px-4 py-2.5 text-xs focus:border-xyrm-green-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-xyrm-slate-700 flex items-center gap-1">
                  ID du fichier Google Drive *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : 1Es0cPxcjdEjmapXv4ls..."
                  value={currentDoc.driveId || ""}
                  onChange={(e) => setCurrentDoc({ ...currentDoc, driveId: e.target.value })}
                  className="w-full rounded-xl border border-xyrm-slate-200 px-4 py-2.5 text-xs focus:border-xyrm-green-primary focus:outline-none"
                />
                <p className="text-[10px] text-xyrm-slate-500 font-medium">
                  Le document sera lu dynamiquement depuis Google Drive. Assurez-vous que le lien de partage est en mode public (« Tous les utilisateurs disposant du lien peuvent lire »).
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-xyrm-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-xyrm-slate-200 px-5 py-2.5 text-xs font-bold text-xyrm-slate-650 hover:bg-xyrm-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary px-6 text-xs font-bold text-white shadow-md transition-all gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DocumentsAdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xyrm-slate-500">Chargement...</div>}>
      <DocumentsAdminContent />
    </Suspense>
  );
}
