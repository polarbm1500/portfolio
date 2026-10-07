import Container from "@/components/layout/Container";
import { profile } from "@/data/profile";

/**
 * F-01 ファーストビュー。
 * 装飾は置かず、大きな見出しと余白だけで「誰で、何を目指しているか」を伝える。
 */
export default function Hero() {
  return (
    <section className="py-24 sm:py-36">
      <Container>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle">
          {profile.nameEn} — Portfolio
        </p>

        {/* auto-phrase: 日本語を文節の切れ目で改行させる（非対応ブラウザでは通常の改行） */}
        <h1 className="mt-8 max-w-3xl text-4xl font-bold [word-break:auto-phrase] sm:text-6xl">
          {profile.tagline}
        </h1>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:gap-16">
          <p className="shrink-0">
            <span className="block text-lg font-bold">{profile.name}</span>
            <span className="block text-sm text-ink-muted">{profile.role}</span>
          </p>
          <p className="max-w-xl text-ink-muted">{profile.goal}</p>
        </div>
      </Container>
    </section>
  );
}
