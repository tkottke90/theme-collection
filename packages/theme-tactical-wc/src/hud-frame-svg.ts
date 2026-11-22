import { svg } from "lit";
import type { HudFrameGeometry } from "./hud-geometry.js";

/**
 * Renders the HUD frame's `<svg>` overlay for a given (possibly not-yet-
 * measured) geometry. Place inside a `position: relative; isolation: isolate`
 * host — the svg itself is `position: absolute; inset: 0; z-index: -1` so it
 * never affects the host's own layout (the host's ordinary content sets its
 * size, not this overlay).
 *
 * The glow filter is defined inline, once per rendered frame, rather than
 * shared globally: an `id` referenced via `url(#id)` from inside a shadow
 * root does not resolve to a definition outside that same shadow root (shadow
 * DOM scopes IDs), so a single page-wide `<filter>` — the approach that works
 * for a plain-DOM framework like the React/Preact build of this theme —
 * isn't reliable here. Duplicating the (tiny, static) filter per component
 * instance costs nothing measurable and keeps each instance self-contained.
 */
export function renderHudFrame(geometry: HudFrameGeometry | null) {
  const viewBox = geometry?.viewBox ?? "0 0 1 1";
  const outerD = geometry?.outerD ?? "";
  const innerD = geometry?.innerD ?? "";
  const accentsD = geometry?.accentsD ?? "";

  return svg`
    <svg
      class="pointer-events-none absolute inset-0 block h-full w-full"
      style="overflow: visible;"
      viewBox=${viewBox}
      aria-hidden="true"
    >
      <defs>
        <filter id="hud-glow" x="-30%" y="-30%" width="160%" height="160%">
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
        d=${accentsD}
        fill="none"
        stroke="var(--color-brand-500)"
        stroke-width="4"
        stroke-linejoin="miter"
        filter="url(#hud-glow)"
      />
    </svg>
  `;
}
