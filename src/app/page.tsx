import Container from "@/components/layout/Container";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Works from "@/components/sections/Works";

/**
 * トップページ。
 * 残りの placeholder は Step 6 で Contact に置き換える。
 */
const placeholders = [
  { id: "contact", label: "Contact", note: "Step 6 で実装" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Works />

      {placeholders.map((section) => (
        <section key={section.id} id={section.id} className="border-t border-line py-20">
          <Container>
            <h2 className="text-2xl font-bold sm:text-3xl">{section.label}</h2>
            <p className="mt-3 text-sm text-ink-subtle">{section.note}</p>
          </Container>
        </section>
      ))}
    </>
  );
}
