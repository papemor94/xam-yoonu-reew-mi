export interface JourneeTimelineEvent {
  time: string;
  title: string;
  description: string;
}

export interface JourneeItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  date: string;
  location: string;
  locationDetails: string;
  youtubeId?: string;
  drivePhotoId?: string;
  timeline: JourneeTimelineEvent[];
  galleryPlaceholders: string[]; // Mocking image descriptions for visual rendering
}

export const mockJournees: JourneeItem[] = [
  {
    id: "jrn-001",
    slug: "forum-toulouse-2026",
    title: "1ère Édition du Forum Participatif de Toulouse",
    subtitle: "Journée Xam Yoonu Reew Mi",
    summary: "Une journée d'échanges d'une grande richesse intellectuelle autour de l'éducation des enfants dans la diaspora et la transmission des valeurs familiales.",
    description: `
      <p>Organisée le 23 Mai 2026 à Toulouse, la première édition du Forum Participatif de <strong>Xam Yoonu Reew Mi</strong> a mobilisé de nombreux membres de la communauté, universitaires et parents soucieux de réfléchir ensemble sur l'accompagnement éducatif.</p>
      <p>Les échanges ont permis de croiser les regards sur la parentalité en contexte migratoire, l'apprentissage des langues d'origine et la valorisation du double héritage culturel. Ce forum pose les jalons méthodologiques de nos prochains ateliers régionaux.</p>
    `,
    date: "23/05/2026",
    location: "Toulouse, France",
    locationDetails: "Le Petit Capitole, 153 avenue de Lardenne, 31100 Toulouse",
    youtubeId: "VVnuJuLrpOQ",
    timeline: [
      {
        time: "16h00",
        title: "Accueil et Enregistrement",
        description: "Installation des participants et distribution des livrets de présentation de l'Université Populaire."
      },
      {
        time: "16h30",
        title: "Mot d'Ouverture",
        description: "Allocution d'accueil par le coordonnateur général Pape Mor Diop sur les ambitions civiques de l'UPCS."
      },
      {
        time: "16h45",
        title: "Atelier Collaboratif : Transmission Linguistique",
        description: "Table ronde interactive sur l'importance de la langue maternelle comme pilier de construction identitaire chez les jeunes de la diaspora."
      },
      {
        time: "17h45",
        title: "Espace Networking et Solidarité",
        description: "Pause d'échanges informels, stands d'information juridiques et administratifs de l'association."
      },
      {
        time: "18h00",
        title: "Conférence Centrale : L'éducation face aux décalages culturels",
        description: "Exposé magistral et retour d'expérience par le Professeur Moussa Thioye, suivi d'une séance de questions-réponses animée."
      },
      {
        time: "19h30",
        title: "Synthèse des Recommandations",
        description: "Restitution des propositions clés formulées par les parents et mise en place d'un comité de suivi."
      },
      {
        time: "20h00",
        title: "Cocktail Fraternel",
        description: "Dîner-cocktail d'échanges multiculturels, musique d'ambiance sénégalaise et clôture de la journée."
      }
    ],
    galleryPlaceholders: [
      "Conférence inaugurale du Professeur Moussa Thioye",
      "Échanges collaboratifs lors de l'atelier transmission linguistique",
      "Le public attentif au Petit Capitole de Toulouse",
      "Cocktail et moments de partage en fin de journée"
    ]
  }
];
