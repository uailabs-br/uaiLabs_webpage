"use client";

import dynamic from "next/dynamic";

const SpaceCanvas = dynamic(() => import("./SpaceCanvas"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a0a22] via-[#03030a] to-[#000000]" />
  ),
});

export default function SpaceCanvasLoader() {
  return <SpaceCanvas />;
}
