import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * 検索エンジンのクロール設定（/robots.txt）。API は巡回対象から外す。
 * 検索に載せない間（siteConfig.indexable が false）も巡回は許可したままにする。
 * 巡回を禁止すると各ページの noindex が読まれず、URL だけが検索結果に残ることがあるため。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
