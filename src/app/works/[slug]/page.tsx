import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Container from "@/components/layout/Container";
import WorkThumbnail from "@/components/works/WorkThumbnail";
import { siteConfig } from "@/data/site";
import { getWorkBySlug, works } from "@/data/works";

/**
 * F-04 作品詳細 / F-05 GitHub / F-06 デモサイト。
 * works 配列の全 slug をビルド時に静的生成し、それ以外の slug は 404 にする。
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata(
  { params }: PageProps<"/works/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return {};

  // openGraph / twitter は親（layout）の値を丸ごと置き換えるので、必要な項目をすべて書く。
  // 画像も消えてしまうため、親で設定された OGP 画像（app/opengraph-image.tsx）を引き継ぐ
  const { openGraph, twitter } = await parent;

  return {
    title: work.title,
    description: work.summary,
    openGraph: {
      type: "article",
      locale: "ja_JP",
      siteName: siteConfig.title,
      title: work.title,
      description: work.summary,
      url: `/works/${work.slug}`,
      images: openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: work.summary,
      images: twitter?.images,
    },
  };
}

export default async function WorkDetailPage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const links = [
    { label: "GitHub", href: work.github },
    { label: "デモサイト", href: work.demo },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <article className="py-16 sm:py-24">
      <Container>
        <Link
          href="/#works"
          className="text-sm text-ink-muted transition-colors hover:text-ink"
        >
          ← 制作実績の一覧へ
        </Link>

        <header className="mt-10">
          <p className="font-mono text-xs text-ink-subtle">{work.period}</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">{work.title}</h1>
          <p className="mt-4 max-w-2xl text-ink-muted">{work.summary}</p>
        </header>

        {/* 詳細ページでは大きな空枠を出しても情報がないので、画像がある作品だけ表示する */}
        {work.thumbnail && (
          <div className="mt-12 aspect-[16/9]">
            <WorkThumbnail work={work} sizes="(min-width: 1024px) 944px, 100vw" preload />
          </div>
        )}

        <div className="mt-16 border-t border-line">
          <DetailRow label="Overview" title="概要">
            <p>{work.description}</p>
          </DetailRow>

          <DetailRow label="Tech" title="使用技術">
            <ul className="flex flex-wrap gap-2">
              {work.tech.map((tech) => (
                <li key={tech} className="border border-line px-3 py-1 text-sm">
                  {tech}
                </li>
              ))}
            </ul>
          </DetailRow>

          <DetailRow label="Highlights" title="工夫した点">
            <ol className="space-y-4">
              {work.highlights.map((highlight, i) => (
                <li key={highlight} className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-ink-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ol>
          </DetailRow>

          {links.length > 0 && (
            <DetailRow label="Links" title="リンク">
              <ul className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-ink px-5 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
                    >
                      {link.label}
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only">（新しいタブで開きます）</span>
                    </a>
                  </li>
                ))}
              </ul>
            </DetailRow>
          )}
        </div>
      </Container>
    </article>
  );
}

/** 「見出し | 内容」の 1 行。md 以上で 2 カラム、モバイルでは縦に積む */
function DetailRow({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-4 border-b border-line py-10 md:grid-cols-[12rem_1fr] md:gap-10">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle">{label}</p>
        <h2 className="mt-1 text-lg font-bold">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
}
