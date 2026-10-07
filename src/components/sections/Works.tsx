import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import WorkCard from "@/components/works/WorkCard";
import { works } from "@/data/works";

/** F-03 制作実績。sm で 2 列、lg で 3 列のグリッド */
export default function Works() {
  return (
    <section id="works" className="border-t border-line bg-paper-alt py-20 sm:py-28">
      <Container>
        <SectionHeading index="03" label="Works" title="制作実績" />

        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <li key={work.slug}>
              <WorkCard work={work} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
