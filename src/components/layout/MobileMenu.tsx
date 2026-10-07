"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/data/site";

/**
 * sm 未満で表示するナビゲーション。ボタンでヘッダー直下にメニューを開閉する。
 * リンクを押したとき・Esc キーで閉じる。
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="-mr-2 flex h-10 w-10 items-center justify-center"
      >
        <span className="sr-only">{open ? "メニューを閉じる" : "メニューを開く"}</span>
        {/* 3 本線 ⇔ × を線の回転で切り替える */}
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-200 ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute top-1.5 left-0 h-px w-5 bg-ink transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-200 ${
              open ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      <nav
        id="mobile-menu"
        aria-label="メインナビゲーション"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-paper"
      >
        <ul className="px-4 py-2">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-line last:border-b-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-4 text-base"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
