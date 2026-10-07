import { z } from "zod";

/**
 * F-07 お問い合わせの入力ルール。
 * フォーム（ブラウザ側）と /api/contact（サーバー側）の両方でこの 1 つを使い、ルールのずれを防ぐ。
 * ブラウザ側の検証は操作性のため、サーバー側の検証は安全のため（ブラウザ側は回避できる）。
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "お名前を入力してください" })
    .max(100, { error: "お名前は100文字以内で入力してください" })
    // 件名に名前を入れるので、改行でメールのヘッダーを崩されないようにする
    .regex(/^[^\r\n]*$/, { error: "お名前に改行は使えません" }),
  email: z
    .email({ error: "メールアドレスの形式が正しくありません" })
    .max(254, { error: "メールアドレスが長すぎます" }),
  message: z
    .string()
    .trim()
    .min(1, { error: "本文を入力してください" })
    .max(2000, { error: "本文は2000文字以内で入力してください" }),
  /**
   * スパム対策のハニーポット。画面には出さない欄なので、人間なら必ず空になる。
   * 値が入っていたらボットとみなす（判定は /api/contact 側。ここで弾くとボットにエラーで気付かれる）。
   */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string[]>>;

/** /api/contact のレスポンス */
export type ContactResponse =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: ContactFieldErrors };
