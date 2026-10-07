import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/** 検索エンジンのクロール設定（/robots.txt）。API は巡回対象から外す */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
