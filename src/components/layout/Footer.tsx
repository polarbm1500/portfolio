import Container from "./Container";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container>
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            {profile.nameEn} — {profile.role}
          </p>

          <ul className="flex items-center gap-6">
            {profile.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="pb-8 text-xs text-ink-subtle">
          © {new Date().getFullYear()} {profile.nameEn}
        </p>
      </Container>
    </footer>
  );
}
