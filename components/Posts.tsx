// components/Posts.tsx
"use client";

import React from "react";
import { Post, Category } from "@/types/blog";
import {
  Card,
  Typography,
  Row,
  Col,
  Tag,
  Pagination,
  ConfigProvider,
  Image,
  Empty,
} from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SearchPosts from "./SearchPosts";
import CategoryFilter from "./CategoryFilter";
import { decodeHtml } from "@/utils/stringUtils"; // Import hàm decode

const { Title, Paragraph } = Typography;

export default function Posts({
  posts,
  total,
  currentPage,
  categories = [],
}: {
  posts: Post[];
  total: number;
  currentPage: number;
  categories?: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
      {/* --- Header Section --- */}
      <header style={{ textAlign: "center", marginBottom: 40 }}>
        <Title
          level={1}
          style={{
            fontSize: "3.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Góc nhỏ <span style={{ color: "#00b96b" }}>Sáng tạo</span>
        </Title>
        <Paragraph
          style={{ fontSize: "1.2rem", opacity: 0.6, fontWeight: 300 }}
        >
          {searchQuery
            ? `Kết quả tìm kiếm cho: "${searchQuery}"`
            : "Nơi những dòng code trở nên ấm áp và gần gũi."}
        </Paragraph>
      </header>

      {/* --- Search Bar --- */}
      <SearchPosts />

      {/* --- Category Filter --- */}
      {categories.length > 0 && <CategoryFilter categories={categories} />}

      {/* --- Posts Grid --- */}
      {posts.length > 0 ? (
        <Row gutter={[32, 40]} style={{ display: "flex", flexWrap: "wrap" }}>
          {posts.map((post) => {
            const postCategories = post._embedded?.["wp:term"]?.[0] || [];
            // Decode tiêu đề để hiển thị đúng
            const decodedTitle = decodeHtml(post.title.rendered);

            return (
              <Col
                xs={24}
                sm={12}
                md={8}
                key={post.id}
                style={{ display: "flex" }}
              >
                <Link
                  href={`/bai-viet/${post.slug}`}
                  style={{ display: "flex", width: "100%" }}
                >
                  <Card
                    hoverable
                    className="post-card"
                    style={{
                      borderRadius: 24,
                      overflow: "hidden",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      background: "var(--card-bg)",
                    }}
                    cover={
                      <div style={{ position: "relative" }}>
                        {post._embedded?.["wp:featuredmedia"]?.[0]
                          ?.source_url && (
                          <Image
                            preview={false}
                            src={
                              post._embedded["wp:featuredmedia"][0].source_url
                            }
                            alt={decodedTitle}
                            style={{
                              height: 220,
                              objectFit: "cover",
                              width: "100%",
                            }}
                          />
                        )}
                        {postCategories.length > 0 && (
                          <Tag
                            color="#00b96b"
                            style={{
                              position: "absolute",
                              top: 16,
                              left: 16,
                              borderRadius: 8,
                              border: "none",
                              fontWeight: 600,
                            }}
                          >
                            {postCategories[0].name}
                          </Tag>
                        )}
                      </div>
                    }
                    bodyStyle={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      padding: 24,
                    }}
                  >
                    <Title
                      level={4}
                      style={{
                        marginBottom: 12,
                        fontWeight: 600,
                        lineHeight: 1.4,
                      }}
                    >
                      {decodedTitle}
                    </Title>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                      style={{
                        flex: 1,
                        opacity: 0.6,
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    />
                    <div
                      style={{
                        marginTop: 20,
                        color: "#00b96b",
                        fontWeight: 600,
                      }}
                    >
                      Đọc thêm →
                    </div>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      ) : (
        <div style={{ padding: "40px 0" }}>
          <Empty description="Không tìm thấy bài viết nào phù hợp." />
        </div>
      )}

      {/* --- Pagination --- */}
      {total > 6 && (
        <div
          style={{ marginTop: 80, display: "flex", justifyContent: "center" }}
        >
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#00b96b",
                borderRadius: 12,
                fontFamily: "'Lexend Deca', sans-serif",
              },
            }}
          >
            <Pagination
              current={currentPage}
              total={total}
              pageSize={6}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </ConfigProvider>
        </div>
      )}
    </div>
  );
}
