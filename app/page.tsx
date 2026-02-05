// app/page.tsx
import Posts from "@/components/Posts";
import { getPosts, getCategories } from "@/services/postService"; // Import getCategories
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.soft.io.vn";

// Cấu hình Metadata chuẩn SEO và OpenGraph
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Góc Nhỏ Sáng Tạo | Chia Sẻ Kiến Thức Lập Trình & Công Nghệ",
  description:
    "Blog cá nhân chia sẻ kinh nghiệm về Laravel, ReactJS, WordPress và các giải pháp công nghệ sáng tạo dành cho cộng đồng developer Việt Nam.",
  keywords: [
    "lập trình",
    "web development",
    "laravel",
    "reactjs",
    "wordpress",
    "soft.io.vn",
    "blog công nghệ",
  ],
  openGraph: {
    title: "Góc Nhỏ Sáng Tạo - Blog Công Nghệ & Code",
    description:
      "Nơi những dòng code trở nên ấm áp và gần gũi thông qua các dự án thực tế.",
    url: SITE_URL,
    siteName: "Góc Nhỏ Sáng Tạo",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Đảm bảo bạn có file ảnh này trong thư mục public
        width: 1200,
        height: 630,
        alt: "Góc Nhỏ Sáng Tạo Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Góc Nhỏ Sáng Tạo | Blog Lập Trình",
    description: "Chia sẻ kinh nghiệm lập trình và phát triển web.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams:
    | Promise<{ page?: string; search?: string; category?: string }>
    | { page?: string; search?: string; category?: string };
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const searchQuery = params.search || "";
  const categoryId = params.category ? parseInt(params.category) : null; // Lấy categoryId

  // Gọi song song 2 API: Lấy bài viết (có filter category) và Lấy danh sách Category
  const [postsData, categories] = await Promise.all([
    getPosts(currentPage, 6, searchQuery, categoryId),
    getCategories(),
  ]);

  return (
    <Posts
      posts={postsData.posts}
      total={postsData.total}
      currentPage={currentPage}
      categories={categories} // Truyền danh sách categories vào Posts
    />
  );
}
