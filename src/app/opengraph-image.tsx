import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/**
 * SNS でシェアされたときのサムネイル画像（OGP）。ビルド時に 1 度だけ生成される。
 * 日本語フォントを埋め込むと ImageResponse のサイズ上限（500KB）を超えるため、
 * 標準フォントで描ける英字だけで構成している。
 */
export const alt = `${profile.nameEn} — AI Engineer Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#ffffff",
          color: "#14110f",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#a39d97" }}>PORTFOLIO</div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, letterSpacing: -2 }}>
            {profile.nameEn}
          </div>
          <div style={{ marginTop: 16, fontSize: 44, color: "#6f6a66" }}>AI Engineer</div>
        </div>

        <div style={{ width: 120, height: 4, background: "#1b4dd1" }} />
      </div>
    ),
    size,
  );
}
