// lib/axios.ts
import axios from "axios";

// Lấy URL từ biến môi trường, nếu không có thì dùng fallback
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://soft.io.vn/wp-json/wp/v2";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
