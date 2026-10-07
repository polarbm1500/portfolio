import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

/**
 * F-01 自己紹介と経歴。
 * md 以上では「写真 | 本文」の 2 カラム、モバイルでは縦に積む。
 */
export default function About() {
  return (
    <section id="about" className="border-t border-line bg-paper-alt py-20 sm:py-28">
      <Container>
        <SectionHeading index="01" label="About" title="自己紹介" />

        <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden bg-line md:max-w-none">
            <Image
              src={profile.avatar}
              alt={`${profile.name}のプロフィール写真`}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 40vw, 320px"
              className="object-cover"
            />
          </div>

          <div>
            <div className="space-y-5">
              {profile.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-14 font-mono text-xs uppercase tracking-widest text-ink-subtle">
              Career
            </h3>
            <ol className="mt-6 border-t border-line">
              {profile.careers.map((career) => (
                <li
                  key={`${career.period}-${career.title}`}
                  className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <p className="text-sm text-ink-muted">{career.period}</p>
                  <div>
                    <p className="font-bold">{career.title}</p>
                    {career.description && (
                      <p className="mt-1 text-sm text-ink-muted">{career.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
