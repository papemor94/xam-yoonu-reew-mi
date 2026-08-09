export const dynamic = "force-dynamic";

import RessourcesClient from "@/components/ressources/RessourcesClient";
import { getDocumentsServer } from "@/lib/db-server";

export const metadata = {
  title: "Articles — Xam Yoonu Reew Mi",
  description: "Accédez à nos publications d'éducation populaire, synthèses de politiques publiques et ressources juridiques.",
};

export default async function RessourcesPage() {
  const documents = await getDocumentsServer();

  return (
    <RessourcesClient initialDocuments={documents} />
  );
}
