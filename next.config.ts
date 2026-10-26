import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy: このサイトが読み込んでよいものを自分のドメインに限る。
 * 外部のスクリプトや画像は使っていないので 'self' だけで足りる。
 * Next.js が埋め込むインラインスクリプトのために 'unsafe-inline' が要る（nonce を使うと全ページが動的描画になるため使わない）。
 * dev の HMR は eval を使うので、開発時だけ 'unsafe-eval' を許す。
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// HTTPS の強制（Strict-Transport-Security）は Vercel が付けるので、ここでは足さない
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // 他サイトの iframe に埋め込ませない（CSP の frame-ancestors に対応していない古いブラウザ向け）
  { key: "X-Frame-Options", value: "DENY" },
  // ファイルの種類をブラウザに推測させない
  { key: "X-Content-Type-Options", value: "nosniff" },
  // 外部リンク先にはドメインだけを伝える
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 使わない端末機能は無効にしておく
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
