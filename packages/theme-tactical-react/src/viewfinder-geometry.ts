/**
 * Pure geometry for the "viewfinder" panel frame: a rounded rectangle with a
 * deliberately *uneven* corner radius per corner and one small tab notch
 * breaking the top edge (the outer, "hand-fitted" layer), plus four
 * identical corner brackets inset from the edge (the inner, symmetrical
 * layer) — matching a reference HUD panel whose outer border reads as
 * slightly irregular while its inner corner highlights are perfectly
 * mirrored.
 *
 * This is an identical copy of `@tkottke90/theme-tactical-wc`'s
 * `viewfinder-geometry.ts` so both packages draw the same shape; it has no
 * framework dependency to actually share through, so it's duplicated rather
 * than pulled from a shared package.
 */

export interface ViewfinderOptions {
  /** Per-corner radius, px — deliberately uneven, not four equal corners. */
  radius?: { tl: number; tr: number; br: number; bl: number };
  /** Width/height/left-offset-fraction of the top-edge tab notch, px/px/0-1. */
  notch?: { width: number; depth: number; offsetFraction: number };
  /** How far each corner bracket sits in from the edge, px. */
  bracketMargin?: number;
  /** Each bracket arm's length, px. */
  bracketArm?: number;
}

const DEFAULT_RADIUS = { tl: 5, tr: 3, br: 6, bl: 4 };
const DEFAULT_NOTCH = { width: 40, depth: 8, offsetFraction: 0.58 };
const DEFAULT_BRACKET_MARGIN = 16;
const DEFAULT_BRACKET_ARM = 22;

export interface ViewfinderGeometry {
  viewBox: string;
  outerD: string;
  bracketsD: string;
}

function fmt(n: number): string {
  return (+n.toFixed(2)).toString();
}

/**
 * Computes the viewfinder frame's SVG geometry for a measured `w`×`h` box.
 * Returns `null` when there's nothing to measure yet (e.g. before first
 * layout).
 */
export function computeViewfinderFrame(
  w: number,
  h: number,
  options: ViewfinderOptions = {},
): ViewfinderGeometry | null {
  if (!w || !h) return null;

  const radius = options.radius ?? DEFAULT_RADIUS;
  const notch = options.notch ?? DEFAULT_NOTCH;
  const bracketMargin = options.bracketMargin ?? DEFAULT_BRACKET_MARGIN;
  const bracketArm = options.bracketArm ?? DEFAULT_BRACKET_ARM;

  // Keep each corner's own radius from eating more than half of either side.
  const maxR = Math.min(w, h) / 2 - 2;
  const tl = Math.min(radius.tl, maxR);
  const tr = Math.min(radius.tr, maxR);
  const br = Math.min(radius.br, maxR);
  const bl = Math.min(radius.bl, maxR);

  // The notch sits on the straight part of the top edge, between the TL and
  // TR corners' arcs, clamped so it can't collide with either.
  const notchWidth = Math.min(notch.width, Math.max(0, w - tl - tr - 8));
  const notchStart = Math.max(
    tl + 4,
    Math.min(w - tr - 4 - notchWidth, w * notch.offsetFraction - notchWidth / 2),
  );
  const notchDepth = notchWidth > 4 ? notch.depth : 0;

  // Rounded-rect outline, clockwise from just after the top-left arc, with
  // the notch cut into the straight run of the top edge. The tab notch steps
  // to y < 0 (above the box) — the panel's own `overflow: visible` lets that
  // render rather than clip, the same way the glow filter's blur already
  // bleeds past the box.
  const outerD = [
    `M ${fmt(tl)},0`,
    `L ${fmt(notchStart)},0`,
    ...(notchDepth > 0
      ? [
          `L ${fmt(notchStart)},${fmt(-notchDepth)}`,
          `L ${fmt(notchStart + notchWidth)},${fmt(-notchDepth)}`,
          `L ${fmt(notchStart + notchWidth)},0`,
        ]
      : []),
    `L ${fmt(w - tr)},0`,
    `A ${fmt(tr)} ${fmt(tr)} 0 0 1 ${fmt(w)},${fmt(tr)}`,
    `L ${fmt(w)},${fmt(h - br)}`,
    `A ${fmt(br)} ${fmt(br)} 0 0 1 ${fmt(w - br)},${fmt(h)}`,
    `L ${fmt(bl)},${fmt(h)}`,
    `A ${fmt(bl)} ${fmt(bl)} 0 0 1 0,${fmt(h - bl)}`,
    `L 0,${fmt(tl)}`,
    `A ${fmt(tl)} ${fmt(tl)} 0 0 1 ${fmt(tl)},0`,
    "Z",
  ].join(" ");

  // Four identical "camera viewfinder" corner brackets, inset uniformly —
  // unlike the outer border, these never vary corner to corner.
  const margin = Math.max(6, Math.min(bracketMargin, w * 0.12, h * 0.12));
  const arm = Math.max(8, Math.min(bracketArm, w / 2 - margin - 2, h / 2 - margin - 2));

  const bracket = (cx: number, cy: number, dx: 1 | -1, dy: 1 | -1) =>
    `M ${fmt(cx + dx * arm)},${fmt(cy)} L ${fmt(cx)},${fmt(cy)} L ${fmt(cx)},${fmt(cy + dy * arm)}`;

  const bracketsD = [
    bracket(margin, margin, 1, 1), // top-left
    bracket(w - margin, margin, -1, 1), // top-right
    bracket(w - margin, h - margin, -1, -1), // bottom-right
    bracket(margin, h - margin, 1, -1), // bottom-left
  ].join(" ");

  return { viewBox: `0 0 ${w} ${h}`, outerD, bracketsD };
}
