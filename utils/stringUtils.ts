// utils/stringUtils.ts
import { decode } from "he";

export const decodeHtml = (html: string) => {
  // Nếu chuỗi rỗng hoặc null/undefined thì trả về rỗng
  if (!html) return "";

  // Sử dụng hàm decode của thư viện 'he'
  // Hàm này tự động xử lý tất cả các thể loại: &#8220;, &quot;, &amp;, ...
  return decode(html);
};
