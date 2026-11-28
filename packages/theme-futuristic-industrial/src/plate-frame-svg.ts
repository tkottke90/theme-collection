import { svg } from "lit";
import type { PlateGeometry } from "./plate-geometry.js";

/**
 * Renders the plate frame's `<svg>` overlay for a given (possibly not-yet-
 * measured) geometry: a chamfered outer outline, a thin inset inner line, an
 * optional diagonal hazard-stripe band, and a rivet circle per square
 * corner. Place inside a `position: relative; isolation: isolate` host — the
 * svg itself is `position: absolute; inset: 0; z-index: -1` so it never
 * affects the host's own layout.
 *
 * The hazard-stripe `<pattern>` is defined inline per instance rather than
 * shared globally, same reasoning as `theme-tactical-wc`'s `hud-frame-svg.ts`:
 * an `id` referenced via `url(#id)` from inside a shadow root doesn't resolve
 * to a definition outside that same shadow root.
 */
export function renderPlateFrame(geometry: PlateGeometry | null) {
  const viewBox = geometry?.viewBox ?? "0 0 1 1";
  const outerD = geometry?.outerD ?? "";
  const innerD = geometry?.innerD ?? "";
  const stripeD = geometry?.stripeD ?? null;
  const rivets = geometry?.rivets ?? [];

  return svg`
    <svg
      class="pointer-events-none absolute inset-0 block h-full w-full"
      style="overflow: visible;"
      viewBox=${viewBox}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="plate-hazard"
          width="10"
          height="10"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <rect width="10" height="10" fill="var(--color-neutral-900)" />
          <rect width="5" height="10" fill="var(--color-brand-500)" />
        </pattern>
      </defs>
      <path d=${outerD} fill="var(--color-neutral-50)" stroke="var(--color-neutral-900)" stroke-width="2" />
      <path d=${innerD} fill="none" stroke="var(--color-neutral-300)" stroke-width="1" />
      ${
        stripeD
          ? svg`<path
              d=${stripeD}
              fill="url(#plate-hazard)"
              stroke="var(--color-neutral-900)"
              stroke-width="1"
            />`
          : null
      }
      ${rivets.map(
        (r) =>
          svg`<circle
            cx=${r.cx}
            cy=${r.cy}
            r=${r.r}
            fill="var(--color-neutral-900)"
            stroke="var(--color-neutral-300)"
            stroke-width="1"
          />`,
      )}
    </svg>
  `;
}
