import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import "./globals.css";

/**
 * 日本語は Web フォントを読み込まず、端末に入っているフォントを使う（globals.css の --font-sans）。
 * Noto Sans JP を読み込んでいた頃は約 20 個のフォントファイルが届くたびにページ全体が再レイアウトされ、
 * モバイルの表示速度を落としていたため。非機能要件「ページ読み込み 3 秒以内」への対応。
 *
 * 等幅の英字ラベル用の Geist Mono は英字だけで軽いので Web フォントのまま使う。
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: siteConfig.indexable
    ? undefined
    : { index: false, follow: false },
  // 画像は app/opengraph-image.tsx から自動で設定される
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
