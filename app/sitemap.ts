// app/sitemap.ts
import { MetadataRoute } from "next";
import { getPosts } from "@/services/postService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.soft.io.vn";

  // Lấy 100 bài viết mới nhất để tạo sitemap
  // Lưu ý: Nếu blog quá lớn, bạn cần chiến lược chia nhỏ sitemap (split sitemap)
  const { posts } = await getPosts(1, 100);

  // 1. Các trang tĩnh (Static Pages)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    // Thêm các trang static khác nếu có (VD: /gioi-thieu, /lien-he)
  ];

  // 2. Các trang bài viết động (Dynamic Posts)
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/bai-viet/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes];
}
