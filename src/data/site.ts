/**
 * サイトの絶対 URL。OGP・sitemap・robots の URL の土台になる。
 * 1. NEXT_PUBLIC_SITE_URL があればそれ（独自ドメインを使う場合に設定）
 * 2. Vercel 上では、Vercel が自動で入れる本番ドメイン（VERCEL_PROJECT_PRODUCTION_URL、https:// なし）
 * 3. どちらも無ければローカル開発用
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

/** サイト全体の設定。metadata・Header・Footer・sitemap から参照する */
export const siteConfig = {
  name: "Portfolio",
  title: "ポートフォリオ | AIエンジニア",
  description:
    "AIエンジニアとしてのスキルと制作実績をまとめたポートフォリオサイトです。開発したAIアプリ・Webアプリの概要、使用技術、工夫した点を掲載しています。",
  url: resolveSiteUrl(),
  /**
   * 検索エンジンに載せるか。src/data/ が仮データの間は false にして、全ページに noindex を付ける。
   * TODO: 本人の情報に差し替えたら true に戻す
   */
  indexable: false,
} as const;

/** ヘッダーのナビゲーション。詳細ページからも戻れるよう先頭に / を付ける */
export const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Works", href: "/#works" },
  { label: "Contact", href: "/#contact" },
] as const;
