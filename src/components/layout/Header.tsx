import Link from "next/link";
import Container from "./Container";
import { navItems } from "@/data/site";
import { profile } from "@/data/profile";

/**
 * サイト共通のヘッダー。
 * ナビゲーションは /#about のような絶対パス付きアンカーなので、
 * 作品詳細ページからでもトップの該当セクションへ戻れる。
 *
 * モバイル用のメニューは Step 7 で追加する（現状は sm 未満で非表示）。
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-sm font-medium tracking-wide transition-colors hover:text-accent"
          >
            {profile.nameEn}
          </Link>

          <nav aria-label="メインナビゲーション">
            <ul className="hidden items-center gap-8 sm:flex">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
