// postService.ts
import api from "@/lib/axios";
import { Post, Category } from "@/types/blog";

// 1. Cập nhật getPosts để hỗ trợ filter theo Category ID
export const getPosts = async (
  page: number = 1,
  perPage: number = 6,
  search: string = "",
  categoryId: number | null = null, // Thêm tham số này
) => {
  try {
    let url = `/posts?page=${page}&per_page=${perPage}&_embed=true`;

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    // WordPress API dùng tham số 'categories' (số nhiều) để lọc theo ID
    if (categoryId) {
      url += `&categories=${categoryId}`;
    }

    const response = await api.get<Post[]>(url);

    return {
      posts: response.data,
      total: parseInt(response.headers["x-wp-total"] || "0"),
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], total: 0 };
  }
};

// 2. Thêm hàm lấy danh sách Categories
export const getCategories = async () => {
  try {
    // hide_empty=true để chỉ lấy các danh mục đã có bài viết
    const response = await api.get<Category[]>(
      "/categories?hide_empty=true&per_page=100",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    // Adding _embed here as well
    const response = await api.get<Post[]>(`/posts?slug=${slug}&_embed=true`);
    if (response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
};
