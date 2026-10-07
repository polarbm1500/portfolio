import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/types";

/**
 * F-03 作品一覧の 1 枚。カード全体が /works/[slug] へのリンクになる。
 * thumbnail が未指定の作品は、タイトルの頭文字を置いたプレースホルダを出す。
 */
export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link href={`/works/${work.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-line">
        {work.thumbnail ? (
          <Image
            src={work.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full items-center justify-center text-5xl font-bold text-ink-subtle/50"
          >
            {work.title.charAt(0)}
          </div>
        )}
      </div>

      <p className="mt-5 font-mono text-xs text-ink-subtle">{work.period}</p>
      <h3 className="mt-1 text-lg font-bold transition-colors group-hover:text-accent">
        {work.title}
      </h3>
      <p className="mt-2 text-sm text-ink-muted">{work.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="使用技術">
        {work.tech.map((tech) => (
          <li
            key={tech}
            className="border border-line px-2 py-0.5 text-xs leading-relaxed text-ink-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </Link>
  );
}
