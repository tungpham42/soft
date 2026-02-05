// types/blog.ts
export interface Rendered {
  rendered: string;
}

export interface Post {
  id: number;
  date: string;
  slug: string;
  title: Rendered;
  content: Rendered;
  excerpt: Rendered;
  // Added for embedded media support
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: {
        sizes?: {
          full?: { source_url: string };
          medium?: { source_url: string };
          large?: { source_url: string };
        };
      };
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        link: string;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
}

export interface Category {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}
