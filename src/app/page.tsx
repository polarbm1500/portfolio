import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";

/** トップページ。縦スクロールの 1 ページに全セクションを並べる */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Works />
      <Contact />
    </>
  );
}
