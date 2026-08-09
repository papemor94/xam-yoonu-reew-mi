export const dynamic = "force-dynamic";

import { Metadata } from "next";
import JourneeDetailClient from "@/components/journees/JourneeDetailClient";
import { getJourneeBySlugServer, getJourneesServer } from "@/lib/db-server";
import { getGoogleDriveImageUrl } from "@/lib/utils";

interface JourneeDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: JourneeDetailPageProps): Promise<Metadata> {
  const journee = await getJourneeBySlugServer(params.slug);
  if (!journee) return {};

  const imageUrl = journee.youtubeId
    ? `https://img.youtube.com/vi/${journee.youtubeId}/maxresdefault.jpg`
    : journee.drivePhotoId
    ? getGoogleDriveImageUrl(journee.drivePhotoId)
    : "https://xam-yoonu-reew-mi.org/logo.png";

  return {
    title: `${journee.title} — Xam Yoonu Réew Mi`,
    description: journee.summary || "Découvrez notre journée thématique sur Xam Yoonu Réew Mi.",
    openGraph: {
      title: journee.title,
      description: journee.summary || "Découvrez notre journée thématique sur Xam Yoonu Réew Mi.",
      type: "website",
      url: `https://xam-yoonu-reew-mi.org/journees/${journee.slug}`,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: journee.title,
      description: journee.summary || "Découvrez notre journée thématique sur Xam Yoonu Réew Mi.",
      images: [imageUrl],
    }
  };
}

export async function generateStaticParams() {
  const journees = await getJourneesServer();
  return journees.map((item) => ({
    slug: item.slug,
  }));
}

function parseDateToIso(dateStr: string): string {
  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) {
    return `${match[3]}-${match[2]}-${match[1]}T09:00:00Z`;
  }
  return dateStr;
}

export default async function JourneeDetailPage({ params }: JourneeDetailPageProps) {
  const journee = await getJourneeBySlugServer(params.slug);

  const jsonLd = journee ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": journee.title,
    "startDate": parseDateToIso(journee.date),
    "location": {
      "@type": "Place",
      "name": journee.location,
      "address": journee.locationDetails || ""
    },
    "description": journee.summary || ""
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <JourneeDetailClient 
        initialJournee={journee} 
        slug={params.slug} 
      />
    </>
  );
}
