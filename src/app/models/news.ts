export interface NewsItem {
    id: number;
    title: string;
    slug: string;
    date: string;
    content: string;
    image: {
      id: number;
      fileName: string;
      contentType: string;
      url: string;
      filePath: string;
    };
  }