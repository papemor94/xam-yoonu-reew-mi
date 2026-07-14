import JourneeDetailClient from "@/components/journees/JourneeDetailClient";
import { getJourneeBySlugServer, getJourneesServer } from "@/lib/db-server";

interface JourneeDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const journees = await getJourneesServer();
  return journees.map((item) => ({
    slug: item.slug,
  }));
}

export default async function JourneeDetailPage({ params }: JourneeDetailPageProps) {
  const journee = await getJourneeBySlugServer(params.slug);

  return (
    <JourneeDetailClient 
      initialJournee={journee} 
      slug={params.slug} 
    />
  );
}
