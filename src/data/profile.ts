import type { Profile } from "@/types";

/**
 * TODO: 内容はすべて仮です。ご自身の情報に差し替えてください。
 * avatar は public/profile.jpg などに画像を置き、パスを差し替えてください。
 */
export const profile: Profile = {
  name: "山田 太郎",
  nameEn: "Taro Yamada",
  role: "AIエンジニア",
  tagline: "AIで、手の届かなかったことを届く場所に。",
  goal:
    "機械学習とWeb開発の両方を扱えるAIエンジニアとして、研究の成果を実際に使えるプロダクトの形にすることを目指しています。",
  introduction: [
    "大学でAI・機械学習を学びながら、学んだ技術を実際に動くアプリケーションとして形にすることに取り組んできました。",
    "モデルを作って終わりにせず、使う人の手元に届くところまで実装することを大切にしています。フロントエンドからバックエンド、デプロイまで一通り自分で組み上げます。",
  ],
  avatar: "/profile-placeholder.svg",
  careers: [
    {
      period: "2024年4月 - 現在",
      title: "大学でAI・機械学習を専攻",
      description:
        "自然言語処理を中心に学習。個人開発でLLMを使ったアプリケーションを制作。",
    },
    {
      period: "2025年",
      title: "個人開発・ポートフォリオ制作",
      description:
        "Next.js を用いたWebアプリ開発と、生成AIを組み合わせたプロダクトを制作。",
    },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/polarbm1500" },
  ],
};
