"use client";
import { FloatButton } from "antd";

export default function BackToTop() {
  return (
    <FloatButton.BackTop
      visibilityHeight={400}
      type="primary"
      shape="circle"
      duration={600} // Tốc độ cuộn mượt mà
      style={{
        right: 40,
        bottom: 40,
        width: 48,
        height: 48,
        boxShadow: "0 8px 25px rgba(0, 185, 107, 0.3)",
      }}
      tooltip={<div>Lên đầu trang</div>}
    />
  );
}
