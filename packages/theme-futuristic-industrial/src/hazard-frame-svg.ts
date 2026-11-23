import { svg } from "lit";
import { HAZARD_SKEW_DEG, type HazardFrameGeometry } from "./hazard-frame-geometry.js";

/**
 * Renders the hazard-tape frame's `<svg>` overlay: an orange band around the
 * box with charcoal diagonal stripes inset from both of its edges, the same
 * layout as the reference sheet's hazard bar. Place inside a
 * `position: relative; isolation: isolate` host, like `renderPlateFrame`.
 *
 * The stripes are a `userSpaceOnUse` pattern, so they run continuously around
 * corners instead of restarting on each edge. The pattern is defined per
 * instance because shadow DOM scopes `url(#id)` references.
 */
export function renderHazardFrame(geometry: HazardFrameGeometry | null) {
  const viewBox = geometry?.viewBox ?? "0 0 1 1";
  const pitch = geometry?.pitch ?? 1;
  const stripeWidth = geometry?.stripeWidth ?? 0;

  return svg`
    <svg
      class="pointer-events-none absolute inset-0 block h-full w-full"
      viewBox=${viewBox}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="hazard-stripes"
          patternUnits="userSpaceOnUse"
          width=${pitch}
          height=${pitch}
          patternTransform="skewX(${HAZARD_SKEW_DEG})"
        >
          <rect width=${stripeWidth} height=${pitch} fill="var(--color-neutral-900)" />
        </pattern>
      </defs>
      <path d=${geometry?.innerD ?? ""} fill="var(--color-neutral-50)" />
      <path d=${geometry?.bandD ?? ""} fill="var(--color-brand-500)" fill-rule="evenodd" />
      <path d=${geometry?.stripeD ?? ""} fill="url(#hazard-stripes)" fill-rule="evenodd" />
    </svg>
  `;
}
