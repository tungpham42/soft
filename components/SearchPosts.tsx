// components/SearchPosts.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchPosts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Tránh push router ở lần render đầu tiên nếu term rỗng
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
      params.set("page", "1");
    } else {
      params.delete("search");
    }

    router.push(`/?${params.toString()}`);
  }, [debouncedSearch, searchParams, router]); // Chỉ trigger khi giá trị debounced thay đổi

  return (
    <div style={{ maxWidth: 600, margin: "0 auto 40px" }}>
      <Input
        size="large"
        placeholder="Tìm kiếm bài viết..."
        prefix={<SearchOutlined style={{ color: "#00b96b" }} />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
        style={{
          borderRadius: 16,
          padding: "10px 20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid #eee",
        }}
      />
    </div>
  );
}
