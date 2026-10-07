"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  contactSchema,
  type ContactField,
  type ContactFieldErrors,
  type ContactResponse,
} from "@/lib/contact-schema";

type Status =
  | { type: "idle" }
  | { type: "submitting" }
  | { type: "success" }
  | { type: "error"; message: string };

/**
 * F-07 お問い合わせフォーム。
 * 送信前にブラウザ側でも同じルールで検証し、通ったものだけ /api/contact に送る。
 */
export default function Contact() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setFieldErrors(z.flattenError(parsed.error).fieldErrors);
      setStatus({ type: "idle" });
      return;
    }

    setFieldErrors({});
    setStatus({ type: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as ContactResponse;

      if (data.ok) {
        form.reset();
        setStatus({ type: "success" });
      } else {
        setFieldErrors(data.fieldErrors ?? {});
        setStatus({ type: "error", message: data.message });
      }
    } catch {
      setStatus({
        type: "error",
        message: "通信に失敗しました。接続を確認して再度お試しください。",
      });
    }
  }

  const submitting = status.type === "submitting";

  return (
    <section id="contact" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading index="04" label="Contact" title="お問い合わせ" />
        <p className="mt-6 max-w-xl text-ink-muted">
          お仕事のご相談やご質問は、こちらのフォームからお送りください。内容を確認のうえ、ご入力いただいたメールアドレスへ返信します。
        </p>

        {/*
          method / action は JS の読み込み前に送信された場合の保険。
          未指定だと GET で送られ、入力内容（個人情報）が URL に残ってしまう。
        */}
        <form
          method="post"
          action="/api/contact"
          onSubmit={handleSubmit}
          noValidate
          className="mt-12 max-w-2xl space-y-8"
        >
          <Field id="name" label="お名前" errors={fieldErrors.name}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={100}
              {...fieldA11y("name", fieldErrors)}
              className={inputClass}
            />
          </Field>

          <Field id="email" label="メールアドレス" errors={fieldErrors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              {...fieldA11y("email", fieldErrors)}
              className={inputClass}
            />
          </Field>

          <Field id="message" label="本文" errors={fieldErrors.message}>
            <textarea
              id="message"
              name="message"
              rows={7}
              maxLength={2000}
              {...fieldA11y("message", fieldErrors)}
              className={`${inputClass} resize-y`}
            />
          </Field>

          {/* ハニーポット。人間には見えず、Tab でも移動しない。ボットだけが埋める */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <button
              type="submit"
              disabled={submitting}
              className="bg-ink px-8 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "送信中…" : "送信する"}
            </button>

            <p role="status" className="text-sm">
              {status.type === "success" && (
                <span className="text-ink">
                  送信しました。お問い合わせありがとうございます。
                </span>
              )}
              {status.type === "error" && <span className="text-red-700">{status.message}</span>}
            </p>
          </div>
        </form>
      </Container>
    </section>
  );
}

const inputClass =
  "block w-full border border-ink-subtle bg-paper px-4 py-3 transition-colors focus:border-ink focus:outline-none aria-[invalid=true]:border-red-700";

/** エラーがある欄を支援技術にも伝えるための属性 */
function fieldA11y(field: ContactField, errors: ContactFieldErrors) {
  const hasError = Boolean(errors[field]?.length);
  return {
    "aria-invalid": hasError,
    "aria-describedby": hasError ? `${field}-error` : undefined,
  };
}

function Field({
  id,
  label,
  errors,
  children,
}: {
  id: ContactField;
  label: string;
  errors?: string[];
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold">
        {label}
        <span className="ml-2 text-xs font-normal text-ink-subtle">必須</span>
      </label>
      <div className="mt-2">{children}</div>
      {errors?.[0] && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {errors[0]}
        </p>
      )}
    </div>
  );
}
