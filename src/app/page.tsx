import Container from "@/components/layout/Container";

/**
 * トップページ。
 * Step 2 以降で、この各 section の中身を Hero / About / Skills / Works / Contact に置き換える。
 * 今はヘッダーのアンカーリンクの行き先として空のセクションだけ用意している。
 */
const placeholders = [
  { id: "about", label: "About", note: "Step 2 で実装" },
  { id: "skills", label: "Skills", note: "Step 3 で実装" },
  { id: "works", label: "Works", note: "Step 4 で実装" },
  { id: "contact", label: "Contact", note: "Step 6 で実装" },
];

export default function Home() {
  return (
    <>
      <section className="py-24 sm:py-32">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle">
            Portfolio
          </p>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            土台のセットアップが完了しました
          </h1>
          <p className="mt-6 max-w-xl text-ink-muted">
            共通レイアウト・フォント・デザイントークン・データ構造までを用意しました。
            ここから各セクションを順番に作っていきます。
          </p>
        </Container>
      </section>

      {placeholders.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="border-t border-line py-20 odd:bg-paper-alt"
        >
          <Container>
            <h2 className="text-2xl font-bold sm:text-3xl">{section.label}</h2>
            <p className="mt-3 text-sm text-ink-subtle">{section.note}</p>
          </Container>
        </section>
      ))}
    </>
  );
}
