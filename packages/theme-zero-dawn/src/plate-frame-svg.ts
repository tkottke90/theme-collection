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

const TONES: Record<
  PlateTone,
  { from: string; to: string; grid: string; gridOpacity: number; groove: string }
> = {
  light: {
    from: "var(--color-plate-50)",
    to: "var(--color-plate-100)",
    grid: "var(--color-core)",
    gridOpacity: 0.07,
    groove: "var(--color-plate-300)",
  },
  steel: {
    from: "var(--color-plate-700)",
    to: "var(--color-plate-800)",
    grid: "var(--color-plate-50)",
    gridOpacity: 0.05,
    groove: "var(--color-plate-500)",
  },
};

/**
 * Renders the plate frame as an absolutely-positioned SVG overlay behind the
 * host's content. Host needs `position: relative; isolation: isolate`.
 *
 * IDs (`zd-fill`, `zd-grid`, `zd-glow`) are fixed: each instance lives in its
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
        <pattern id="zd-grid" width="28" height="48.5" patternUnits="userSpaceOnUse">
          <path
            d="M0 0H28M0 24.25H28M0 0L28 48.5M14 0L28 24.25M0 24.25L14 48.5M28 0L0 48.5M14 0L0 24.25M28 24.25L14 48.5"
            fill="none"
            stroke=${t.grid}
            stroke-opacity=${t.gridOpacity}
            stroke-width="1"
          />
        </pattern>
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
            <path d=${g.plateD} fill="url(#zd-grid)" />
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
