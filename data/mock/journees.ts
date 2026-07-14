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

export const mockJournees: JourneeItem[] = [];
