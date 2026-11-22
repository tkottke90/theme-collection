import type { JSX } from "preact";

/**
 * Two-corner chamfer frame shared by every panel-like component (Card, Stat).
 * Matches the HUD reference: only the top-left and bottom-right corners are
 * cut at 45°, the other two stay sharp, and the cut is a FIXED pixel size —
 * not a percentage of the panel — so it doesn't distort into a stretched
 * diagonal on wide/short panels the way a percentage-based cut would.
 *
 * A plain CSS `border` on the host, combined with `clip-path: frameClipPath()`
 * removing the two chamfered corners' triangles, already draws correctly
 * along every straight edge and both sharp corners — `clip-path` only cuts
 * geometry, it doesn't add new border pixels along the freshly exposed
 * diagonal edges. Those two small diagonal accents are the one thing the
 * plain border can't draw, so that's the only part rendered as SVG here,
 * each a small fixed-size (not stretched) square so the line is never
 * distorted.
 */
export const FRAME_NOTCH = 16;

/** The matching `clip-path` value for a panel's own fill/border. */
export function frameClipPath(notch: number = FRAME_NOTCH): string {
  const n = `${notch}px`;
  return `polygon(${n} 0, 100% 0, 100% calc(100% - ${n}), calc(100% - ${n}) 100%, 0 100%, 0 ${n})`;
}

function CornerAccent({
  notch,
  corner,
}: {
  notch: number;
  corner: "top-left" | "bottom-right";
}): JSX.Element {
  const placement = corner === "top-left" ? { top: 0, left: 0 } : { bottom: 0, right: 0 };

  return (
    <svg
      className="pointer-events-none absolute block"
      style={{ ...placement, width: notch, height: notch }}
      viewBox={`0 0 ${notch} ${notch}`}
      aria-hidden="true"
    >
      {/* eslint-disable react/no-unknown-property -- Preact (unlike React) doesn't
      camelCase-normalize SVG attributes; these must stay kebab-case or the browser ignores them. */}
      <line
        x1={0}
        y1={notch}
        x2={notch}
        y2={0}
        stroke="var(--color-brand-500)"
        stroke-width={1.5}
        vector-effect="non-scaling-stroke"
        style={{ filter: "drop-shadow(0 0 3px var(--color-brand-500))" }}
      />
      {/* eslint-enable react/no-unknown-property */}
    </svg>
  );
}

/** Renders the glowing chamfer accents. Place inside a `relative` parent that also sets `clip-path: frameClipPath()` and its own `border`. */
export function ThemeFrame({ notch = FRAME_NOTCH }: { notch?: number }): JSX.Element {
  return (
    <>
      <CornerAccent notch={notch} corner="top-left" />
      <CornerAccent notch={notch} corner="bottom-right" />
    </>
  );
}
