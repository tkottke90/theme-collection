import { svg } from "lit";
import type { CasingGeometry } from "./casing-geometry.js";
import { hazardPattern } from "./hazard-frame-svg.js";

/** Renders the heavy-casing `<svg>` overlay; place inside a relative, isolated host. */
export function renderCasing(geometry: CasingGeometry | null) {
  const strip = geometry?.strip;

  return svg`
    <svg
      class="pointer-events-none absolute inset-0 block h-full w-full"
      viewBox=${geometry?.viewBox ?? "0 0 1 1"}
      aria-hidden="true"
    >
      <defs>${hazardPattern("casing-hazard", geometry?.pitch ?? 1, geometry?.stripeWidth ?? 0)}</defs>
      <path d=${geometry?.bodyD ?? ""} fill="var(--color-neutral-900)" />
      <path d=${geometry?.ruleD ?? ""} fill="none" stroke="var(--color-neutral-500)" stroke-width="1" />
      ${
        strip
          ? svg`
              <rect x=${strip.x} y=${strip.y} width=${strip.width} height=${strip.height} rx="2" fill="var(--color-brand-500)" />
              <rect
                x=${strip.x}
                y=${strip.y + strip.margin}
                width=${strip.width}
                height=${strip.height - 2 * strip.margin}
                fill="url(#casing-hazard)"
              />
            `
          : null
      }
      ${(geometry?.rivets ?? []).map(
        (r) => svg`<circle cx=${r.cx} cy=${r.cy} r="2.5" fill="var(--color-neutral-300)" />`,
      )}
    </svg>
  `;
}
