import { getPostBySlug } from "@/services/postService";
import Post from "@/components/Post";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.soft.io.vn";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Hàm tạo Metadata động dựa trên slug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Bài viết không tồn tại",
      description: "Không tìm thấy nội dung bạn yêu cầu.",
    };
  }

  // Loại bỏ các thẻ HTML (như <p>, <strong>) khỏi excerpt để làm description sạch
  const cleanDescription = post.excerpt.rendered
    .replace(/<[^>]+>/g, "")
    .replace(/\n/g, " ")
    .trim();

  // Lấy URL ảnh đại diện nếu có
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title: post.title.rendered,
    description: cleanDescription,
    openGraph: {
      title: post.title.rendered,
      description: cleanDescription,
      type: "article",
      url: `${SITE_URL}/bai-viet/${post.slug}`,
      publishedTime: post.date,
      images: featuredImage
        ? [
            {
              url: featuredImage,
              alt: post.title.rendered,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: cleanDescription,
      images: featuredImage ? [featuredImage] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/bai-viet/${post.slug}`,
    },
  };
}

// 2. Component chính
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <Post post={post} />;
}
