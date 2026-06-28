"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Landmark, 
  Scale, 
  HeartHandshake, 
  Compass, 
  ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AssociationPage() {
  const [selectedYear, setSelectedYear] = useState("2026");

  const pillars = [
    {
      title: "Vulgarisation du Droit",
      description: "Permettre à chaque citoyen de mieux comprendre les normes et la législation qui régissent sa vie quotidienne, traduites en langage simple et accessible.",
      icon: Scale,
    },
    {
      title: "Explication des Institutions",
      description: "Éclairer les citoyens sur le fonctionnement de l'État, les mécanismes de décision et les politiques publiques (santé, éducation, finances).",
      icon: Landmark,
    },
    {
      title: "Actions Sociales Concrètes",
      description: "Mettre en œuvre des élans de solidarité active répondant aux besoins réels sur le terrain, au Sénégal et au sein de la diaspora.",
      icon: HeartHandshake,
    },
  ];

  const roadmap = [
    {
      year: "2026",
      title: "Lancement et Structuration",
      tagline: "Établir les fondations opérationnelles",
      focus: "Mise en place des organes dirigeants (Bureau exécutif, Conseil consultatif), formalités administratives et présence en ligne.",
      actions: [
        "Dépôt officiel des statuts auprès de la Préfecture de la Haute-Garonne.",
        "Création et déploiement du site internet officiel et des canaux numériques (YouTube, TikTok, Instagram).",
        "Structuration du Conseil consultatif (12 experts) et répartition des membres dans les 5 commissions.",
        "Lancement du programme de webinaires mensuels et de micro-contenus de vulgarisation.",
        "Mai 2026 : Organisation des 1ères Journées Xam Yoonu Reew Mi à Toulouse."
      ],
      metrics: {
        members: "100 membres actifs",
        antennes: "1 Antenne centrale (Toulouse)",
        productions: "10 contenus majeurs"
      }
    },
    {
      year: "2027",
      title: "Consolidation et Ancrage",
      tagline: "Renforcement des réseaux et formation",
      focus: "Mise en place d'antennes territoriales en Europe et développement de modules de formation approfondis.",
      actions: [
        "Ouverture d'antennes locales actives dans d'autres villes de France et de la diaspora européenne.",
        "Déploiement de formations internes et élaboration de livrets d'accueil thématiques.",
        "Initialisation d'actions sociales concrètes ciblées (aide à l'insertion, soutien matériel public).",
        "Consolidation de la production audiovisuelle (fiches pratiques, podcasts de droit).",
        "Mai 2027 : Organisation des 2èmes Journées Xam Yoonu Reew Mi en France."
      ],
      metrics: {
        members: "150 membres actifs",
        antennes: "2 Antennes (France et Europe)",
        productions: "15 productions pédagogiques"
      }
    },
    {
      year: "2028",
      title: "Rayonnement et Ancrage Sénégal",
      tagline: "Déploiement terrain et éducation civique",
      focus: "Ouverture d'antennes physiques au Sénégal, sensibilisation en milieu scolaire et grand rassemblement.",
      actions: [
        "Implantation d'antennes régionales au Sénégal (Dakar, Saint-Louis, Thiès, etc.).",
        "Lancement du programme national « Éducation à la citoyenneté » dans les écoles publiques.",
        "Campagnes locales de vulgarisation juridique en langues nationales directement sur le terrain.",
        "Édition et distribution de guides simplifiés traduits aux populations isolées.",
        "Mai 2028 : Organisation des 3èmes Journées Xam Yoonu Reew Mi de préférence au Sénégal."
      ],
      metrics: {
        members: "200 membres actifs",
        antennes: "4 Antennes (2 en Diaspora, 2 au Sénégal)",
        productions: "Campagnes locales généralisées"
      }
    }
  ];

  return (
    <div className="space-y-20 py-8 md:py-16 max-w-5xl mx-auto px-4 md:px-6 animate-fadeIn">
      
      {/* 1. Header principal */}
      <div className="space-y-4 text-center">
        <Badge variant="default" className="font-extrabold uppercase tracking-widest px-4 py-1 text-[11px] bg-xyrm-green-deep text-white border-none">
          Présentation Officielle
        </Badge>
        <h1 className="text-4xl font-black text-xyrm-slate-900 md:text-6xl tracking-tight leading-none">
          Xam Yoonu Reew Mi
        </h1>
        <p className="text-sm md:text-base text-xyrm-slate-500 font-light max-w-3xl mx-auto leading-relaxed">
          Une université populaire, citoyenne et solidaire dédiée à la vulgarisation des sciences juridiques, des institutions publiques et de l&apos;action solidaire.
        </p>
      </div>

      {/* 2. Origine & Identité Éthique */}
      <section className="grid gap-8 md:grid-cols-12 items-stretch">
        <div className="md:col-span-7 bg-gradient-to-br from-xyrm-green-deep to-xyrm-green-primary rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-xyrm-green-light/20">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-xyrm-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6">
            <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold text-xyrm-gold uppercase tracking-wider">
              Wolof : Connaître le Droit du Pays
            </div>
            
            <h2 className="text-2xl font-black md:text-3.5xl tracking-tight leading-tight">
              « Connaître la voie de la République »
            </h2>
            
            <p className="text-sm md:text-base leading-relaxed text-white/90 font-light">
              L&apos;expression <strong>« Xam Yoonu Reew Mi »</strong> incarne le devoir républicain et civique. Notre vocation est d&apos;apporter la connaissance juridique et la compréhension des rouages de l&apos;État à chaque citoyen, en mobilisant les langues nationales sénégalaises (wolof, sérère, diola, pulaar, mandingue, soninké) autant que le français, l&apos;anglais ou l&apos;arabe.
            </p>
            
            <p className="text-sm leading-relaxed text-white/80 font-light italic border-l-2 border-xyrm-gold pl-4">
              Fondée le 18 octobre 2025 à l&apos;Université Toulouse Capitole, l&apos;association est à but non lucratif et régie par la loi du 1er juillet 1901.
            </p>
          </div>
        </div>

        <div className="md:col-span-5 bg-white border border-xyrm-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-xyrm-gold/10 text-xyrm-gold-dark">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-black text-xyrm-slate-900 tracking-tight">
              Indépendance et Charte Éthique
            </h3>
            <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
              L&apos;association affirme son indépendance absolue à l&apos;égard de toute obédience politique ou religieuse. Elle offre un cadre neutre et inclusif qui respecte les convictions de chacun, en s&apos;inspirant des valeurs morales universelles et des traditions de solidarité de la société sénégalaise.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Les Trois Piliers Fondamentaux */}
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3.5xl font-black text-xyrm-slate-900 tracking-tight">
            Les Trois Piliers de l&apos;UPCS
          </h2>
          <p className="text-xs md:text-sm text-xyrm-slate-500 font-light">
            Notre champ d&apos;action repose sur trois axes stratégiques indissociables.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, idx) => (
            <Card key={idx} className="hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-xyrm-green-deep/5 text-xyrm-green-primary">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-extrabold text-xyrm-slate-900 leading-snug">
                  {pillar.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Lien vers la Gouvernance et Commissions */}
      <section className="bg-xyrm-slate-50 border border-xyrm-slate-200/60 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2.5 max-w-2xl text-left">
          <Badge variant="envoyee">ORGANISATION INTERNE</Badge>
          <h2 className="text-xl md:text-2.5xl font-black text-xyrm-slate-900 tracking-tight">
            Gouvernance et Commissions de l&apos;Association
          </h2>
          <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
            Pour assurer son indépendance absolue et son efficacité opérationnelle, l&apos;association s&apos;appuie sur une structure claire : un Bureau exécutif, un Conseil consultatif d&apos;experts indépendants et 4 commissions techniques de travail.
          </p>
        </div>
        <Link
          href="/gouvernance"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary px-6 text-xs font-bold text-white shadow-md transition-all shrink-0 group hover:translate-x-0.5"
        >
          <span>Découvrir la Gouvernance</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* 5. Feuille de Route Triennale (2026-2028) */}
      <section className="space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3.5xl font-black text-xyrm-slate-900 tracking-tight">
            Feuille de Route Triennale (2026-2028)
          </h2>
          <p className="text-xs md:text-sm text-xyrm-slate-500 font-light">
            Découvrez nos grandes phases de croissance stratégique approuvées par le Bureau le 17 janvier 2026.
          </p>
        </div>

        {/* Timeline Switcher Header */}
        <div className="flex justify-center border-b border-xyrm-slate-200 max-w-lg mx-auto">
          {roadmap.map((phase) => (
            <button
              key={phase.year}
              onClick={() => setSelectedYear(phase.year)}
              className={`flex-1 text-center py-4 font-black text-sm tracking-widest relative transition-all ${
                selectedYear === phase.year
                  ? "text-xyrm-green-deep"
                  : "text-xyrm-slate-400 hover:text-xyrm-slate-600"
              }`}
            >
              {phase.year}
              {selectedYear === phase.year && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-xyrm-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Timeline Content */}
        {roadmap.map((phase) => {
          if (phase.year !== selectedYear) return null;
          return (
            <div
              key={phase.year}
              className="grid md:grid-cols-12 gap-8 items-start bg-white border border-xyrm-slate-200 rounded-3xl p-6 md:p-10 shadow-sm animate-fadeIn"
            >
              <div className="md:col-span-8 space-y-6">
                <div className="space-y-2">
                  <Badge variant="envoyee" className="font-extrabold uppercase text-[10px]">
                    {phase.title}
                  </Badge>
                  <h3 className="text-2xl font-black text-xyrm-slate-900 leading-snug">
                    {phase.tagline}
                  </h3>
                  <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
                    {phase.focus}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-extrabold text-xyrm-gold-dark tracking-wider">
                    Actions clés prévues :
                  </h4>
                  <ul className="space-y-2.5">
                    {phase.actions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-xyrm-slate-700 font-light">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-xyrm-green-deep/5 text-xyrm-green-primary text-xxs font-extrabold mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Colonne latérale indicateurs */}
              <div className="md:col-span-4 bg-xyrm-slate-50 rounded-2xl p-6 border border-xyrm-slate-100 space-y-4">
                <h4 className="text-xs uppercase font-extrabold text-xyrm-slate-400 tracking-wider">
                  Objectifs de fin d&apos;exercice :
                </h4>
                
                <div className="space-y-4">
                  <div className="p-3 bg-white rounded-xl border border-xyrm-slate-200">
                    <span className="block text-xxs uppercase tracking-wider font-extrabold text-xyrm-slate-400">Membres</span>
                    <span className="text-sm font-black text-xyrm-green-deep">{phase.metrics.members}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-xyrm-slate-200">
                    <span className="block text-xxs uppercase tracking-wider font-extrabold text-xyrm-slate-400">Antennes</span>
                    <span className="text-sm font-black text-xyrm-green-deep">{phase.metrics.antennes}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-xyrm-slate-200">
                    <span className="block text-xxs uppercase tracking-wider font-extrabold text-xyrm-slate-400">Livrables</span>
                    <span className="text-sm font-black text-xyrm-green-deep">{phase.metrics.productions}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 6. Adhésion */}
      <section className="bg-xyrm-slate-50 border border-xyrm-slate-200/60 rounded-3xl p-8 md:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <Badge className="bg-xyrm-green-deep text-white border-none text-[9px] uppercase font-bold tracking-widest px-3 py-1">
            Adhésion et Solidarité
          </Badge>
          <h2 className="text-2.5xl md:text-4xl font-black tracking-tight text-xyrm-slate-900">
            Rejoindre l&apos;Université Populaire
          </h2>
          <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
            L&apos;adhésion est ouverte à toute personne adhérant à nos principes éthiques et souhaitant s&apos;investir ou se former. La cotisation standard contribue au financement des matériels de diffusion, au site internet, et aux actions sociales sur le terrain.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary px-8 text-xs font-bold text-white shadow-md transition-all hover:translate-y-[-1px]"
          >
            Formulaire d&apos;Adhésion
          </Link>
        </div>
      </section>
    </div>
  );
}
