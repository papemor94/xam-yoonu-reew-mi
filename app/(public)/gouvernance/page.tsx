"use client";

import { useState } from "react";
import { getGoogleDriveImageUrl } from "@/lib/utils";
import {
  Scale,
  Video,
  HeartHandshake,
  Settings,
  Compass,
  CheckCircle2,
  Users,
  Workflow
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function GouvernancePage() {
  const [selectedCommission, setSelectedCommission] = useState(0);

  const executiveBoard = [
    {
      name: "Alassane DIA",
      role: "Président du Bureau Exécutif",
      image: "https://drive.google.com/file/d/1p5uQ4lnGQSR_-XPOsY1Bqy-PE9LOfqIC/view?usp=sharing",
      linkedin: "https://linkedin.com",
      description: "Voté en Assemblée Générale à l'Université Toulouse Capitole. Dirige la politique générale de l'association."
    },
    {
      name: "Amadou Sow NDIAYE",
      role: "Secrétaire Général",
      image: "https://drive.google.com/file/d/1p5uQ4lnGQSR_-XPOsY1Bqy-PE9LOfqIC/view?usp=sharing",
      linkedin: "https://linkedin.com",
      description: "En charge de l'administration, des relations institutionnelles et du respect des statuts."
    }
  ];

  const commissions = [
    {
      id: 0,
      title: "Droit et Politiques Publiques",
      icon: Scale,
      color: "from-xyrm-green-deep to-xyrm-green-primary",
      mission: "Vulgariser le droit positif, les règles constitutionnelles et analyser objectivement l'impact des politiques publiques.",
      details: [
        "Pédagogie active sur les budgets nationaux, les finances publiques, les systèmes de santé et d'éducation.",
        "Explication des interconnexions entre les institutions de la République pour un dialogue transparent.",
        "Vulgarisation des politiques environnementales, économiques et numériques nationales."
      ]
    },
    {
      id: 1,
      title: "Communication et Audiovisuel",
      icon: Video,
      color: "from-xyrm-green-deep to-xyrm-green-primary",
      mission: "Assurer la production de haute qualité et la large diffusion des contenus éducatifs de l'association.",
      details: [
        "Tournage, montage et diffusion des podcasts, émissions et capsules vidéo.",
        "Gestion et animation dynamique des chaînes et réseaux officiels (YouTube, TikTok, Facebook, Instagram).",
        "Maintenance du site web et valorisation des travaux auprès de la diaspora internationale."
      ]
    },
    {
      id: 2,
      title: "Action Sociale et Solidarité",
      icon: HeartHandshake,
      color: "from-xyrm-green-deep to-xyrm-green-primary",
      mission: "Identifier les besoins urgents des populations locales et de la diaspora pour y apporter des réponses de terrain.",
      details: [
        "Veille active et enquêtes sociales sur les difficultés éducatives, sanitaires et professionnelles.",
        "Campagnes solidaires en milieu scolaire sénégalais (conventions et soutien matériel ciblé).",
        "Accompagnement des enfants en difficulté, des jeunes et des femmes victimes de violences."
      ]
    },
    {
      id: 3,
      title: "Organisation et Logistique",
      icon: Settings,
      color: "from-xyrm-green-deep to-xyrm-green-primary",
      mission: "Planifier et superviser le bon déroulement de tous les événements et rencontres physiques ou en ligne.",
      details: [
        "Gestion logistique et coordination technique des conférences et séminaires.",
        "Supervision terrain de l'événement annuel phare (Les Journées Xam Yoonu Reew Mi).",
        "Mise en œuvre opérationnelle des calendriers décidés par le Bureau exécutif."
      ]
    }
  ];

  return (
    <div className="space-y-20 py-8 md:py-16 max-w-5xl mx-auto px-4 md:px-6 animate-fadeIn">

      {/* 1. Header principal */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-xyrm-green-deep/5 via-xyrm-green-deep/[0.02] to-xyrm-gold/5 border border-xyrm-slate-100 p-8 md:p-12 text-center space-y-4 shadow-sm">
        <div className="absolute -left-16 -top-16 w-36 h-36 bg-xyrm-green-light/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-xyrm-gold/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-1.5 rounded-full bg-xyrm-green-deep/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-xyrm-green-deep border border-xyrm-green-deep/10">
          <span className="h-1.5 w-1.5 rounded-full bg-xyrm-gold animate-pulse" />
          STRUCTURE ET ORGANISATION
        </div>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-4.5xl tracking-tight max-w-3xl mx-auto">
          Gouvernance Officielle
        </h1>
        <div className="w-12 h-1 bg-gradient-to-r from-xyrm-green-deep to-xyrm-gold mx-auto rounded-full" />
        <p className="text-xs md:text-sm text-xyrm-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          Découvrez notre fonctionnement démocratique, le Bureau exécutif fondateur, le Conseil consultatif indépendant et nos commissions techniques de travail.
        </p>
      </div>

      {/* 2. Organigramme Visuel Interactif (Premium Grid Layout) */}
      <section className="space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl font-black text-xyrm-slate-900 tracking-tight flex items-center justify-center gap-2">
            <Workflow className="h-5 w-5 text-xyrm-gold" />
            Organigramme Fonctionnel
          </h2>
          <p className="text-xs text-xyrm-slate-400 font-light">
            Représentation visuelle de la synergie entre les instances dirigeantes, consultatives et opérationnelles de l&apos;association.
          </p>
        </div>

        <div className="p-8 bg-xyrm-slate-50 border border-xyrm-slate-200/50 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-xyrm-gold/5 via-transparent to-transparent pointer-events-none" />

          {/* Block Diagram Layout */}
          <div className="relative flex flex-col items-center gap-8">

            {/* Top Level: Bureau Exécutif & Conseil Consultatif */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl relative">
              {/* Bureau Exécutif Block */}
              <div className="border border-xyrm-gold bg-white p-6 rounded-2xl shadow-sm text-center relative flex flex-col justify-between">
                <div className="absolute top-3 left-3">
                  <Badge variant="envoyee" className="text-[9px] font-bold">EXÉCUTIF</Badge>
                </div>
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-xyrm-green-deep/5 text-xyrm-green-primary mb-3">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-xyrm-slate-900">Bureau Exécutif</h4>
                <p className="text-xxs text-xyrm-slate-400 font-light mt-1">
                  Présidence et Secrétariat général. Oriente la stratégie générale et gère l&apos;administration.
                </p>
              </div>

              {/* Connector line between Bureau and Conseil */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
                <div className="h-0.5 w-12 border-t-2 border-dashed border-xyrm-slate-300" />
              </div>

              {/* Conseil Consultatif Block */}
              <div className="border border-xyrm-slate-200 bg-white p-6 rounded-2xl shadow-sm text-center relative flex flex-col justify-between">
                <div className="absolute top-3 left-3">
                  <Badge variant="default" className="text-[9px] font-bold">ÉTHIQUE</Badge>
                </div>
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-xyrm-gold/10 text-xyrm-gold-dark mb-3">
                  <Compass className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-xyrm-slate-900">Conseil Consultatif</h4>
                <p className="text-xxs text-xyrm-slate-400 font-light mt-1">
                  12 experts indépendants. Veille au respect de la charte éthique et fournit des conseils techniques d&apos;orientation.
                </p>
              </div>
            </div>

            {/* Vertical connector arrow down to Commissions */}
            <div className="flex flex-col items-center">
              <div className="h-8 w-0.5 bg-xyrm-slate-350" />
              <div className="w-2.5 h-2.5 border-b-2 border-r-2 border-xyrm-slate-350 rotate-45 -mt-1.5" />
            </div>

            {/* Bottom Level: 4 Commissions techniques */}
            <div className="w-full">
              <div className="text-center mb-4">
                <Badge className="bg-xyrm-green-deep text-white border-none text-[9px] uppercase font-bold tracking-widest px-3 py-1">
                  Pôles Opérationnels de Terrain
                </Badge>
              </div>
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                {commissions.map((comm) => (
                  <div key={comm.id} className="bg-white border border-xyrm-slate-200 p-4 rounded-xl shadow-xxs text-center space-y-2 hover:border-xyrm-green-primary/45 transition-colors">
                    <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg text-white bg-gradient-to-r ${comm.color}`}>
                      <comm.icon className="h-4 w-4" />
                    </div>
                    <h5 className="text-xxs font-black text-xyrm-slate-900 leading-tight">
                      {comm.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Le Bureau Exécutif Fondateur (Statuts) */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-xyrm-slate-900 tracking-tight">
            Le Bureau Exécutif
          </h2>
          <p className="text-xs text-xyrm-slate-500 font-light">
            Les membres fondateurs chargés de piloter l&apos;association au cours de son mandat triennal (2025-2028).
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {executiveBoard.map((item, idx) => (
            <Card key={idx} className="p-6 text-center border border-xyrm-slate-200 bg-xyrm-slate-50/40 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between">
              <div className="space-y-4 flex flex-col items-center">
                <div className="h-20 w-20 rounded-full overflow-hidden mb-2 ring-4 ring-xyrm-gold/20 shrink-0">
                  <img src={getGoogleDriveImageUrl(item.image)} alt={`Photo de ${item.name}`} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-xyrm-slate-900">
                    {item.name}
                  </h3>
                  <p className="text-xxs font-extrabold uppercase tracking-wider text-xyrm-gold-dark">
                    {item.role}
                  </p>
                </div>
                <p className="text-xxs text-xyrm-slate-500 font-light leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
              <div className="pt-4">
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-xyrm-slate-100 hover:bg-[#0077b5] text-xyrm-slate-500 hover:text-white transition-all shadow-xxs"
                  aria-label={`Profil LinkedIn de ${item.name}`}
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Les Commissions Opérationnelles (Règlement Intérieur) */}
      <section className="space-y-8 bg-xyrm-slate-50 rounded-3xl p-8 border border-xyrm-slate-100">
        <div className="space-y-3 md:max-w-2xl">
          <h2 className="text-2xl md:text-3.5xl font-black text-xyrm-slate-900 tracking-tight">
            Les Commissions Techniques
          </h2>
          <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
            Le règlement intérieur de l&apos;association institue des commissions de travail chargées de planifier, exécuter et superviser les missions sur le terrain.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start pt-4">
          {/* Navigation latérale des commissions */}
          <div className="md:col-span-5 space-y-2">
            {commissions.map((comm, idx) => (
              <button
                key={comm.id}
                onClick={() => setSelectedCommission(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-4 ${selectedCommission === idx
                  ? "bg-white border-xyrm-gold shadow-md scale-[1.01]"
                  : "bg-transparent border-transparent hover:bg-white/50 text-xyrm-slate-500"
                  }`}
              >
                <div className={`p-2.5 rounded-xl text-white bg-gradient-to-r ${comm.color}`}>
                  <comm.icon className="h-5 w-5" />
                </div>
                <span className="font-extrabold text-xs md:text-sm text-xyrm-slate-900">
                  {comm.title}
                </span>
              </button>
            ))}
          </div>

          {/* Contenu détaillé de la commission sélectionnée */}
          <div className="md:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-xyrm-slate-200/60 shadow-sm space-y-6 min-h-[300px]">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-xyrm-gold-dark">
                DÉTAIL DE LA COMMISSION
              </span>
              <h3 className="text-xl font-black text-xyrm-slate-900 leading-snug">
                {commissions[selectedCommission].title}
              </h3>
              <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
                {commissions[selectedCommission].mission}
              </p>

              <ul className="space-y-2 pt-2">
                {commissions[selectedCommission].details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-xyrm-slate-600 font-light">
                    <CheckCircle2 className="h-4.5 w-4.5 text-xyrm-green-emerald shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border border-xyrm-slate-200/80 rounded-3xl p-8 md:p-12 shadow-sm space-y-4">
        <Badge className="bg-xyrm-gold/15 text-xyrm-gold-dark border-none font-extrabold text-[9px] uppercase tracking-widest px-3 py-1">
          Organe Technique Indépendant
        </Badge>
        <h2 className="text-2xl md:text-3.5xl font-black text-xyrm-slate-900 tracking-tight">
          Le Conseil Consultatif
        </h2>
        <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed max-w-3xl">
          Composé de douze experts indépendants choisis pour leurs compétences reconnues (droit, langues nationales, économie, éducation populaire, informatique). Il apporte un appui stratégique et éthique, veillant à ce que les activités opérationnelles respectent l&apos;esprit de neutralité absolue de l&apos;association.
        </p>
      </section>

    </div>
  );
}
