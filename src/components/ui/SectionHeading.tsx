/**
 * 各セクション共通の見出し。
 * 小さな英字ラベル（番号付き）と日本語の大見出しの 2 段で、参考デザインの文字組みに寄せる。
 */
export default function SectionHeading({
  index,
  label,
  title,
}: {
  /** セクション番号（例: "01"） */
  index: string;
  /** 英字ラベル（例: "About"） */
  label: string;
  title: string;
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-ink-subtle">
        {index} / {label}
      </p>
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
    </div>
  );
}
