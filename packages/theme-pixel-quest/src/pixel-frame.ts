import { css } from "lit";

/**
 * Shared stepped-corner "pixel frame" used by Card/Container/Detail (a thin
 * single-layer frame) and the badge treatment used by Heading banners and
 * Button (a 3-layer frame: outer border, a gold ring, then the fill).
 *
 * Markup shape every user of this module follows:
 *   <div class="pixel-frame ...">
 *     <div class="pixel-frame__fill">...content...</div>
 *   </div>
 *
 * The fill MUST be a real, normal-flow child, not the root's own
 * background or a third pseudo-element. CSS only gives an element two
 * pseudo-elements, and a stacking context's own background always paints
 * *before* (behind) its negative-z-index pseudo-element children — so a
 * root background meant to be the innermost, most-visible layer actually
 * ends up the most hidden one. A normal-flow child has no such problem: it
 * paints after (in front of) its negative-z-index siblings by the same
 * rule, and it also keeps the frame's auto-sizing (absolutely positioned
 * descendants don't contribute to a parent's intrinsic size, so the three
 * background layers all stretch from `.pixel-frame__fill`'s natural size
 * via inset:0 — they do not determine it).
 *
 * All three concentric layers share one step size (`--pixel-step`) and the
 * same polygon, offset inward by each layer's own cumulative border width —
 * since the steps are axis-aligned right angles, not diagonals, insetting
 * by a border width just shifts the shape inward uniformly, with no
 * 45°-cut shrink correction needed.
 *
 * Each corner is a *pixel-circle* staircase, not a uniform 45° one. A
 * uniform staircase (equal steps the whole way) draws a straight diagonal
 * line in a blocky style — it never reads as rounded, no matter how fine
 * the steps get, because a line doesn't curve. A real circle's slope is
 * shallow near its tangent to the flat edges and steep near the 45°
 * midpoint, so pixel art rounds a corner with long, gentle steps near the
 * edges and short, tight ones in the middle — the same shape you get
 * rasterizing a circle at low resolution. `circleStairs()` computes that
 * directly from the circle equation (`y = R - √(R² - x²)`, solved for the
 * exact x at each pixel-grid depth level) rather than guessing step sizes.
 */
export const pixelFrameStyles = css`
  .pixel-frame {
    position: relative;
    isolation: isolate;
    display: inline-block;
  }

  .pixel-frame::before,
  .pixel-frame::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .pixel-frame::before {
    z-index: -3;
    background: var(--color-panel-border);
    clip-path: var(--pixel-frame-shape-outer);
  }

  .pixel-frame::after {
    z-index: -2;
    background: transparent;
    clip-path: var(--pixel-frame-shape-gold, none);
  }

  .pixel-frame.badge::after,
  .pixel-frame.accent::after {
    background: var(--color-panel-border-gold);
  }

  .pixel-frame__fill {
    clip-path: var(--pixel-frame-shape-fill);
  }

  .pixel-frame:not(.badge) .pixel-frame__fill {
    background-color: var(--color-bg);
  }

  .pixel-frame.badge .pixel-frame__fill {
    background-color: var(--color-panel);
    color: var(--color-panel-text);
  }
`;

/** A CSS length `inset + px`px from the near (left/top) edge. */
function near(inset: number, px: number): string {
  return `${inset + px}px`;
}

/** A CSS length `inset + px`px from the far (right/bottom) edge. */
function far(inset: number, px: number): string {
  return `calc(100% - ${inset + px}px)`;
}

/**
 * Depth levels and their circle-exact x-crossings for a quarter circle of
 * `radius`px, quantized to a `pixelSize`px grid. `depths[0..L]` runs
 * 0..radius (the levels a real pixel-circle corner steps through); `xAt[j]`
 * is the exact x where the circle first reaches `depths[j]`, i.e. where
 * that step actually happens — close together near `j=L` (steep part of
 * the curve), far apart near `j=0` (shallow part).
 */
function circleStairs(radius: number, pixelSize: number) {
  const levels = Math.max(1, Math.round(radius / pixelSize));
  const depths: number[] = [];
  const xAt: number[] = [];
  for (let j = 0; j <= levels; j++) {
    const d = Math.min(radius, j * pixelSize);
    depths.push(d);
    xAt.push(Math.sqrt(Math.max(0, radius * radius - (radius - d) * (radius - d))));
  }
  // remain[j]: how far the circle still has to go (in the *other* axis)
  // once it has reached depth level j — the exact circle x-crossing,
  // flipped, not a linear "radius - depth" guess.
  const remain = xAt.map((x) => radius - x);
  return { levels, depths, remain };
}

/**
 * A pixel-circle-cornered rectangle, inset by `inset`px, each corner
 * rounded to `radius`px on a `pixelSize`px grid. Walks clockwise from the
 * top edge, through each corner's circle-stair, to the next straight edge.
 */
function circleRect(pixelSize: number, radius: number, inset: number): string {
  const n = (px: number) => near(inset, px);
  const f = (px: number) => far(inset, px);
  const { levels: k, depths: D, remain: R } = circleStairs(radius, pixelSize);

  const points: string[] = [`${n(radius)} ${n(0)}`, `${f(radius)} ${n(0)}`];

  // m ranges 1..k and both arrays have length k+1 (indices 0..k), so every
  // lookup below is in bounds — the `!`s are working around TypeScript's
  // indexed-access typing, not skipping a real check.

  // top-right: walk right (toward the far edge) then down.
  for (let m = 1; m <= k; m++) {
    points.push(`${f(R[m]!)} ${n(D[m - 1]!)}`, `${f(R[m]!)} ${n(D[m]!)}`);
  }
  points.push(`${f(0)} ${f(radius)}`);

  // bottom-right: walk down then left.
  for (let m = 1; m <= k; m++) {
    points.push(`${f(D[m - 1]!)} ${f(R[m]!)}`, `${f(D[m]!)} ${f(R[m]!)}`);
  }
  points.push(`${n(radius)} ${f(0)}`);

  // bottom-left: walk left then up.
  for (let m = 1; m <= k; m++) {
    points.push(`${n(R[m]!)} ${f(D[m - 1]!)}`, `${n(R[m]!)} ${f(D[m]!)}`);
  }
  points.push(`${n(0)} ${n(radius)}`);

  // top-left: walk up then right.
  for (let m = 1; m <= k; m++) {
    points.push(`${n(D[m - 1]!)} ${n(R[m]!)}`, `${n(D[m]!)} ${n(R[m]!)}`);
  }

  return `polygon(${points.join(", ")})`;
}

/**
 * Builds the three clip-path values for a pixel-frame instance. Call once
 * per component (they're static per rung-3 shape, not runtime-dynamic) and
 * apply as inline custom properties:
 * `style="--pixel-frame-shape-outer: ${s.outer}; --pixel-frame-shape-gold: ${s.gold}; --pixel-frame-shape-fill: ${s.fill}"`
 *
 * `goldW: 0` (the default, for a plain Card/Container-style frame) collapses
 * the middle ring to the same shape as the fill, so it's invisible. Add
 * class `accent` (not `badge`) for a thin gold pinstripe with the plain
 * `--color-bg` fill instead of the full dark-green badge treatment — the
 * source image's own outer page frame uses exactly this (a gold line just
 * inside a dark border, not a filled badge).
 * `radius` is the corner's overall size (keep it roughly proportional to
 * the component, the same way you'd pick a `border-radius`); `pixelSize`
 * is the grid the circle snaps to — smaller reads finer/smoother, larger
 * reads chunkier, but either way the steps themselves stay non-uniform
 * (gradual near the edges, tight near the middle), because that's what the
 * circle equation actually produces, not a tuning knob.
 */
export function pixelFrameShapes(pixelSize = 2, outerW = 2, goldW = 0, radius = 24) {
  return {
    outer: circleRect(pixelSize, radius, 0),
    gold: circleRect(pixelSize, radius, outerW),
    fill: circleRect(pixelSize, radius, outerW + goldW),
  };
}

/** Renders a `pixelFrameShapes()` result as the inline `style` value every user of this module needs. */
export function pixelFrameShapeStyle(shape: ReturnType<typeof pixelFrameShapes>): string {
  return (
    `--pixel-frame-shape-outer: ${shape.outer}; ` +
    `--pixel-frame-shape-gold: ${shape.gold}; ` +
    `--pixel-frame-shape-fill: ${shape.fill};`
  );
}
