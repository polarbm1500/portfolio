/** 経歴の 1 項目 */
export type Career = {
  period: string;
  title: string;
  description?: string;
};

/** 外部リンク（GitHub / X など）。フッターと About で使う */
export type Social = {
  label: string;
  href: string;
};

/** F-01 プロフィール表示 */
export type Profile = {
  name: string;
  nameEn: string;
  /** 肩書き（例: AIエンジニア） */
  role: string;
  /** Hero に大きく出す一文 */
  tagline: string;
  /** AIエンジニアとしての目標 */
  goal: string;
  /** 自己紹介。1 要素 = 1 段落 */
  introduction: string[];
  /** public/ からのパス */
  avatar: string;
  careers: Career[];
  socials: Social[];
};

export type Skill = {
  name: string;
  /** 補足（習熟度や用途など）。省略可 */
  note?: string;
};

/** F-02 スキルの表示。4 区分それぞれが 1 つの SkillCategory */
export type SkillCategory = {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
};

/** F-03 制作実績 / F-04 詳細表示 */
export type Work = {
  /** URL に使う識別子（/works/[slug]） */
  slug: string;
  title: string;
  /** 一覧カード用の短い説明 */
  summary: string;
  /** 詳細ページの概要 */
  description: string;
  /** 制作時期（例: 2025年8月） */
  period: string;
  /** 使用技術 */
  tech: string[];
  /** 工夫した点 */
  highlights: string[];
  /** F-05 GitHub 連携 */
  github?: string;
  /** F-06 デモサイト */
  demo?: string;
  /** public/ からのパス */
  thumbnail?: string;
};
