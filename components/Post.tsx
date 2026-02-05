// components/Post.tsx
"use client";

import React from "react";
import type { Post } from "@/types/blog";
import { Typography, Button, Divider, Image, Tag } from "antd";
import Link from "next/link";
import { notFound } from "next/navigation";
import { decodeHtml } from "@/utils/stringUtils"; // Import hàm decode

const { Title, Text } = Typography;

export default function Post({ post }: { post: Post }) {
  if (!post) notFound();

  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  // Decode tiêu đề
  const decodedTitle = decodeHtml(post.title.rendered);

  return (
    <article style={{ maxWidth: 850, margin: "0 auto", padding: "60px 24px" }}>
      {/* Back Button */}
      <Link href="/">
        <Button
          type="text"
          style={{
            marginBottom: 40,
            padding: 0,
            opacity: 0.6,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "1rem",
          }}
        >
          ← Quay lại trang chủ
        </Button>
      </Link>

      {/* Featured Image */}
      {featuredImage && (
        <div
          style={{
            marginBottom: 60,
            borderRadius: 32,
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <Image
            src={featuredImage}
            alt={decodedTitle}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              maxHeight: "500px",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Categories */}
      <div
        style={{ marginBottom: 20, display: "flex", gap: 8, flexWrap: "wrap" }}
      >
        {categories.map((cat) => (
          <Tag
            key={cat.id}
            color="rgba(0, 185, 107, 0.1)"
            style={{
              color: "#00b96b",
              border: "none",
              borderRadius: 20,
              padding: "4px 16px",
              fontWeight: 600,
              fontSize: "0.85rem",
            }}
          >
            # {cat.name}
          </Tag>
        ))}
      </div>

      {/* Post Title (Decoded) */}
      <Title
        style={{
          fontSize: "3.5rem",
          lineHeight: 1.2,
          fontWeight: 700,
          marginBottom: 24,
          letterSpacing: "-0.03em",
        }}
      >
        {decodedTitle}
      </Title>

      {/* Meta Info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 48,
        }}
      >
        <Text style={{ fontSize: "1rem", fontWeight: 500, color: "#00b96b" }}>
          SOFT Editorial •{" "}
          {new Date(post.date).toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </div>

      <Divider />

      {/* Post Content */}
      <div
        className="blog-content"
        style={{
          fontSize: "1.2rem",
          lineHeight: "1.8",
          color: "var(--foreground)",
          fontFamily: "'Lexend Deca', sans-serif",
        }}
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* Global Style for content */}
      <style jsx global>{`
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content h2 {
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          font-size: 1.8rem;
        }
        .blog-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
          font-size: 1.5rem;
        }
        .blog-content img {
          border-radius: 16px;
          max-width: 100%;
          height: auto;
          margin: 20px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content blockquote {
          border-left: 4px solid #00b96b;
          padding-left: 20px;
          margin: 20px 0;
          font-style: italic;
          opacity: 0.8;
          background: #f9f9f9;
          padding: 16px 20px;
          border-radius: 0 12px 12px 0;
        }
      `}</style>
    </article>
  );
}
