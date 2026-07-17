export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  category: "juridique" | "politique" | "institutionnel" | "reglement" | "rapport" | "communique";
  fileSize: string;
  fileFormat: string;
  publishedDate: string;
  fileUrl?: string;
  author?: string;
  driveId?: string;
}

export const mockDocuments: DocumentItem[] = [];
