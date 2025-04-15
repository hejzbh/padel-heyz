export type BlogType = {
  id: number;
  created_at: string;
  title: string;
  thumbnail?: string;
  shortDescription: string;
  richTextContent: JSON;
};

export type BlogFormDataType = {
  title: string;
  shortDescription: string;
  richTextContent: JSON;
  thumbnail: string;
};
