export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  category: "institutionnel" | "reglement" | "rapport" | "communique";
  fileSize: string;
  fileFormat: string;
  publishedDate: string;
  fileUrl?: string;
}

export const mockDocuments: DocumentItem[] = [
  {
    id: "doc-001",
    title: "Statuts Officiels de l'Association",
    description: "Les statuts constitutifs fixant l'objet, la structure d'organisation et le fonctionnement général de l'association Xam Yoonu Reew Mi.",
    category: "institutionnel",
    fileSize: "1.2 Mo",
    fileFormat: "PDF",
    publishedDate: "12/03/2026",
    fileUrl: "/docs/statuts.pdf"
  },
  {
    id: "doc-002",
    title: "Règlement Intérieur",
    description: "Document détaillant les règles pratiques de vie interne, les modalités de cotisation et le fonctionnement des pôles d'activité.",
    category: "reglement",
    fileSize: "850 Ko",
    fileFormat: "PDF",
    publishedDate: "15/03/2026",
    fileUrl: "/docs/reglement.pdf"
  },
  {
    id: "doc-003",
    title: "Feuille de Route Triennale (2026-2029)",
    description: "Nos objectifs et notre plan de déploiement pour l'Université Populaire Citoyenne et Solidaire (UPCS) sur les trois prochaines années.",
    category: "institutionnel",
    fileSize: "2.4 Mo",
    fileFormat: "PDF",
    publishedDate: "20/04/2026"
  },
  {
    id: "doc-004",
    title: "Communiqué Important : Lancement de l'UPCS",
    description: "Communiqué de presse officiel détaillant les objectifs pédagogiques, le calendrier des premiers ateliers et l'appel aux intervenants.",
    category: "communique",
    fileSize: "320 Ko",
    fileFormat: "PDF",
    publishedDate: "10/05/2026"
  },
  {
    id: "doc-005",
    title: "Feuille de route",
    description: "Bilan moral et financier de l'exercice 2025, récapitulatif des premiers ateliers pilotes et des actions de solidarité.",
    category: "rapport",
    fileSize: "3.1 Mo",
    fileFormat: "PDF",
    publishedDate: "15/01/2026",
    fileUrl: "/docs/fdrtriennale.pdf"
  },
  {
    id: "doc-006",
    title: "Charte Fondatrice et Documents Institutionnels",
    description: "La charte d'éthique définissant les valeurs de vivre-ensemble, de rigueur et de laïcité qui guident nos formations et débats.",
    category: "institutionnel",
    fileSize: "950 Ko",
    fileFormat: "PDF",
    publishedDate: "05/03/2026",
    fileUrl: "/docs/charte.pdf"
  }
];
