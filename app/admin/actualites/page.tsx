"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  Video
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getArticles, saveArticle, deleteArticle } from "@/lib/db";
import { Article } from "@/data/mock/articles";

function ActualitesAdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | Article["category"]>("all");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({});
  const [tagsInput, setTagsInput] = useState("");
  
  // Delete confirm state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();

    if (searchParams.get("action") === "create") {
      handleOpenCreate();
      router.replace("/admin/actualites");
    }
  }, [searchParams, router]);

  const loadArticles = () => {
    getArticles().then((data) => setArticles(data));
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents
      .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric characters with -
      .replace(/(^-|-$)+/g, ""); // remove leading/trailing dashes
  };

  const handleOpenCreate = () => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    
    setCurrentArticle({
      id: "",
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      category: "actualite",
      tags: [],
      authorName: "Comité de Rédaction",
      publishedAt: formattedDate,
      youtubeId: "",
      drivePhotoId: ""
    });
    setTagsInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art: Article) => {
    setCurrentArticle({ ...art });
    setTagsInput(art.tags ? art.tags.join(", ") : "");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentArticle.title?.trim()) return;

    const rawSlug = currentArticle.slug?.trim() || currentArticle.title;
    const slug = generateSlug(rawSlug);
    
    // Parse tags from the input tags
    const tags = tagsInput
      ? tagsInput.split(",").map((t: string) => t.trim()).filter(Boolean)
      : currentArticle.tags || [];

    const articleToSave: Article = {
      id: currentArticle.id || `art-${Date.now()}`,
      slug: slug,
      title: currentArticle.title,
      excerpt: currentArticle.excerpt || "",
      content: currentArticle.content || "",
      category: currentArticle.category || "actualite",
      tags: tags,
      authorName: currentArticle.authorName || "Comité de Rédaction",
      publishedAt: currentArticle.publishedAt || "14/06/2026",
      youtubeId: currentArticle.youtubeId || undefined,
      drivePhotoId: currentArticle.drivePhotoId || undefined
    };

    await saveArticle(articleToSave);
    setIsModalOpen(false);
    loadArticles();
  };

  const handleDelete = async (id: string) => {
    await deleteArticle(id);
    setDeleteConfirmId(null);
    loadArticles();
  };

  const filteredArticles = articles.filter((art) => {
    const matchesTab = activeTab === "all" || art.category === activeTab;
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-xyrm-slate-900 tracking-tight">
            Gestion des Actualités et Analyses
          </h1>
          <p className="text-xs text-xyrm-slate-500 font-light">
            Publiez des articles d&apos;éducation populaire, faites des analyses constitutionnelles ou relatez les initiatives de l&apos;UPCS.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary px-4 text-xs font-bold text-white shadow-md transition-colors"
        >
          <Plus className="h-4.5 w-4.5" />
          Rédiger un Article
        </button>
      </div>

      {/* Controls Bar */}
      <Card className="p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4.5 w-4.5 text-xyrm-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-xyrm-slate-200 bg-white py-1.5 pl-9 pr-4 text-xs text-xyrm-slate-800 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { label: "Tout", value: "all" },
            { label: "Actualités", value: "actualite" },
            { label: "Analyses", value: "analyse" },
            { label: "Initiatives", value: "initiative" },
            { label: "Vulgarisation", value: "formation" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as Article["category"] | "all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors whitespace-nowrap ${
                activeTab === tab.value
                  ? "bg-xyrm-green-deep text-white shadow-sm"
                  : "bg-xyrm-slate-100 hover:bg-xyrm-slate-200 text-xyrm-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Articles Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="border-b border-xyrm-slate-100 bg-xyrm-slate-50/70 text-xs font-bold uppercase tracking-wider text-xyrm-slate-500">
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Auteur</th>
                <th className="px-6 py-4">Date de Publication</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-xyrm-slate-100 text-sm">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-xyrm-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-xyrm-green-deep/5 p-2 text-xyrm-green-primary shrink-0 flex items-center justify-center">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-xyrm-slate-900 group-hover:text-xyrm-green-primary transition-colors leading-snug">
                            {art.title}
                          </span>
                          <span className="text-xxs text-xyrm-slate-400 font-mono mt-0.5 flex flex-wrap items-center gap-1.5">
                            /{art.slug}
                            {art.youtubeId ? (
                              <Badge variant="default" className="inline-flex items-center gap-0.5 text-[9px] bg-red-600 text-white border-red-600 px-1.5 py-0.2"><Video className="h-2.5 w-2.5" /> Vidéo</Badge>
                            ) : art.drivePhotoId ? (
                              <Badge variant="default" className="inline-flex items-center gap-0.5 text-[9px] bg-blue-600 text-white border-blue-600 px-1.5 py-0.2">
                                <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                </svg> Photo
                              </Badge>
                            ) : null}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={art.category === "initiative" ? "payee" : art.category === "formation" ? "payee" : art.category === "actualite" ? "envoyee" : "default"} className="capitalize text-xxs">
                        {art.category === "actualite" ? "actualité" : art.category === "formation" ? "vulgarisation" : art.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-xyrm-slate-600">
                      {art.authorName}
                    </td>
                    <td className="px-6 py-4 text-xs text-xyrm-slate-500">
                      {art.publishedAt}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(art)}
                          className="rounded-lg p-1.5 text-xyrm-slate-500 hover:text-xyrm-green-primary hover:bg-xyrm-slate-100 transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        
                        {deleteConfirmId === art.id ? (
                          <div className="flex items-center gap-1.5 animate-fadeIn">
                            <button
                              onClick={() => handleDelete(art.id)}
                              className="rounded-lg bg-red-600 px-2 py-1 text-xxs font-bold text-white hover:bg-red-700"
                            >
                              Confirmer
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="rounded-lg border border-xyrm-slate-200 px-2 py-1 text-xxs font-bold text-xyrm-slate-600 hover:bg-xyrm-slate-50"
                            >
                              Annuler
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(art.id)}
                            className="rounded-lg p-1.5 text-xyrm-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-xyrm-slate-400 font-light">
                    Aucun article trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Creation/Edition Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <Card className="w-full max-w-2xl my-8 shadow-2xl border border-xyrm-slate-100 bg-white overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-xyrm-slate-100 px-6 py-4 bg-xyrm-slate-50/50">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-xyrm-green-primary" />
                <h3 className="text-sm font-black text-xyrm-slate-900 uppercase tracking-tight">
                  {currentArticle.id ? "Modifier l'Article" : "Rédiger un Article"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-xyrm-slate-400 hover:bg-xyrm-slate-100 hover:text-xyrm-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-left">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                  Titre de l&apos;Article <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Conférence Constitutionnelle de Dakar"
                  value={currentArticle.title || ""}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                  className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                />
              </div>

              {/* Slug Row */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Permalien (Slug)</span>
                  <span className="text-[10px] text-xyrm-slate-400 font-normal normal-case">Laisser vide pour auto-générer</span>
                </label>
                <div className="flex rounded-xl border border-xyrm-slate-200 overflow-hidden bg-xyrm-slate-50 text-xyrm-slate-500 text-xs items-center pl-3">
                  <span>/actualites/</span>
                  <input
                    type="text"
                    placeholder={currentArticle.title ? generateSlug(currentArticle.title) : "mon-nouvel-article"}
                    value={currentArticle.slug || ""}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, slug: e.target.value })}
                    className="flex-1 border-0 bg-white ml-1.5 py-2 px-3 text-xs text-xyrm-slate-850 focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary rounded-r-xl"
                  />
                </div>
              </div>

              {/* Category, Author, Date Row */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                    Catégorie <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={currentArticle.category || "actualite"}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, category: e.target.value as Article["category"] })}
                    className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                  >
                    <option value="actualite">Actualité</option>
                    <option value="analyse">Analyse</option>
                    <option value="initiative">Initiative</option>
                    <option value="formation">Vulgarisation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                    Auteur <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Bureau Exécutif"
                    value={currentArticle.authorName || ""}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, authorName: e.target.value })}
                    className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                    Date de Publication
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 14/06/2026"
                    value={currentArticle.publishedAt || ""}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, publishedAt: e.target.value })}
                    className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                  />
                </div>
              </div>

              {/* Media selection (YouTube Video OR Google Drive Photo) */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* YouTube Video ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Video className="h-4 w-4 text-red-600" />
                    Vidéo YouTube (Optionnel)
                  </label>
                  <input
                    type="text"
                    disabled={!!currentArticle.drivePhotoId}
                    placeholder={currentArticle.drivePhotoId ? "Désactivé (photo active)" : "Ex: VVnuJuLrpOQ"}
                    value={currentArticle.youtubeId || ""}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, youtubeId: e.target.value })}
                    className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary disabled:bg-xyrm-slate-50 disabled:text-xyrm-slate-400 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Google Drive Photo ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-xyrm-green-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/>
                    </svg>
                    Photo Google Drive (Optionnel)
                  </label>
                  <input
                    type="text"
                    disabled={!!currentArticle.youtubeId}
                    placeholder={currentArticle.youtubeId ? "Désactivé (vidéo active)" : "ID Google Drive de la photo"}
                    value={currentArticle.drivePhotoId || ""}
                    onChange={(e) => setCurrentArticle({ ...currentArticle, drivePhotoId: e.target.value })}
                    className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary disabled:bg-xyrm-slate-50 disabled:text-xyrm-slate-400 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Excerpt (Chapeau) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                  Résumé (Excerpt/Chapeau) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Court résumé d'une à deux phrases qui s'affiche sur la grille d'accueil..."
                  value={currentArticle.excerpt || ""}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, excerpt: e.target.value })}
                  className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary resize-none"
                />
              </div>

              {/* HTML Content */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Corps de l&apos;Article (Format HTML) <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-xyrm-slate-400 font-normal lowercase">Balises autorisées: &lt;p&gt; &lt;h3&gt; &lt;strong&gt; &lt;ul&gt; &lt;li&gt;</span>
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="<p>Rédigez le contenu de votre article ici en utilisant des paragraphes HTML...</p>"
                  value={currentArticle.content || ""}
                  onChange={(e) => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                  className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 font-mono focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                />
              </div>

              {/* Tags (comma separated) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                  Mots-clés / Tags (Séparés par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Éducation, Diaspora, Citoyenneté"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                />
              </div>

              {/* Save / Cancel footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-xyrm-slate-100 bg-white sticky bottom-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-xyrm-slate-200 bg-white px-4 py-2 text-xs font-bold text-xyrm-slate-700 hover:bg-xyrm-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary px-4 text-xs font-bold text-white shadow-md transition-colors"
                >
                  <Save className="h-4 w-4" />
                  Sauvegarder
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function ActualitesAdminPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-xyrm-slate-400">Chargement...</div>}>
      <ActualitesAdminContent />
    </Suspense>
  );
}
