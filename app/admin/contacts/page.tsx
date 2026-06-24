"use client";

import { useEffect, useState } from "react";
import { 
  Search, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Calendar, 
  Check, 
  Archive
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { getContacts, saveContact, deleteContact, ContactMessage } from "@/lib/db";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Nouveau" | "Traité" | "Archivé">("all");
  const [showOnlyAdhesions, setShowOnlyAdhesions] = useState(false);
  
  // Modal states
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<ContactMessage | null>(null);

  useEffect(() => {
    setMounted(true);
    setContacts(getContacts());

    const handleStorage = () => {
      setContacts(getContacts());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce message de contact ?")) {
      deleteContact(id);
      setContacts(getContacts());
      if (selectedContact?.id === id) {
        setIsModalOpen(false);
      }
    }
  };

  const handleOpenDetails = (contact: ContactMessage) => {
    setSelectedContact(contact);
    setEditForm({ ...contact });
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (contact: ContactMessage, newStatus: "Nouveau" | "Traité" | "Archivé") => {
    const updated = { ...contact, status: newStatus };
    saveContact(updated);
    setContacts(getContacts());
    if (selectedContact?.id === contact.id) {
      setSelectedContact(updated);
      setEditForm(updated);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;

    saveContact(editForm);
    setContacts(getContacts());
    setSelectedContact(editForm);
    setIsModalOpen(false);
  };

  const displayContacts = mounted ? contacts : [];

  const filteredContacts = displayContacts.filter((c) => {
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAdhesion = !showOnlyAdhesions || c.isMembershipRequest === true;
    return matchesStatus && matchesSearch && matchesAdhesion;
  });

  const countByStatus = (status: "Nouveau" | "Traité" | "Archivé") => {
    return displayContacts.filter((c) => c.status === status).length;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Badge className="bg-xyrm-gold text-xyrm-green-deep border-xyrm-gold/30 font-bold uppercase tracking-widest text-[9px] px-3 py-1 mb-2">
            Espace d&apos;Administration
          </Badge>
          <h1 className="text-2xl font-black text-xyrm-slate-900 md:text-3xl tracking-tight leading-none">
            Gestion des Contacts & Adhésions
          </h1>
          <p className="text-xs text-xyrm-slate-500 font-light mt-1.5">
            Gérez les demandes d&apos;inscription aux ateliers, les requêtes d&apos;adhésion et les messages reçus.
          </p>
        </div>
      </div>

      {/* Counters Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="p-4 bg-white border border-xyrm-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-xyrm-slate-500 uppercase tracking-wider">Total Messages</span>
            <Badge variant="default" className="text-xs font-bold">{displayContacts.length}</Badge>
          </div>
          <p className="text-2xl font-black text-xyrm-slate-900 mt-2">{displayContacts.length}</p>
        </Card>

        <Card className="p-4 bg-white border border-xyrm-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-xyrm-slate-500 uppercase tracking-wider">Nouveaux</span>
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs font-bold">En attente</Badge>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-2">{countByStatus("Nouveau")}</p>
        </Card>

        <Card className="p-4 bg-white border border-xyrm-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-xyrm-slate-500 uppercase tracking-wider">Traités</span>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs font-bold">Complétés</Badge>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2">{countByStatus("Traité")}</p>
        </Card>
      </div>

      {/* Search & Filters Controls */}
      <Card className="p-6 bg-white border border-xyrm-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4.5 w-4.5 text-xyrm-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Rechercher par nom, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-xyrm-slate-200 bg-white py-2 pl-10 pr-4 text-xs text-xyrm-slate-800 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-1 sm:pb-0">
            <label className="inline-flex items-center gap-2 text-xs font-bold text-xyrm-slate-700 bg-xyrm-slate-100 hover:bg-xyrm-slate-200/80 px-3 py-1.5 rounded-lg cursor-pointer select-none transition-colors border border-xyrm-slate-200/30">
              <input
                type="checkbox"
                checked={showOnlyAdhesions}
                onChange={(e) => setShowOnlyAdhesions(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-xyrm-slate-300 text-xyrm-green-primary focus:ring-xyrm-green-primary accent-xyrm-green-deep cursor-pointer"
              />
              <span>Demandes d&apos;adhésion</span>
            </label>

            {[
              { label: "Tous", value: "all" },
              { label: "Nouveaux", value: "Nouveau" },
              { label: "Traités", value: "Traité" },
              { label: "Archivés", value: "Archivé" }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value as "all" | "Nouveau" | "Traité" | "Archivé")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  statusFilter === tab.value
                    ? "bg-xyrm-green-deep text-white"
                    : "bg-xyrm-slate-100 hover:bg-xyrm-slate-200 text-xyrm-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Contact Table Grid */}
      <Card className="overflow-hidden border border-xyrm-slate-200 bg-white shadow-sm rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-xyrm-slate-50 border-b border-xyrm-slate-200 text-[10px] font-black uppercase tracking-wider text-xyrm-slate-500">
                <th className="px-6 py-4">Expéditeur</th>
                <th className="px-6 py-4">Sujet / Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-xyrm-slate-100">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr 
                    key={contact.id} 
                    className={`hover:bg-xyrm-slate-50/50 transition-colors ${
                      contact.status === "Nouveau" ? "font-medium" : "text-xyrm-slate-600"
                    }`}
                  >
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <div className="text-xs font-bold text-xyrm-slate-900">{contact.name}</div>
                        {contact.isMembershipRequest && (
                          <Badge variant="default" className="bg-xyrm-gold/10 text-xyrm-gold border-xyrm-gold/30 hover:bg-xyrm-gold/20 text-[9px] font-black uppercase tracking-wider py-0 px-2">
                            Adhésion
                          </Badge>
                        )}
                      </div>
                      <div className="text-[10px] text-xyrm-slate-400 flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="text-[10px] text-xyrm-slate-400 flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {contact.phone}
                        </div>
                      )}
                      {contact.activitySector && (
                        <div className="text-[9px] font-black text-xyrm-green-deep bg-xyrm-green-light/20 border border-xyrm-green-light/30 rounded px-1.5 py-0.5 inline-block mt-1 uppercase tracking-wider">
                          Secteur : {contact.activitySector}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <div className="text-xs font-bold text-xyrm-slate-900 line-clamp-1">{contact.subject}</div>
                      <div className="text-[10px] text-xyrm-slate-500 line-clamp-2 mt-0.5 font-light">
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xyrm-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {contact.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={
                          contact.status === "Traité" 
                            ? "payee" 
                            : contact.status === "Archivé" 
                              ? "default" 
                              : "envoyee"
                        }
                      >
                        {contact.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenDetails(contact)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-xyrm-slate-200 text-xyrm-slate-600 hover:bg-xyrm-slate-100 hover:text-xyrm-green-primary transition-colors"
                        title="Ouvrir la fiche"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-xyrm-slate-400 font-light">
                    Aucun message de contact trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Details / Edit Modal */}
      {isModalOpen && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-fadeIn">
          <Card className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden animate-slideUp">
            <CardHeader className="bg-xyrm-green-deep text-white flex flex-row items-center justify-between p-6">
              <div>
                <CardTitle className="text-lg font-black">Fiche Contact & Adhésion</CardTitle>
                <p className="text-[10px] text-xyrm-gold font-bold uppercase tracking-widest mt-0.5">
                  ID: {editForm.id} • Envoyé le {editForm.createdAt}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </CardHeader>
            <form onSubmit={handleSaveEdit}>
              <CardContent className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Expéditeur Info */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-xyrm-slate-400 uppercase tracking-wider">Expéditeur</label>
                    <input 
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full text-xs font-bold text-xyrm-slate-900 border border-xyrm-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-xyrm-green-primary focus:outline-none"
                    />
                  </div>

                  {/* Status selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-xyrm-slate-400 uppercase tracking-wider">Statut de Traitement</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value as "Nouveau" | "Traité" | "Archivé" })}
                      className="w-full text-xs font-semibold text-xyrm-slate-700 bg-white border border-xyrm-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-xyrm-green-primary focus:outline-none"
                    >
                      <option value="Nouveau">Nouveau (En attente)</option>
                      <option value="Traité">Traité (Validé)</option>
                      <option value="Archivé">Archivé</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-xyrm-slate-400 uppercase tracking-wider">Email</label>
                    <input 
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full text-xs text-xyrm-slate-700 border border-xyrm-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-xyrm-green-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-xyrm-slate-400 uppercase tracking-wider">Téléphone</label>
                    <input 
                      type="text"
                      value={editForm.phone || ""}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      placeholder="Non renseigné"
                      className="w-full text-xs text-xyrm-slate-700 border border-xyrm-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-xyrm-green-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-xyrm-slate-400 uppercase tracking-wider">Domaine d&apos;Activité</label>
                    <select
                      value={editForm.activitySector || ""}
                      onChange={(e) => setEditForm({ ...editForm, activitySector: e.target.value })}
                      className="w-full text-xs text-xyrm-slate-700 bg-white border border-xyrm-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-xyrm-green-primary focus:outline-none"
                    >
                      <option value="">Non spécifié</option>
                      <option value="Éducation / Enseignement">Éducation / Enseignement</option>
                      <option value="Droit / Justice">Droit / Justice</option>
                      <option value="Santé / Action Sociale">Santé / Action Sociale</option>
                      <option value="Environnement / Agriculture">Environnement / Agriculture</option>
                      <option value="Art / Culture / Sport">Art / Culture / Sport</option>
                      <option value="Technologies / Communication">Technologies / Communication</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  {/* Membership toggle inside details */}
                  <div className="space-y-1 sm:col-span-2">
                    <div className="flex items-center gap-2 border border-xyrm-slate-200 bg-xyrm-slate-50/50 rounded-lg p-2.5 mt-1">
                      <input 
                        type="checkbox"
                        id="modal-membership"
                        checked={editForm.isMembershipRequest || false}
                        onChange={(e) => setEditForm({ ...editForm, isMembershipRequest: e.target.checked })}
                        className="h-4 w-4 rounded border-xyrm-slate-300 text-xyrm-green-primary focus:ring-xyrm-green-primary accent-xyrm-green-deep cursor-pointer"
                      />
                      <label htmlFor="modal-membership" className="text-xs font-bold text-xyrm-slate-800 cursor-pointer select-none">
                        Cet expéditeur a formulé une demande pour rejoindre l&apos;association (Membre / Bénévole)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-xyrm-slate-400 uppercase tracking-wider">Objet du message</label>
                  <input 
                    type="text"
                    value={editForm.subject}
                    onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                    className="w-full text-xs font-bold text-xyrm-slate-900 border border-xyrm-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-xyrm-green-primary focus:outline-none"
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-1.5 p-4 bg-xyrm-slate-50 border border-xyrm-slate-100 rounded-2xl">
                  <label className="text-[10px] font-bold text-xyrm-slate-400 uppercase tracking-wider">Contenu du message</label>
                  <textarea
                    rows={4}
                    value={editForm.message}
                    onChange={(e) => setEditForm({ ...editForm, message: e.target.value })}
                    className="w-full text-xs text-xyrm-slate-700 bg-white border border-xyrm-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-xyrm-green-primary focus:outline-none font-light leading-relaxed"
                  />
                </div>
              </CardContent>
              <div className="bg-xyrm-slate-50 px-6 py-4 flex justify-between items-center border-t border-xyrm-slate-100 gap-4">
                {/* Fast status buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedContact!, "Traité")}
                    className="inline-flex h-8 items-center gap-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 px-3 text-xxs font-bold text-emerald-700 transition-colors border border-emerald-200"
                  >
                    <Check className="h-3.5 w-3.5" /> Traiter
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedContact!, "Archivé")}
                    className="inline-flex h-8 items-center gap-1 rounded-lg bg-xyrm-slate-100 hover:bg-xyrm-slate-200 px-3 text-xxs font-bold text-xyrm-slate-700 transition-colors border border-xyrm-slate-200"
                  >
                    <Archive className="h-3.5 w-3.5" /> Archiver
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex h-9 items-center justify-center rounded-xl border border-xyrm-slate-200 px-4 text-xs font-bold text-xyrm-slate-600 hover:bg-xyrm-slate-100 transition-colors"
                  >
                    Fermer
                  </button>
                  <button
                    type="submit"
                    className="inline-flex h-9 items-center justify-center rounded-xl bg-xyrm-green-deep px-5 text-xs font-bold text-white hover:bg-xyrm-green-primary transition-colors"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

// Icon wrapper fix for close button
function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
