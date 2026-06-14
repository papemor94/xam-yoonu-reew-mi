import { mockJournees } from "@/data/mock/journees";
import JourneeDetailClient from "@/components/journees/JourneeDetailClient";

interface JourneeDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return mockJournees.map((item) => ({
    slug: item.slug,
  }));
}

export default function JourneeDetailPage({ params }: JourneeDetailPageProps) {
  const journee = mockJournees.find((item) => item.slug === params.slug);

  return (
    <JourneeDetailClient 
      initialJournee={journee || {
        id: "",
        slug: params.slug,
        title: "Chargement...",
        subtitle: "Chargement...",
        summary: "Chargement du compte-rendu...",
        description: "<p>Chargement du contenu...</p>",
        date: "",
        location: "",
        locationDetails: "",
        timeline: [],
        galleryPlaceholders: []
      }} 
      slug={params.slug} 
    />
  );
}
