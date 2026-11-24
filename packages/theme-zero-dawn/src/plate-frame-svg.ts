import { svg } from "lit";
import type { ReactiveControllerHost } from "lit";
import { computePlate, type PlateGeometry, type PlateOptions } from "./plate-geometry.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

/** `light` = sunlit armour plate (dark ink); `steel` = shaded plate (light ink). */
export type PlateTone = "light" | "steel";

/** `ResizeFrameController` bound to the machine-plate geometry. */
export class PlateFrameController extends ResizeFrameController<PlateGeometry> {
  constructor(host: ReactiveControllerHost & HTMLElement, options: PlateOptions = {}) {
    super(host, (w, h) => computePlate(w, h, options));
  }
}

interface ToneStyle {
  from: string;
  to: string;
  groove: string;
}

/**
 * Every plate, light or steel, is a clean face with a faceted bevel rim:
 * the band between the plate edge and the groove, shaded as flat facets
 * sloping away from the viewer toward a top-left light. Hard facets, no
 * blur: the plates are cut, not rounded.
 */
const TONES: Record<PlateTone, ToneStyle> = {
  light: {
    from: "var(--color-plate-50)",
    to: "var(--color-plate-100)",
    groove: "var(--color-plate-300)",
  },
  steel: {
    from: "var(--color-plate-700)",
    to: "var(--color-plate-800)",
    groove: "var(--color-plate-500)",
  },
};

/**
 * One bevel facet, shaded flat by how it faces the light: lit facets get a
 * paint-white wash, facets turned away get the core colour, darker the
 * further they turn.
 */
export function renderFacet(d: string, light: number) {
  return light > 0.01
    ? svg`<path class="facet lit" d=${d} fill="var(--color-paint)" fill-opacity=${(0.6 * light).toFixed(3)} />`
    : svg`<path class="facet shade" d=${d} fill="var(--color-core)" fill-opacity=${(0.12 + 0.38 * -light).toFixed(3)} />`;
}

/**
 * A plate's bevel band as flat, light-shaded facets, clipped to the clip path
 * `clipId` (the plate outline) so cut-outs like the seam notch stay open.
 */
export function renderBevel(geometry: PlateGeometry, clipId: string) {
  return svg`<g class="bevel" clip-path="url(#${clipId})">
    ${geometry.bevel.map((f) => renderFacet(f.d, f.light))}
  </g>`;
}

/**
 * Renders the plate frame as an absolutely-positioned SVG overlay behind the
 * host's content. Host needs `position: relative; isolation: isolate`.
 *
 * IDs (`zd-fill`, `zd-clip`, `zd-glow`) are fixed: each instance lives in its
 * own shadow root, which scopes them, so they never collide.
 */
export function renderPlateFrame(geometry: PlateGeometry | null, tone: PlateTone = "light") {
  const t = TONES[tone];
  const g = geometry;

  return svg`
    <svg
      class="pointer-events-none absolute inset-0 -z-10 block h-full w-full"
      style="overflow: visible"
      viewBox=${g?.viewBox ?? "0 0 1 1"}
      aria-hidden="true"
      part="frame"
    >
      <defs>
        <linearGradient id="zd-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style="stop-color: ${t.from}" />
          <stop offset="1" style="stop-color: ${t.to}" />
        </linearGradient>
        ${g ? svg`<clipPath id="zd-clip"><path d=${g.plateD} /></clipPath>` : null}
        <filter id="zd-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      ${
        g
          ? svg`
            <path d=${g.dropD} fill="var(--color-core-deep)" />
            <path d=${g.underD} fill="var(--color-core)" />
            <path d=${g.plateD} fill="url(#zd-fill)" />
            ${renderBevel(g, "zd-clip")}
            <path d=${g.grooveD} fill="none" stroke=${t.groove} stroke-width="1" />
            <path d=${g.wireD} fill="none" stroke="var(--color-wire)" stroke-width="1.5" />
            <path
              d=${g.glowD}
              fill="none"
              stroke="var(--color-brand-500)"
              stroke-width="2.5"
              stroke-linecap="square"
              filter="url(#zd-glow)"
            />
          `
          : null
      }
    </svg>
  `;
}

/**
 * Custom properties a plate sets on its content so slotted typography/links
 * pick an ink with enough contrast for that plate. Custom properties inherit
 * through the flattened (slotted) tree, so a `<theme-text>` inside a light
 * Card gets dark ink without the consumer doing anything.
 */
export const PLATE_INK_CLASSES: Record<PlateTone, string> = {
  light:
    "[--zd-ink:var(--color-core)] [--zd-ink-muted:var(--color-plate-ink-muted)] [--zd-link:var(--color-brand-900)] [--zd-accent:var(--color-tribe-red)]",
  steel:
    "[--zd-ink:var(--color-text)] [--zd-ink-muted:var(--color-text-muted)] [--zd-link:var(--color-brand-300)] [--zd-accent:var(--color-wire-300)]",
};
