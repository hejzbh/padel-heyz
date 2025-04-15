export type CourtType = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  featured: boolean;
  image: string;
  moreInfo: string;
  location: {
    lat: string;
    lon: string;
  };
};

export type CourtFormDataType = {
  title: string;
  description?: string;
  image?: string;
  moreInfo: string;
  featured?: boolean;
  lat: string;
  lon: string;
};
