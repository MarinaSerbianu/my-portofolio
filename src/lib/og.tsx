import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared OG card: white paper, ink, blue pen. Uses the built-in sans font. */
export function ogCard({
  kicker,
  title,
  footer,
}: {
  kicker: string;
  title: string;
  footer: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#FFFFFF",
        color: "#15171C",
        padding: "64px 72px",
        borderTop: "12px solid #1D3BC4",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
                    color: "#474C56",
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 60 ? 60 : 76,
          lineHeight: 1.02,
          letterSpacing: -2,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#474C56",
          borderTop: "1px solid #E2E4E8",
          paddingTop: 24,
        }}
      >
        <span>{footer}</span>
        <span style={{ color: "#1D3BC4" }}>
          Evidence → Hypothesis → Test → Learn
        </span>
      </div>
    </div>,
    ogSize,
  );
}
