import { fetcher } from "../api";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
}

export const blogService = {
  getAll: async (): Promise<Blog[]> => {
    return fetcher<Blog[]>("/blogs", {
      next: { revalidate: 60 * 5, tags: ["blogs"] },
    });
  },

  getBySlug: async (slug: string): Promise<Blog> => {
    return fetcher<Blog>(`/blogs/${slug}`, {
      next: { revalidate: 60 * 10, tags: [`blog-${slug}`] },
    });
  },
};
