// components/CategoryFilter.tsx
"use client";

import React from "react";
import { Category } from "@/types/blog";
import { useRouter, useSearchParams } from "next/navigation";
import { Tag } from "antd";

const { CheckableTag } = Tag;

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lấy ID category đang chọn từ URL
  const currentCategoryId = searchParams.get("category")
    ? parseInt(searchParams.get("category")!)
    : null;

  const handleSelectCategory = (categoryId: number | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId) {
      params.set("category", categoryId.toString());
    } else {
      params.delete("category"); // Nếu chọn "Tất cả" thì xóa param
    }

    // Reset về trang 1 khi đổi category để tránh lỗi phân trang
    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 40,
      }}
    >
      {/* Nút "Tất cả" */}
      <CheckableTag
        checked={currentCategoryId === null}
        onChange={() => handleSelectCategory(null)}
        style={{
          fontSize: "1rem",
          padding: "6px 16px",
          borderRadius: 20,
          cursor: "pointer",
          border:
            currentCategoryId === null
              ? "1px solid #00b96b"
              : "1px solid transparent",
          backgroundColor:
            currentCategoryId === null ? "#f6ffed" : "transparent",
          color: currentCategoryId === null ? "#00b96b" : "inherit",
        }}
      >
        Tất cả
      </CheckableTag>

      {/* Danh sách Categories từ API */}
      {categories.map((cat) => (
        <CheckableTag
          key={cat.id}
          checked={currentCategoryId === cat.id}
          onChange={() => handleSelectCategory(cat.id)}
          style={{
            fontSize: "1rem",
            padding: "6px 16px",
            borderRadius: 20,
            cursor: "pointer",
            border:
              currentCategoryId === cat.id
                ? "1px solid #00b96b"
                : "1px solid #f0f0f0",
            backgroundColor:
              currentCategoryId === cat.id ? "#f6ffed" : "#fafafa",
            color: currentCategoryId === cat.id ? "#00b96b" : "inherit",
          }}
        >
          {cat.name}
        </CheckableTag>
      ))}
    </div>
  );
}
