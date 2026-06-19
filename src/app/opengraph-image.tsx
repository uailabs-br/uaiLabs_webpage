import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "uaiLabs — AI agents and automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #03030a 0%, #0a0a22 50%, #03030a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#e8eeff",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          uaiLabs
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#8da0cf",
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          AI agents and automation that ship to production
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 16,
            color: "#4a6fff",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
          }}
        >
          From strategy to running infrastructure
        </div>
      </div>
    ),
    { ...size }
  );
}
