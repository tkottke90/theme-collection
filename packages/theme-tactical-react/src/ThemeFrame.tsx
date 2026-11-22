import type { JSX } from "preact";

/**
 * Notch-cut panel frame shared by every panel-like component (Card, Stat,
 * ProgressBar, RadialGauge). A CSS `clip-path` can cut a div's fill/content
 * to this same notched octagon, but `clip-path` also clips away anything
 * drawn with `border`/`box-shadow` on that div — there's no way to stroke a
 * glowing outline along a clipped non-rectangular edge with plain CSS. The
 * SVG `<path>` below is overlaid on top of (and unaffected by) the clipped
 * div, and is what actually draws that outline.
 *
 * `FRAME_NOTCH` must match the percentage used in each component's own
 * `clip-path: polygon(...)` (see `frameClipPath()`) so the stroke and the
 * clipped fill line up exactly.
 */
export const FRAME_NOTCH = 12;

function framePath(notch: number): string {
  const n = notch;
  const f = 100 - n;
  return `M ${n},0 L ${f},0 L 100,${n} L 100,${f} L ${f},100 L ${n},100 L 0,${f} L 0,${n} Z`;
}

/** Renders the glowing notched-outline overlay. Place inside a `relative` parent. */
export function ThemeFrame({ notch = FRAME_NOTCH }: { notch?: number }): JSX.Element {
  return (
    <svg
      className="pointer-events-none absolute inset-0 block h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* eslint-disable react/no-unknown-property -- Preact (unlike React) doesn't
      camelCase-normalize SVG attributes; these must stay kebab-case or the browser ignores them. */}
      <path
        d={framePath(notch)}
        fill="none"
        stroke="var(--color-brand-500)"
        stroke-width={1.5}
        vector-effect="non-scaling-stroke"
        style={{ filter: "drop-shadow(0 0 3px var(--color-brand-500))" }}
      />
      {/* eslint-enable react/no-unknown-property */}
    </svg>
  );
}

/** The matching `clip-path` value for a notched panel's own fill/background. */
export function frameClipPath(notch: number = FRAME_NOTCH): string {
  const n = notch;
  const f = 100 - n;
  return `polygon(${n}% 0, ${f}% 0, 100% ${n}%, 100% ${f}%, ${f}% 100%, ${n}% 100%, 0 ${f}%, 0 ${n}%)`;
}
