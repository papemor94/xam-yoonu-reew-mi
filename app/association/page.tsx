import { ShieldCheck, Landmark, Users2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AssociationPage() {
  const values = [
    {
      title: "Rigueur Scientifique",
      description: "Toutes nos interventions et vulgarisations juridiques s'appuient sur des analyses rigoureuses des textes officiels.",
      icon: ShieldCheck,
    },
    {
      title: "Pédagogie Citoyenne",
      description: "Traduire des textes techniques dans un langage accessible à tous, y compris en langues locales.",
      icon: Landmark,
    },
    {
      title: "Solidarité Active",
      description: "Créer des ponts solides entre les compétences de la diaspora et les besoins des populations au Sénégal.",
      icon: Users2,
    },
  ];

  const team = [
    { name: "Pape Mor Diop", role: "Coordonnateur Général" },
    { name: "Mariama Sy", role: "Responsable Pôle Éducation Civique" },
    { name: "Dr. Ousmane Sembène", role: "Conseiller Scientifique (Droit Public)" },
    { name: "Fatoumata Sall", role: "Secrétaire aux Solidarités & Diaspora" },
  ];

  return (
    <div className="space-y-16 py-8 md:py-12 animate-fadeIn max-w-5xl mx-auto">
      
      {/* 1. Page Header */}
      <div className="space-y-4 text-center">
        <Badge variant="default" className="font-bold">DÉCOUVRIR</Badge>
        <h1 className="text-3xl font-black text-xyrm-slate-900 md:text-5xl tracking-tight">
          L&apos;Association Xam Yoonu Reew Mi
        </h1>
        <p className="text-sm md:text-base text-xyrm-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
          Une initiative citoyenne dédiée à l&apos;éducation populaire et au partage des savoirs pour un développement harmonieux et solidaire.
        </p>
      </div>

      {/* 2. Brand Identity Concept (Cinematic Banner) */}
      <div className="rounded-3xl bg-gradient-to-r from-xyrm-green-deep to-xyrm-green-primary p-8 md:p-10 text-white shadow-xl border border-xyrm-green-light/20 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-48 h-48 bg-xyrm-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-6 relative max-w-3xl">
          <h2 className="text-xl font-black md:text-2xl text-xyrm-gold uppercase tracking-wider">
            Université Populaire Citoyenne et Solidaire (UPCS)
          </h2>
          <p className="text-sm leading-relaxed text-white/95 font-light">
            L&apos;UPCS est notre principal vecteur d&apos;action. Contrairement aux universités académiques classiques, elle est ouverte à tous sans condition de diplôme ou d&apos;âge. 
            C&apos;est un espace de co-construction du savoir où se mêlent théorie juridique, débats d&apos;idées et accompagnement solidaire.
          </p>
          <p className="text-sm leading-relaxed text-white/95 font-light">
            Notre crédo est de <strong>vulgariser</strong> les sciences sociales, administratives et juridiques pour permettre à chaque citoyen d&apos;exercer pleinement ses devoirs et de revendiquer ses droits de manière constructive.
          </p>
        </div>
      </div>

      {/* 3. Our Values Grid */}
      <div className="space-y-8">
        <h3 className="text-2xl font-black text-xyrm-slate-900 text-center tracking-tight">
          Nos Valeurs Cardinales
        </h3>
        
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((val) => (
            <Card key={val.title} className="hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="space-y-3 pb-2">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-xyrm-green-deep/5 text-xyrm-green-primary">
                  <val.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-bold text-xyrm-slate-900">
                  {val.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs md:text-sm text-xyrm-slate-500 font-light leading-relaxed">
                  {val.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. Organigramme / Team List */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-black text-xyrm-slate-900 tracking-tight">
            Notre Équipe Dirigeante
          </h3>
          <p className="text-xs text-xyrm-slate-500 font-light">
            Les membres engagés au sein du bureau exécutif de l&apos;association.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {team.map((member) => (
            <Card key={member.name} className="p-5 text-center bg-xyrm-slate-50/50 hover:bg-white transition-all duration-300">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-xyrm-green-deep text-white font-black text-sm mb-4 ring-2 ring-xyrm-gold/20">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <p className="text-sm font-black text-xyrm-slate-900 truncate">
                {member.name}
              </p>
              <p className="text-xxs font-bold uppercase tracking-wider text-xyrm-gold-dark mt-1">
                {member.role}
              </p>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
