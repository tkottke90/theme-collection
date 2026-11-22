import { svg } from "lit";
import type { ViewfinderGeometry } from "./viewfinder-geometry.js";

/**
 * Renders the viewfinder frame's `<svg>` overlay: an outer outline (shared
 * corner radius, a raised top tab and inward side/bottom notches), a plain
 * inset inner line, and four identical inset corner brackets. Place inside a
 * `position: relative; isolation: isolate` host — see `hud-frame-svg.ts` for
 * why the glow filter is defined inline per instance rather than shared
 * globally.
 */
export function renderViewfinderFrame(geometry: ViewfinderGeometry | null) {
  const viewBox = geometry?.viewBox ?? "0 0 1 1";
  const outerD = geometry?.outerD ?? "";
  const innerD = geometry?.innerD ?? "";
  const bracketsD = geometry?.bracketsD ?? "";

  return svg`
    <svg
      class="pointer-events-none absolute inset-0 block h-full w-full"
      style="overflow: visible;"
      viewBox=${viewBox}
      aria-hidden="true"
    >
      <defs>
        <filter id="viewfinder-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d=${outerD} fill="var(--color-surface)" stroke="var(--color-border)" stroke-width="2" />
      <path d=${innerD} fill="none" stroke="var(--color-frame-inner)" stroke-width="1" />
      <path
        d=${bracketsD}
        fill="none"
        stroke="var(--color-brand-500)"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="miter"
        filter="url(#viewfinder-glow)"
      />
    </svg>
  `;
}
