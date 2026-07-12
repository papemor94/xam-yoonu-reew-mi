"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Calendar, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  Video,
  MapPin
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getJournees, saveJournee, deleteJournee } from "@/lib/db";
import { JourneeItem } from "@/data/mock/journees";

function JourneesAdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [journees, setJournees] = useState<JourneeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJrn, setCurrentJrn] = useState<Partial<JourneeItem>>({});

  
  // Delete confirm state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    loadJournees();

    if (searchParams.get("action") === "create") {
      handleOpenCreate();
      router.replace("/admin/journees");
    }
  }, [searchParams, router]);

  const loadJournees = () => {
    getJournees().then((data) => setJournees(data));
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleOpenCreate = () => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    
    setCurrentJrn({
      id: "",
      slug: "",
      title: "",
      subtitle: "Journée Xam Yoonu Reew Mi",
      summary: "",
      description: "",
      date: formattedDate,
      location: "",
      locationDetails: "",
      youtubeId: "",
      drivePhotoId: "",
      galleryPlaceholders: []
    });

    setIsModalOpen(true);
  };

  const handleOpenEdit = (jrn: JourneeItem) => {
    setCurrentJrn({ ...jrn });

    setIsModalOpen(true);
  };



  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentJrn.title?.trim()) return;

    const slug = currentJrn.slug || generateSlug(currentJrn.title);

    const jrnToSave: JourneeItem = {
      id: currentJrn.id || `jrn-${Date.now()}`,
      slug: slug,
      title: currentJrn.title,
      subtitle: currentJrn.subtitle || "Journée Xam Yoonu Reew Mi",
      summary: currentJrn.summary || "",
      description: currentJrn.description || "",
      date: currentJrn.date || "14/06/2026",
      location: currentJrn.location || "Sénégal",
      locationDetails: currentJrn.locationDetails || "",
      youtubeId: currentJrn.youtubeId || undefined,
      drivePhotoId: currentJrn.drivePhotoId || undefined,
      timeline: [],
      galleryPlaceholders: []
    };

    await saveJournee(jrnToSave);
    setIsModalOpen(false);
    loadJournees();
  };

  const handleDelete = async (id: string) => {
    await deleteJournee(id);
    setDeleteConfirmId(null);
    loadJournees();
  };

  const filteredJournees = journees.filter((jrn) => {
    const matchesSearch = jrn.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          jrn.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-xyrm-slate-900 tracking-tight">
            Gestion des Journées d&apos;Activité
          </h1>
          <p className="text-xs text-xyrm-slate-500 font-light">
            Publiez des comptes-rendus d&apos;ateliers régionaux, forums ou journées de solidarité organisées par l&apos;association.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary px-4 text-xs font-bold text-white shadow-md transition-colors"
        >
          <Plus className="h-4.5 w-4.5" />
          Ajouter une Journée
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
            placeholder="Rechercher un événement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-xyrm-slate-200 bg-white py-1.5 pl-9 pr-4 text-xs text-xyrm-slate-800 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
          />
        </div>
      </Card>

      {/* Journees Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="border-b border-xyrm-slate-100 bg-xyrm-slate-50/70 text-xs font-bold uppercase tracking-wider text-xyrm-slate-500">
                <th className="px-6 py-4">Événement</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Lieu</th>

                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-xyrm-slate-100 text-sm">
              {filteredJournees.length > 0 ? (
                filteredJournees.map((jrn) => (
                  <tr key={jrn.id} className="hover:bg-xyrm-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-xyrm-green-deep/5 p-2 text-xyrm-green-primary shrink-0 flex items-center justify-center">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-xyrm-slate-900 group-hover:text-xyrm-green-primary transition-colors leading-snug">
                            {jrn.title}
                          </span>
                          <span className="text-xxs text-xyrm-slate-400 font-mono mt-0.5 flex flex-wrap items-center gap-1.5">
                            /{jrn.slug}
                            {jrn.youtubeId ? (
                              <Badge variant="default" className="inline-flex items-center gap-0.5 text-[9px] bg-red-600 text-white border-red-600 px-1.5 py-0.2"><Video className="h-2.5 w-2.5" /> Vidéo</Badge>
                            ) : jrn.drivePhotoId ? (
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
                    <td className="px-6 py-4 text-xs font-semibold text-xyrm-slate-650">
                      {jrn.date}
                    </td>
                    <td className="px-6 py-4 text-xs text-xyrm-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-xyrm-slate-400" />
                        <span>{jrn.location}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(jrn)}
                          className="rounded-lg p-1.5 text-xyrm-slate-500 hover:text-xyrm-green-primary hover:bg-xyrm-slate-100 transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        
                        {deleteConfirmId === jrn.id ? (
                          <div className="flex items-center gap-1.5 animate-fadeIn">
                            <button
                              onClick={() => handleDelete(jrn.id)}
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
                            onClick={() => setDeleteConfirmId(jrn.id)}
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
                  <td colSpan={4} className="px-6 py-12 text-center text-xyrm-slate-400 font-light">
                    Aucune journée d&apos;activité trouvée.
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
                <Calendar className="h-5 w-5 text-xyrm-green-primary" />
                <h3 className="text-sm font-black text-xyrm-slate-900 uppercase tracking-tight">
                  {currentJrn.id ? "Modifier la Journée" : "Ajouter une Journée d&apos;Activité"}
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
                  Nom / Titre de la Journée <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 1ère Édition du Forum Participatif de Toulouse"
                  value={currentJrn.title || ""}
                  onChange={(e) => setCurrentJrn({ ...currentJrn, title: e.target.value })}
                  className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                  Sous-titre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Journée Xam Yoonu Reew Mi"
                  value={currentJrn.subtitle || ""}
                  onChange={(e) => setCurrentJrn({ ...currentJrn, subtitle: e.target.value })}
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
                  <span>/journees/</span>
                  <input
                    type="text"
                    placeholder={currentJrn.title ? generateSlug(currentJrn.title) : "mon-nouvel-evenement"}
                    value={currentJrn.slug || ""}
                    onChange={(e) => setCurrentJrn({ ...currentJrn, slug: e.target.value })}
                    className="flex-1 border-0 bg-white ml-1.5 py-2 px-3 text-xs text-xyrm-slate-850 focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary rounded-r-xl"
                  />
                </div>
              </div>

              {/* Date, Location, LocationDetails */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                    Date (JJ/MM/AAAA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 23/05/2026"
                    value={currentJrn.date || ""}
                    onChange={(e) => setCurrentJrn({ ...currentJrn, date: e.target.value })}
                    className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                    Lieu / Ville <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Toulouse, France"
                    value={currentJrn.location || ""}
                    onChange={(e) => setCurrentJrn({ ...currentJrn, location: e.target.value })}
                    className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                    Détail de l&apos;Adresse
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Le Petit Capitole, 153 av Lardenne"
                    value={currentJrn.locationDetails || ""}
                    onChange={(e) => setCurrentJrn({ ...currentJrn, locationDetails: e.target.value })}
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
                    ID de la Vidéo YouTube (Optionnel)
                  </label>
                  <input
                    type="text"
                    disabled={!!currentJrn.drivePhotoId}
                    placeholder={currentJrn.drivePhotoId ? "Désactivé (photo active)" : "Ex: VVnuJuLrpOQ"}
                    value={currentJrn.youtubeId || ""}
                    onChange={(e) => setCurrentJrn({ ...currentJrn, youtubeId: e.target.value })}
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
                    disabled={!!currentJrn.youtubeId}
                    placeholder={currentJrn.youtubeId ? "Désactivé (vidéo active)" : "ID Google Drive de la photo"}
                    value={currentJrn.drivePhotoId || ""}
                    onChange={(e) => setCurrentJrn({ ...currentJrn, drivePhotoId: e.target.value })}
                    className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary disabled:bg-xyrm-slate-50 disabled:text-xyrm-slate-400 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Summary / Chapeau */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                  Résumé Synthétique <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Court résumé de l'événement qui s'affiche sur la liste générale..."
                  value={currentJrn.summary || ""}
                  onChange={(e) => setCurrentJrn({ ...currentJrn, summary: e.target.value })}
                  className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary resize-none"
                />
              </div>

              {/* HTML Detailed Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Compte-rendu détaillé (HTML) <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-xyrm-slate-400 font-normal lowercase">Balises: &lt;p&gt; &lt;strong&gt; &lt;em&gt;</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="<p>Détaillez le déroulé global ou le bilan moral de cette journée d'activités...</p>"
                  value={currentJrn.description || ""}
                  onChange={(e) => setCurrentJrn({ ...currentJrn, description: e.target.value })}
                  className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2 text-xs text-xyrm-slate-850 font-mono focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                />
              </div>



              {/* Save Footer Buttons */}
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

export default function JourneesAdminPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-xyrm-slate-400">Chargement...</div>}>
      <JourneesAdminContent />
    </Suspense>
  );
}
