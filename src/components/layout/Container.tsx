import type { ReactNode } from "react";

/** 全セクションで共通の左右余白と最大幅。モバイルでも16pxの余白を確保する */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
