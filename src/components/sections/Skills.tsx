import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

/**
 * F-02 スキル。4 区分を md 以上では 2×2、モバイルでは 1 列のグリッドで並べる。
 * 各区分は上罫線で区切り、カードの枠や影は使わない（余白と罫線で見せる方針）。
 */
export default function Skills() {
  return (
    <section id="skills" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHeading index="02" label="Skills" title="スキル" />

        <div className="mt-12 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {skillCategories.map((category, i) => (
            <div key={category.id} className="border-t border-ink pt-6">
              <p className="font-mono text-xs text-ink-subtle">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-bold">{category.name}</h3>
              <p className="mt-2 text-sm text-ink-muted">{category.description}</p>

              <ul className="mt-6 border-t border-line">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                  >
                    <span className="font-medium">{skill.name}</span>
                    {skill.note && (
                      <span className="text-right text-xs text-ink-muted">{skill.note}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
