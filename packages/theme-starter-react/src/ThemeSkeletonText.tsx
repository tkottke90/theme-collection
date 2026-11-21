import type { JSX } from "preact";
import { tokens } from "./tokens.js";
import { ensureKeyframes, prefersReducedMotion } from "./skeletonShimmer.js";

export interface ThemeSkeletonTextProps {
  width?: string;
}

export function ThemeSkeletonText({ width = "100%" }: ThemeSkeletonTextProps): JSX.Element {
  ensureKeyframes();

  return (
    <div
      style={{
        display: "block",
        width,
        height: "0.875rem",
        marginBottom: "0.375rem",
        borderRadius: tokens.radiusTheme,
        background: `linear-gradient(90deg, ${tokens.skeletonBase} 25%, ${tokens.skeletonHighlight} 37%, ${tokens.skeletonBase} 63%)`,
        backgroundSize: "400px 100%",
        animation: prefersReducedMotion()
          ? undefined
          : "theme-skeleton-shimmer 1.4s ease-in-out infinite",
      }}
    />
  );
}
