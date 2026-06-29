"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, HelpCircle, ArrowRight, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
  category: "asso" | "adh" | "upcs" | "gouv";
}

const categories = [
  { label: "Toutes les questions", value: "all" },
  { label: "L'Association", value: "asso" },
  { label: "Adhésion & Bénévolat", value: "adh" },
  { label: "Université Populaire (UPCS)", value: "upcs" },
  { label: "Gouvernance & Éthique", value: "gouv" },
] as const;

const faqData: FAQItem[] = [
  {
    category: "asso",
    question: "Qu'est-ce que Xam Yoonu Reew Mi (XYRM) ?",
    answer: "XYRM est une association d'éducation populaire citoyenne et solidaire créée en octobre 2025. Notre nom en wolof signifie « Connaître le droit de son pays » ou « Connaître la voie de la République ». Notre mission est de vulgariser le droit constitutionnel et les sciences utiles, d'expliquer les politiques publiques et d'agir pour la solidarité active sur le terrain."
  },
  {
    category: "asso",
    question: "Comment l'association garantit-elle son indépendance ?",
    answer: "Nous sommes une structure apolitique, laïque et non confessionnelle. XYRM refuse tout financement lié à des partis politiques ou des mouvements religieux, et toutes nos actions sont guidées par la neutralité et le désintéressement. Un Conseil Consultatif indépendant de 12 experts veille au respect strict de cette charte éthique."
  },
  {
    category: "adh",
    question: "Comment adhérer à l'association et à quel tarif ?",
    answer: "L'adhésion est ouverte à toute personne partageant nos principes éthiques et souhaitant s'investir ou se former. La cotisation annuelle de base est de 60 € (soit 5 € par mois). Ces fonds servent directement à financer nos matériels de diffusion, la maintenance de nos outils en ligne et nos actions de solidarité sur le terrain."
  },
  {
    category: "adh",
    question: "Est-il possible d'être dispensé de cotisation ?",
    answer: "Oui, absolument. Le règlement intérieur prévoit une exonération totale de cotisation pour toute personne s'engageant activement dans des activités bénévoles régulières (rédaction de contenus, traduction de textes juridiques en langues nationales, montage vidéo, logistique d'événements, etc.)."
  },
  {
    category: "upcs",
    question: "Qu'est-ce que l'Université Populaire Citoyenne et Solidaire (UPCS) ?",
    answer: "L'UPCS est l'organe d'éducation populaire de XYRM. Elle propose des ateliers, des conférences publiques et des contenus vidéo (vulgarisation) gratuits visant à rendre le droit et le fonctionnement des institutions compréhensibles par tous, pour renforcer le civisme et l'engagement démocratique."
  },
  {
    category: "upcs",
    question: "Les formations et ateliers sont-ils payants ?",
    answer: "Non, tous nos contenus de vulgarisation, ateliers d'éducation populaire et conférences citoyennes sont entièrement gratuits et ouverts à tous, sans distinction de niveau d'études ou de profil."
  },
  {
    category: "gouv",
    question: "Qui dirige l'association ?",
    answer: "L'association est gérée par un Bureau Exécutif constitutif élu pour un mandat renouvelable. Le bureau fondateur est présidé par Alassane Dia, secondé par Amadou Sow Ndiaye en tant que Secrétaire Général. La gestion opérationnelle et technique est animée par les pôles thématiques (Droit, Communication, Action Sociale, Organisation)."
  },
  {
    category: "gouv",
    question: "Comment le Conseil Consultatif est-il composé ?",
    answer: "Le Conseil Consultatif est composé de 12 experts indépendants choisis pour leurs compétences (juristes, économistes, éducateurs). Six membres sont nommés par le Bureau Exécutif, et six autres membres sont élus par l'Assemblée Générale. Son but est d'apporter un soutien éthique et d'éviter tout dérapage partisan."
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "asso" | "adh" | "upcs" | "gouv">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaq = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  interface CommunityQuestion {
    id: string;
    author: string;
    date: string;
    question: string;
    answer?: string;
  }

  const [communityQuestions, setCommunityQuestions] = useState<CommunityQuestion[]>([
    {
      id: "q-1",
      author: "Modou Fall",
      date: "Hier à 14:32",
      question: "Est-ce qu'il y aura des sessions de formation en dehors de Toulouse, par exemple à Paris ou Dakar ?",
      answer: "Bonjour Modou ! Oui, d'après notre feuille de route triennale 2027-2028, nous prévoyons de déployer des antennes physiques en Europe et d'ouvrir deux antennes opérationnelles au Sénégal pour mener des ateliers décentralisés."
    },
    {
      id: "q-2",
      author: "Fatou Ndiaye",
      date: "Le 28/06/2026 à 10:15",
      question: "Puis-je participer à la traduction des fiches juridiques si je ne suis pas juriste ?",
      answer: "Bonjour Fatou, tout à fait ! Les compétences en wolof, sérère, ou pulaar sont extrêmement précieuses pour traduire fidèlement les concepts vulgarisés. Vous pouvez rejoindre la commission de vulgarisation sans formation juridique préalable."
    }
  ]);

  const [newQuestionName, setNewQuestionName] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionName.trim() || !newQuestionText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newQ: CommunityQuestion = {
        id: `q-${Date.now()}`,
        author: newQuestionName,
        date: "À l'instant",
        question: newQuestionText,
        answer: "Merci pour votre question ! Notre équipe va l'étudier et y répondre dans les plus brefs délais."
      };
      setCommunityQuestions([newQ, ...communityQuestions]);
      setNewQuestionName("");
      setNewQuestionText("");
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1000);
  };

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-16 py-8 md:py-16 max-w-4xl mx-auto px-4 md:px-6 animate-fadeIn">
      
      {/* 1. Header principal */}
      <div className="space-y-4 text-center">
        <Badge variant="default" className="font-extrabold uppercase tracking-widest px-4 py-1 text-[11px] bg-xyrm-green-deep text-white border-none">
          Foire Aux Questions
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-xyrm-slate-900 leading-tight">
          Des réponses à vos questions
        </h1>
        <p className="text-xs md:text-base text-xyrm-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
          Retrouvez ici toutes les informations utiles sur le fonctionnement de l&apos;association, l&apos;adhésion, nos activités et notre charte éthique.
        </p>
      </div>

      {/* 2. Barre de recherche et Filtres */}
      <div className="space-y-6">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-xyrm-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une question ou un mot-clé..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-xyrm-slate-200 bg-white text-sm text-xyrm-slate-800 placeholder-xyrm-slate-400 shadow-sm focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary transition-all"
          />
        </div>

        {/* Catégories de filtres */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value as typeof activeCategory);
                setOpenIndex(null);
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all border",
                activeCategory === cat.value
                  ? "bg-xyrm-green-deep text-white border-xyrm-green-deep shadow-sm"
                  : "bg-white border-xyrm-slate-200 text-xyrm-slate-700 hover:bg-xyrm-slate-50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Liste des Questions/Réponses */}
      <div className="space-y-4">
        {filteredFaq.length > 0 ? (
          filteredFaq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-xyrm-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:border-xyrm-green-primary/30 transition-colors"
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="font-extrabold text-sm md:text-base text-xyrm-slate-900 pr-4">
                    {item.question}
                  </span>
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg bg-xyrm-slate-50 border border-xyrm-slate-100 text-xyrm-slate-500 transition-all shrink-0",
                    isOpen && "bg-xyrm-green-deep text-white border-xyrm-green-deep rotate-180"
                  )}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-250 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 pt-0 border-t border-xyrm-slate-50 text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-xyrm-slate-200/80 shadow-xs space-y-3">
            <HelpCircle className="h-10 w-10 text-xyrm-slate-350 mx-auto" />
            <p className="text-sm font-semibold text-xyrm-slate-700">Aucun résultat trouvé</p>
            <p className="text-xs text-xyrm-slate-400 max-w-sm mx-auto">Essayer de modifier vos mots-clés ou de changer de catégorie de recherche.</p>
          </div>
        )}
      </div>

      {/* 4. Espace d'Échange & Questions Communautaires (Nouveau) */}
      <div className="border-t border-xyrm-slate-200 pt-16 space-y-12">
        <div className="space-y-4 text-center">
          <Badge variant="default" className="font-extrabold uppercase tracking-widest px-4 py-1 text-[11px] bg-xyrm-gold text-xyrm-slate-900 border-none">
            Espace de Discussion
          </Badge>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-xyrm-slate-900 leading-tight">
            Questions de la Communauté
          </h2>
          <p className="text-xs md:text-sm text-xyrm-slate-500 font-light max-w-xl mx-auto">
            Posez votre question ci-dessous de manière publique. Notre équipe ou les membres actifs y répondront directement.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5 items-start">
          {/* Formulaire de question (2/5ème de la grille) */}
          <div className="md:col-span-2 bg-white border border-xyrm-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-extrabold text-xyrm-slate-900 uppercase tracking-wider">
              Poser une Question
            </h3>
            
            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-xyrm-slate-500 uppercase tracking-wider">
                  Votre Nom / Pseudonyme <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex. Amadou"
                  value={newQuestionName}
                  onChange={(e) => setNewQuestionName(e.target.value)}
                  className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2.5 text-xs text-xyrm-slate-800 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-xyrm-slate-500 uppercase tracking-wider">
                  Votre Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Écrivez votre question ici..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full rounded-xl border border-xyrm-slate-200 bg-white px-3.5 py-2.5 text-xs text-xyrm-slate-800 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex h-10 items-center justify-center rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary text-xs font-bold text-white shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Envoi..." : "Publier la Question"}
              </button>
            </form>

            {submitSuccess && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-center">
                <p className="text-[11px] font-bold text-emerald-800">
                  Votre question a été ajoutée avec succès ci-dessous !
                </p>
              </div>
            )}
          </div>

          {/* Liste des questions (3/5ème de la grille) */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-sm font-extrabold text-xyrm-slate-900 uppercase tracking-wider pb-2 border-b border-xyrm-slate-100">
              Discussions Récentes ({communityQuestions.length})
            </h3>

            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-1">
              {communityQuestions.map((q) => (
                <div key={q.id} className="space-y-3.5 animate-fadeIn">
                  {/* Bulle Question de l'utilisateur */}
                  <div className="flex gap-3 items-start">
                    <div className="h-8 w-8 rounded-full bg-xyrm-slate-100 border border-xyrm-slate-200/50 flex items-center justify-center shrink-0">
                      <span className="text-xs font-black text-xyrm-slate-650 uppercase">
                        {q.author.slice(0, 2)}
                      </span>
                    </div>
                    <div className="bg-xyrm-slate-50 border border-xyrm-slate-200/40 rounded-2xl rounded-tl-none p-4 max-w-[90%] space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-xyrm-slate-900">{q.author}</span>
                        <span className="text-[10px] text-xyrm-slate-400 font-light">{q.date}</span>
                      </div>
                      <p className="text-xs md:text-sm text-xyrm-slate-700 leading-relaxed font-light">
                        {q.question}
                      </p>
                    </div>
                  </div>

                  {/* Réponse de l'équipe (si présente) */}
                  {q.answer && (
                    <div className="flex gap-3 items-start justify-end pl-8">
                      <div className="bg-xyrm-green-deep/5 border border-xyrm-green-primary/20 border-l-2 border-l-xyrm-green-primary rounded-2xl rounded-tr-none p-4 max-w-[90%] space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-xyrm-green-deep">Équipe Xam Yoonu Reew Mi</span>
                          <span className="rounded-full bg-xyrm-gold/15 text-xyrm-gold text-[9px] font-black px-1.5 py-0.5 tracking-wider uppercase shrink-0">
                            Modérateur
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-xyrm-slate-700 leading-relaxed font-light">
                          {q.answer}
                        </p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-xyrm-green-deep flex items-center justify-center shrink-0 shadow-sm border border-xyrm-green-primary/10">
                        <span className="text-[9px] font-black text-white">XYRM</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. CTA Block Aide supplémentaire */}
      <div className="bg-xyrm-slate-50 border border-xyrm-slate-200/60 rounded-3xl p-8 md:p-10 text-center space-y-6 max-w-3xl mx-auto">
        <div className="space-y-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-xyrm-green-deep/5 text-xyrm-green-primary">
            <MessageSquare className="h-5.5 w-5.5" />
          </div>
          <h3 className="text-lg md:text-xl font-black text-xyrm-slate-900">
            Besoin d&apos;un échange privé ?
          </h3>
          <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed max-w-lg mx-auto">
            Si votre demande nécessite de partager des données personnelles ou d&apos;aborder un sujet confidentiel, veuillez nous envoyer un message direct.
          </p>
        </div>
        <div className="pt-1">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary px-6 text-xs font-bold text-white shadow-md transition-all hover:translate-y-[-1px]"
          >
            Nous Contacter
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
