// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.soft.io.vn";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"], // Chặn các đường dẫn không muốn public
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
