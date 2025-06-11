export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  date: string;
  content: string;
  imageUrl: string | null;
}