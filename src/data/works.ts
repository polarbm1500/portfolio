import type { Work } from "@/types";

/**
 * F-03 制作実績 / F-04 詳細表示のデータ。
 * 作品を追加するときは、この配列に 1 件足すだけで一覧と詳細ページの両方に反映されます。
 * slug は URL になるので半角英数字とハイフンのみ、かつ重複しないようにしてください。
 *
 * TODO: 内容はすべて仮です。実際に作ったものに差し替えてください。
 * サムネイルは public/works/ に画像を置き、thumbnail: "/works/xxx.png" を足すと表示されます
 * （未指定の間は一覧カードにプレースホルダが出ます）。
 */
export const works: Work[] = [
  {
    slug: "ai-chat-app",
    title: "AIチャットアプリ",
    summary: "社内ドキュメントを検索して回答するRAGチャットアプリ。",
    description:
      "手元のドキュメントを読み込ませ、その内容にもとづいて回答するチャットアプリです。一般的なLLMでは答えられない固有の情報について、根拠となる箇所を示しながら回答することを目指しました。",
    period: "2025年8月",
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "OpenAI API"],
    highlights: [
      "回答の根拠となった文書の該当箇所を併せて表示し、内容を検証できるようにした",
      "ストリーミング応答に対応し、待ち時間の体感を短くした",
      "検索精度を上げるため、文書の分割単位を複数パターン試して比較した",
    ],
    github: "https://github.com/your-account/ai-chat-app",
    demo: "https://example.com",
  },
  {
    slug: "image-classifier",
    title: "画像分類アプリ",
    summary: "アップロードした画像をその場で分類するWebアプリ。",
    description:
      "学習済みモデルをファインチューニングし、ブラウザからアップロードした画像を分類して結果を返すアプリです。モデルの学習から推論APIの提供、画面の実装までを一通り自分で行いました。",
    period: "2025年5月",
    tech: ["Python", "PyTorch", "FastAPI", "React"],
    highlights: [
      "データ拡張を加えることで、少ない学習データでも精度を確保した",
      "推論結果を確信度つきで表示し、モデルが迷っている場合が分かるようにした",
    ],
    github: "https://github.com/your-account/image-classifier",
  },
  {
    slug: "portfolio-site",
    title: "ポートフォリオサイト",
    summary: "このサイト自体。要件定義から設計・実装・デプロイまで。",
    description:
      "要件定義書を書くところから始め、Next.js App Router で実装し Vercel に公開したポートフォリオサイトです。作品データを型付きのデータファイルとして分離し、記載内容を簡単に追加・更新できる構成にしました。",
    period: "2025年9月",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    highlights: [
      "作品データを型付きの配列に分離し、配列に1件追加するだけで一覧と詳細ページに反映される構成にした",
      "全ページを静的生成し、表示速度を確保した",
    ],
    github: "https://github.com/polarbm1500/portfolio",
  },
];

/** slug から 1 件取り出す。詳細ページ（/works/[slug]）で使う */
export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}
