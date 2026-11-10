import { ImageResponse } from "next/og";

export const alt = "og repro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Synchronous export, static strings only: no dynamic APIs anywhere.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101219",
          color: "#7ef0d3",
          fontSize: 64,
        }}
      >
        og repro
      </div>
    ),
    { ...size },
  );
}
