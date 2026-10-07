import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { works } from "@/data/works";

/** 検索エンジン向けのページ一覧（/sitemap.xml）。作品を足すと自動で増える */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    ...works.map((work) => ({
      url: `${siteConfig.url}/works/${work.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
