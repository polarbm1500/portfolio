/**
 * サイト全体の設定。metadata・Header・Footer・sitemap から参照する。
 * 本番 URL が決まったら NEXT_PUBLIC_SITE_URL を設定する（Step 8）。
 */
export const siteConfig = {
  name: "Portfolio",
  title: "ポートフォリオ | AIエンジニア",
  description:
    "AIエンジニアとしてのスキルと制作実績をまとめたポートフォリオサイトです。開発したAIアプリ・Webアプリの概要、使用技術、工夫した点を掲載しています。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** ヘッダーのナビゲーション。詳細ページからも戻れるよう先頭に / を付ける */
export const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Works", href: "/#works" },
  { label: "Contact", href: "/#contact" },
] as const;
