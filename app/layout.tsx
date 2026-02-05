// layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { ConfigProvider } from "antd";
import BackToTop from "@/components/BackToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
      <head>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3585118770961536`}
          crossOrigin="anonymous"
        />
      </head>
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
          <GoogleAnalytics ga_id="G-HHXZSNQ65X" />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
