export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "actualite" | "analyse" | "initiative" | "formation";
  tags: string[];
  coverUrl?: string; // We can use generate_image or a nice styled placeholder/SVG
  authorName: string;
  publishedAt: string;
  youtubeId?: string;
  drivePhotoId?: string;
  isFeatured?: boolean;
}

export const mockArticles: Article[] = [
  {
    id: "art-001",
    slug: "diaspora-et-education-bilan-toulouse",
    title: "Diaspora et éducation : Bilan de la 1ère édition du Forum Participatif",
    excerpt: "Retour sur les échanges riches de notre première journée thématique tenue à Toulouse autour de l'éducation des enfants dans la diaspora.",
    isFeatured: true,
    content: `
      <p>La première édition du Forum Participatif de <strong>Xam Yoonu Reew Mi</strong> s'est tenue avec succès à Toulouse, réunissant des dizaines de participants autour d'une question cruciale : <em>« L’éducation des enfants dans la diaspora : comment préserver les valeurs familiales ? »</em>.</p>
      
      <p>Durant cette journée d'échanges, parents, éducateurs et chercheurs ont partagé leurs expériences et identifié des pistes d'action concrètes. Les discussions ont mis en lumière la nécessité de créer des ponts culturels et linguistiques pour permettre aux jeunes de s'épanouir harmonieusement dans leur double culture.</p>
      
      <h3>Les points clés abordés :</h3>
      <ul>
        <li><strong>Transmission linguistique :</strong> L'apprentissage des langues nationales comme pilier identitaire et vecteur de connexion avec la famille d'origine.</li>
        <li><strong>Dialogue intergénérationnel :</strong> Co-construire des espaces d'expression au sein des foyers pour surmonter les décalages culturels entre parents et enfants.</li>
        <li><strong>Soutien communautaire :</strong> Structurer des réseaux d'entraide pour accompagner les familles monoparentales ou en situation d'isolement.</li>
      </ul>
      
      <p>L'association remercie chaleureusement l'ensemble des intervenants et participants pour leur contribution active à la réussite de cet événement fondateur.</p>
    `,
    category: "initiative",
    tags: ["Diaspora", "Éducation", "Forum", "Toulouse"],
    authorName: "Comité d'Organisation",
    publishedAt: "25/05/2026",
    youtubeId: "VVnuJuLrpOQ"
  },
  {
    id: "art-002",
    slug: "lancement-officiel-upcs-senegal",
    title: "Lancement officiel de l'Université Populaire Citoyenne et Solidaire",
    excerpt: "Découvrez notre projet majeur de vulgarisation du droit et des sciences utiles au service du développement citoyen et de la cohésion sociale.",
    content: `
      <p>L'association <strong>Xam Yoonu Reew Mi</strong> est fière d'annoncer le lancement officiel de son initiative phare : l'<strong>Université Populaire Citoyenne et Solidaire (UPCS)</strong>.</p>
      
      <p>Conçue comme un espace d'apprentissage gratuit et ouvert à tous, l'UPCS a pour vocation de démocratiser le savoir académique et pratique. En mettant l'accent sur le droit, la gestion publique, l'économie solidaire et les sciences civiques, nous souhaitons donner à chaque citoyen les clés pour comprendre son environnement et agir de manière constructive.</p>
      
      <h3>Nos trois grands piliers :</h3>
      <ol>
        <li><strong>Vulgarisation juridique :</strong> Traduire et expliquer les textes de loi dans un langage accessible, notamment en langues nationales.</li>
        <li><strong>Débats et conférences :</strong> Organiser des forums d'échange libres et respectueux sur les grands enjeux de société.</li>
        <li><strong>Ateliers pratiques :</strong> Former les citoyens aux démarches administratives, à l'entrepreneuriat solidaire et au leadership associatif.</li>
      </ol>
      
      <p>Rejoignez-nous dans cette aventure intellectuelle et solidaire pour bâtir ensemble une citoyenneté active et éclairée.</p>
    `,
    category: "actualite",
    tags: ["UPCS", "Lancement", "Citoyennété", "Savoir"],
    authorName: "Bureau Exécutif",
    publishedAt: "10/05/2026",
    isFeatured: true
  },
  {
    id: "art-003",
    slug: "comprendre-ses-droits-civiques-guide",
    title: "Comprendre ses droits civiques au Sénégal : Guide pratique pour le citoyen",
    excerpt: "Un éclairage simple sur la Constitution, le fonctionnement des institutions et le rôle fondamental du citoyen dans le développement national.",
    content: `
      <p>Pour beaucoup de citoyens, le droit constitutionnel et le fonctionnement des institutions étatiques restent abstraits. C'est pourquoi le pôle Éducation Civique de <strong>Xam Yoonu Reew Mi</strong> publie ce guide d'introduction simplifié.</p>
      
      <p>La Constitution sénégalaise garantit des droits fondamentaux mais stipule également des devoirs. Ce guide explique de manière pédagogique comment ces principes régissent notre vivre-ensemble et comment chaque citoyen peut participer activement à la vie publique.</p>
      
      <h3>Ce que contient le guide :</h3>
      <p>Nous passons en revue le fonctionnement des trois pouvoirs (Exécutif, Législatif, Judiciaire), le rôle de l'Assemblée nationale, et les différents canaux de participation citoyenne au niveau local (communes, budgets participatifs).</p>
      
      <p>Ce document est téléchargeable gratuitement sur notre portail et fera l'objet d'ateliers de vulgarisation dans plusieurs régions du pays dans les mois à venir.</p>
    `,
    category: "analyse",
    tags: ["Droit", "Constitution", "Civisme", "Institutions"],
    authorName: "Pôle Juridique XYRM",
    publishedAt: "15/04/2026",
    isFeatured: true
  }
];
