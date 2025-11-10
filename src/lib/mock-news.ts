// Mock data for news

export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  authorEmail: string;
  category: string;
  status: "published" | "draft" | "archived";
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  tags: string[];
}

export const mockNews: News[] = Array.from({ length: 25 }, (_, i) => ({
  id: `news-${i + 1}`,
  title: `News Article ${i + 1}: ${["Emergency Relief", "Education Support", "Medical Aid", "Food Distribution", "Shelter Construction"][i % 5]}`,
  content: `This is the content of news article ${i + 1}. It contains important information about ${["emergency relief efforts", "education support programs", "medical aid initiatives", "food distribution campaigns", "shelter construction projects"][i % 5]}. ${i + 1}`,
  author: `Author ${i + 1}`,
  authorEmail: `author${i + 1}@example.com`,
  category: ["Emergency", "Education", "Medical", "Food", "Shelter"][i % 5],
  status: i < 15 ? "published" : i < 20 ? "draft" : "archived",
  views: Math.floor(Math.random() * 1000) + 10,
  likes: Math.floor(Math.random() * 100) + 1,
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  imageUrl: `https://picsum.photos/800/400?random=${i + 1}`,
  tags: ["urgent", "help", "support"].slice(0, Math.floor(Math.random() * 3) + 1),
}));

