import { svg } from "lit";
import { HAZARD_SKEW_DEG, type HazardFrameGeometry } from "./hazard-frame-geometry.js";

/**
 * The reference bar's slanted stripes as a `userSpaceOnUse` pattern, for any
 * frame that needs a strip of hazard tape. Goes inside that svg's `<defs>`.
 */
export function hazardPattern(
  id: string,
  pitch: number,
  stripeWidth: number,
  fill = "var(--color-neutral-900)",
  skew = HAZARD_SKEW_DEG,
) {
  return svg`
    <pattern
      id=${id}
      patternUnits="userSpaceOnUse"
      width=${pitch}
      height=${pitch}
      patternTransform="skewX(${skew})"
    >
      <rect width=${stripeWidth} height=${pitch} fill=${fill} />
    </pattern>
  `;
}

/**
 * Renders the hazard-tape frame's `<svg>` overlay: an orange band around the
 * box with charcoal diagonal stripes inset from both of its edges, the same
 * layout as the reference sheet's hazard bar. Place inside a
 * `position: relative; isolation: isolate` host, like `renderPlateFrame`.
 *
 * The stripes are a `userSpaceOnUse` pattern, so they run continuously around
 * corners instead of restarting on each edge. The pattern is defined per
 * instance because shadow DOM scopes `url(#id)` references.
 *
 * `light` swaps to the sheet's lighter tape (the vertical column at its right
 * edge): orange stripes and edge lines on a light band. It uses brand-600, not
 * the sampled brand-500, because brand-500 is only 2.1:1 on the background and
 * a border needs 3:1.
 */
export type HazardVariant = "dark" | "light";

export function renderHazardFrame(
  geometry: HazardFrameGeometry | null,
  variant: HazardVariant = "dark",
) {
  const viewBox = geometry?.viewBox ?? "0 0 1 1";
  const pitch = geometry?.pitch ?? 1;
  const stripeWidth = geometry?.stripeWidth ?? 0;

  if (variant === "light") {
    return svg`
      <svg
        class="pointer-events-none absolute inset-0 block h-full w-full"
        viewBox=${viewBox}
        aria-hidden="true"
      >
        <defs>${hazardPattern("hazard-stripes", pitch, stripeWidth, "var(--color-brand-600)")}</defs>
        <path d=${geometry?.innerD ?? ""} fill="var(--color-neutral-50)" />
        <path d=${geometry?.bandD ?? ""} fill="var(--color-neutral-50)" fill-rule="evenodd" />
        <path d=${geometry?.bandD ?? ""} fill="url(#hazard-stripes)" fill-rule="evenodd" />
        <path d=${geometry?.edgesD ?? ""} fill="none" stroke="var(--color-brand-600)" stroke-width="1.5" />
      </svg>
    `;
  }

  return svg`
    <svg
      class="pointer-events-none absolute inset-0 block h-full w-full"
      viewBox=${viewBox}
      aria-hidden="true"
    >
      <defs>${hazardPattern("hazard-stripes", pitch, stripeWidth)}</defs>
      <path d=${geometry?.innerD ?? ""} fill="var(--color-neutral-50)" />
      <path d=${geometry?.bandD ?? ""} fill="var(--color-brand-500)" fill-rule="evenodd" />
      <path d=${geometry?.stripeD ?? ""} fill="url(#hazard-stripes)" fill-rule="evenodd" />
    </svg>
  `;
}
