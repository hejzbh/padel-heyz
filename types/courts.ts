export type CourtType = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  featured: boolean;
  image: string;
  moreInfo: string;
  lat: number;
  lon: number;
};

export type CourtFormDataType = {
  title: string;
  description?: string;
  image?: string;
  moreInfo: string;
  featured?: boolean;
  lat: number;
  lon: number;
};
