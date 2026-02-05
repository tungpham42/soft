// layout.tsx
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { ConfigProvider } from "antd";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOFT Blog | Storytelling Space",
  description: "Website tin tức công nghệ với góc nhìn ấm áp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <StyledComponentsRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#00b96b",
                borderRadius: 16,
                fontFamily: "'Lexend Deca', sans-serif",
                colorBgLayout: "#fdfbf7",
              },
            }}
          >
            <main style={{ minHeight: "100vh" }}>{children}</main>
            <BackToTop />
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
