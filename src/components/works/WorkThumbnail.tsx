import Image from "next/image";
import type { Work } from "@/types";

/**
 * 作品のサムネイル。一覧カードと詳細ページの両方で使う。
 * thumbnail が未指定の作品は、タイトルの頭文字を置いたプレースホルダを出す。
 * 親要素側で aspect 比と幅を決め、この要素はそれを埋める。
 */
export default function WorkThumbnail({
  work,
  sizes,
  preload = false,
  imageClassName = "",
}: {
  work: Work;
  sizes: string;
  /** ファーストビューに出る場合だけ true（詳細ページ） */
  preload?: boolean;
  imageClassName?: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-line">
      {work.thumbnail ? (
        <Image
          src={work.thumbnail}
          alt=""
          fill
          sizes={sizes}
          preload={preload}
          className={`object-cover ${imageClassName}`}
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
  );
}
