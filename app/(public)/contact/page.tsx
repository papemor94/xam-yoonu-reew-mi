"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { saveContact } from "@/lib/db";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    activitySector: "",
    subject: "",
    message: "",
    isMembershipRequest: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Le nom complet est obligatoire.";
    if (!formData.email.trim()) {
      tempErrors.email = "L'adresse email est obligatoire.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "L'adresse email n'est pas valide.";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Le sujet est obligatoire.";
    if (!formData.message.trim()) tempErrors.message = "Le message est obligatoire.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
      
      try {
        await saveContact({
          id: `c-${Date.now()}`,
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone || undefined,
          activitySector: formData.activitySector || undefined,
          subject: formData.subject,
          message: formData.message,
          status: "Nouveau",
          createdAt: formattedDate,
          isMembershipRequest: formData.isMembershipRequest
        });

        setSubmitted(true);
        setFormData({ fullName: "", email: "", phone: "", activitySector: "", subject: "", message: "", isMembershipRequest: false });
      } catch (err) {
        console.error("Error saving contact message:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="space-y-12 py-8 md:py-12 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="space-y-4 text-center">
        <Badge variant="default" className="font-bold">CONTACT</Badge>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-5xl tracking-tight">
          Entrer en Contact
        </h1>
        <p className="text-sm md:text-base text-xyrm-slate-500 font-light max-w-2xl mx-auto">
          Pour poser des questions sur nos ateliers, proposer des interventions ou soutenir nos actions, écrivez-nous.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        
        {/* Contact Info Panel (Left Column) */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="bg-xyrm-green-deep text-white border-xyrm-green-light/20 relative overflow-hidden h-full flex flex-col justify-between p-8">
            <div className="absolute right-0 top-0 w-32 h-32 bg-xyrm-gold/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-6">
              <h3 className="text-xl font-black text-xyrm-gold tracking-tight">
                Coordonnées Officielles
              </h3>
              <p className="text-xs text-white/80 font-light leading-relaxed">
                Notre secrétariat est à votre écoute pour toute demande d&apos;inscription ou partenariat.
              </p>

              <div className="space-y-5 pt-4">
                <div className="flex items-start gap-3.5">
                  <MapPin className="h-5 w-5 text-xyrm-gold shrink-0 mt-0.5" />
                  <div className="text-xs font-light space-y-1">
                    <p className="font-bold text-white">Adresses</p>
                    <p className="text-white/80">Dakar, Sénégal (Siège social)</p>
                    <p className="text-white/80">Toulouse, France (Antenne Europe)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="h-5 w-5 text-xyrm-gold shrink-0 mt-0.5" />
                  <div className="text-xs font-light space-y-1">
                    <p className="font-bold text-white">Téléphones</p>
                    <p className="text-white/85">+221 77 000 00 00</p>
                    <p className="text-white/85">+33 6 00 00 00 00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="h-5 w-5 text-xyrm-gold shrink-0 mt-0.5" />
                  <div className="text-xs font-light space-y-1">
                    <p className="font-bold text-white">Email</p>
                    <p className="text-white/85 hover:text-xyrm-gold transition-colors">contact@xamyoonureewmi.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="h-5 w-5 text-xyrm-gold shrink-0 mt-0.5" />
                  <div className="text-xs font-light space-y-1">
                    <p className="font-bold text-white">Disponibilité</p>
                    <p className="text-white/85">Lundi - Vendredi : 9h00 - 18h00</p>
                    <p className="text-white/85">Samedi : 9h00 - 13h00 (GMT / CET)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] text-xyrm-gold font-bold uppercase tracking-wider">
                  Notre Engagement
                </p>
                <p className="text-[10px] text-white/85 font-light mt-1 leading-relaxed">
                  Nous répondons à toutes les sollicitations sous 48 heures ouvrées. Vos propositions d&apos;ateliers et suggestions de thématiques d&apos;utilité publique sont les bienvenues.
                </p>
              </div>
              <div className="text-[10px] text-white/40 font-light leading-tight">
                Xam Yoonu Reew Mi est enregistrée sous le régime associatif citoyen.
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form Panel (Right Columns) */}
        <div className="lg:col-span-2">
          <Card className="p-8 md:p-10 bg-white">
            {submitted ? (
              <div className="text-center py-12 space-y-6 max-w-md mx-auto animate-fadeIn">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-xyrm-slate-900">Message envoyé avec succès !</h3>
                  <p className="text-sm text-xyrm-slate-500 font-light leading-relaxed">
                    Merci d&apos;avoir contacté l&apos;association. Notre secrétariat reviendra vers vous par email dans les plus brefs délais.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-xyrm-slate-200 px-6 text-xs font-bold text-xyrm-slate-700 hover:bg-xyrm-slate-50 transition-colors"
                >
                  Envoyer un nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full rounded-xl border py-2.5 px-4 text-sm focus:outline-none focus:ring-1 ${
                        errors.fullName
                          ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                          : "border-xyrm-slate-200 focus:border-xyrm-green-primary focus:ring-xyrm-green-primary"
                      }`}
                      placeholder="Ex: Pape Mor Ndiaye"
                    />
                    {errors.fullName && <p className="text-xxs font-bold text-rose-600">{errors.fullName}</p>}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-xl border py-2.5 px-4 text-sm focus:outline-none focus:ring-1 ${
                        errors.email
                          ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                          : "border-xyrm-slate-200 focus:border-xyrm-green-primary focus:ring-xyrm-green-primary"
                      }`}
                      placeholder="Ex: papemor@example.sn"
                    />
                    {errors.email && <p className="text-xxs font-bold text-rose-600">{errors.email}</p>}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                      Numéro de Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-xyrm-slate-200 py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:border-xyrm-green-primary focus:ring-xyrm-green-primary bg-white text-xyrm-slate-800"
                      placeholder="Ex: +221 77 123 45 67"
                    />
                  </div>

                  {/* Domaine d'activité (Sector of Activity) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                      Domaine d&apos;Activité
                    </label>
                    <select
                      name="activitySector"
                      value={formData.activitySector}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-xyrm-slate-200 bg-white py-2.5 px-4 text-sm focus:outline-none focus:ring-1 focus:border-xyrm-green-primary focus:ring-xyrm-green-primary text-xyrm-slate-800"
                    >
                      <option value="">Sélectionnez un domaine...</option>
                      <option value="Éducation / Enseignement">Éducation / Enseignement</option>
                      <option value="Droit / Justice">Droit / Justice</option>
                      <option value="Santé / Action Sociale">Santé / Action Sociale</option>
                      <option value="Environnement / Agriculture">Environnement / Agriculture</option>
                      <option value="Art / Culture / Sport">Art / Culture / Sport</option>
                      <option value="Technologies / Communication">Technologies / Communication</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                    Sujet du Message *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full rounded-xl border py-2.5 px-4 text-sm focus:outline-none focus:ring-1 ${
                      errors.subject
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                        : "border-xyrm-slate-200 focus:border-xyrm-green-primary focus:ring-xyrm-green-primary"
                    }`}
                    placeholder="Ex: Inscription aux ateliers / Question d'adhésion"
                  />
                  {errors.subject && <p className="text-xxs font-bold text-rose-600">{errors.subject}</p>}
                </div>

                {/* Message Text area */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-xyrm-slate-700 uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full rounded-xl border py-2.5 px-4 text-sm focus:outline-none focus:ring-1 ${
                      errors.message
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                        : "border-xyrm-slate-200 focus:border-xyrm-green-primary focus:ring-xyrm-green-primary"
                      }`}
                    placeholder="Rédigez votre demande en précisant comment nous pouvons vous aider..."
                  />
                  {errors.message && <p className="text-xxs font-bold text-rose-600">{errors.message}</p>}
                </div>

                {/* Membership Request Checkbox */}
                <div className="flex items-start gap-3 bg-xyrm-slate-50 border border-xyrm-slate-100 rounded-xl p-4 transition-all hover:bg-xyrm-slate-100/50">
                  <div className="flex items-center h-5">
                    <input
                      id="isMembershipRequest"
                      name="isMembershipRequest"
                      type="checkbox"
                      checked={formData.isMembershipRequest}
                      onChange={(e) => setFormData(prev => ({ ...prev, isMembershipRequest: e.target.checked }))}
                      className="h-4.5 w-4.5 rounded border-xyrm-slate-300 text-xyrm-green-deep focus:ring-xyrm-green-primary cursor-pointer accent-xyrm-green-deep"
                    />
                  </div>
                  <div className="text-xs">
                    <label htmlFor="isMembershipRequest" className="font-bold text-xyrm-slate-800 cursor-pointer select-none">
                      Je souhaite rejoindre l&apos;association en tant que membre / bénévole
                    </label>
                    <p className="text-[10px] text-xyrm-slate-400 font-light mt-0.5">
                      Cochez cette case pour soumettre une demande officielle d&apos;adhésion à notre équipe.
                    </p>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-xl bg-xyrm-green-deep px-8 text-sm font-bold text-white shadow-md transition-all hover:bg-xyrm-green-primary hover:shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Envoyer le Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </Card>
        </div>

      </div>

    </div>
  );
}
