import type { SkillCategory } from "@/types";

/**
 * F-02 スキルの表示。requirements.md のスコープに合わせて 4 区分。
 * TODO: 内容は仮です。実際に使える技術に差し替えてください。
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "design",
    name: "デザイン・コーディング",
    description: "画面の設計から実装まで。",
    skills: [
      { name: "Figma", note: "ワイヤーフレーム・UI設計" },
      { name: "HTML / CSS" },
      { name: "Tailwind CSS" },
      { name: "レスポンシブデザイン" },
    ],
  },
  {
    id: "frontend",
    name: "フロントエンド",
    description: "Webアプリの画面側の実装。",
    skills: [
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js", note: "App Router" },
      { name: "JavaScript" },
    ],
  },
  {
    id: "backend",
    name: "バックエンド",
    description: "API・データ処理・モデルの組み込み。",
    skills: [
      { name: "Python" },
      { name: "FastAPI" },
      { name: "PyTorch" },
      { name: "OpenAI API / Claude API", note: "LLMを使ったアプリ開発" },
    ],
  },
  {
    id: "others",
    name: "その他",
    description: "開発環境・インフラまわり。",
    skills: [
      { name: "Git / GitHub" },
      { name: "Vercel" },
      { name: "Docker" },
      { name: "Google Colab" },
    ],
  },
];
