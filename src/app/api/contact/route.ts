import { Resend } from "resend";
import { z } from "zod";
import { contactSchema, type ContactResponse } from "@/lib/contact-schema";

/**
 * F-07 お問い合わせの送信先。フォームの内容を検証し、Resend で自分宛てにメールを送る。
 *
 * 必要な環境変数（.env.local / Vercel の Environment Variables）:
 * - RESEND_API_KEY   … Resend で発行した API キー
 * - CONTACT_TO_EMAIL … 受信先。独自ドメイン未検証の間は Resend に登録したアドレスしか使えない
 *
 * 独自ドメインを検証していないので、送信元は Resend が用意している onboarding@resend.dev を使う。
 */
const FROM = "Portfolio Contact <onboarding@resend.dev>";

function json(body: ContactResponse, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: "送信内容を読み取れませんでした。" }, 400);
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return json(
      {
        ok: false,
        message: "入力内容を確認してください。",
        fieldErrors: z.flattenError(result.error).fieldErrors,
      },
      400,
    );
  }

  const { name, email, message, website } = result.data;

  // ハニーポットに値があればボット。相手に気付かれないよう、送らずに成功を返す
  if (website) {
    return json({ ok: true }, 200);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY または CONTACT_TO_EMAIL が設定されていません");
    return json({ ok: false, message: "現在お問い合わせを受け付けられません。" }, 500);
  }

  // 入力値を HTML に埋め込むと表示崩れやスクリプト混入の余地が生まれるため、テキストメールで送る
  const { error } = await new Resend(apiKey).emails.send({
    from: FROM,
    to,
    replyTo: email,
    subject: `【ポートフォリオ】${name} さんからのお問い合わせ`,
    text: [`お名前: ${name}`, `メールアドレス: ${email}`, "", message].join("\n"),
  });

  if (error) {
    console.error("[contact] Resend での送信に失敗しました", error);
    return json(
      { ok: false, message: "送信に失敗しました。時間をおいて再度お試しください。" },
      502,
    );
  }

  return json({ ok: true }, 200);
}
