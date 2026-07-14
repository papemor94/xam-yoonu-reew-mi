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

export const mockDocuments: DocumentItem[] = [];
