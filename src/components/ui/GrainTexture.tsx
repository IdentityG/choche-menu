"use client";

import { memo } from "react";

function GrainTexture() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-grain"
      aria-hidden="true"
    >
      <svg className="hidden">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="absolute inset-[-200%] w-[400%] h-[400%] animate-grain"
        style={{
          filter: "url(#grain-filter)",
          opacity: 0.022,
        }}
      />
    </div>
  );
}

export default memo(GrainTexture);