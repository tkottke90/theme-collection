import { closed, type Point } from "./path-utils.js";

/**
 * Pure geometry for the stripe band, from the reference sheet's bottom-right
 * band: a solid orange block that breaks into evenly spaced "/" stripes, inside
 * a thin outline whose right end is slanted to match. Proportions are fractions
 * of the band's height, measured from the source (40px tall: 13.5px stripes
 * every 29.7px, leaning 0.4px per px of height).
 */
const LEAN = 0.4;
const STRIPE = 0.34;
const PITCH = 0.74;
/** Gap between the outline and the filled band, px. */
const GAP = 3;

export interface StripeBandGeometry {
  viewBox: string;
  outlineD: string;
  /** The solid block plus every stripe. */
  fillD: string;
  stripes: number;
}

/** A "/" parallelogram whose top edge runs from `x` to `x + width`. */
function slanted(x: number, width: number, top: number, bottom: number): Point[] {
  const shift = LEAN * (bottom - top);
  return [
    [x, top],
    [x + width, top],
    [x + width - shift, bottom],
    [x - shift, bottom],
  ];
}

/**
 * @param solid Fraction of the band's length taken by the solid block, 0–1.
 */
export function computeStripeBand(w: number, h: number, solid = 0.34): StripeBandGeometry | null {
  if (!w || !h || w < 4 * GAP || h <= 2 * GAP + 2) return null;

  const top = GAP;
  const bottom = h - GAP;
  const bh = bottom - top;
  const shift = LEAN * bh;
  const end = w - GAP; // top-right x of the band; the end slants back by `shift`
  const stripe = STRIPE * bh;
  const pitch = PITCH * bh;

  const half = 0.5; // keep the 1px outline inside the svg box
  const outlineD = closed([
    [half, half],
    [w - half, half],
    [w - half - LEAN * (h - 1), h - half],
    [half, h - half],
  ]);

  // The block's left end is square, so it starts at x = GAP along the whole height.
  const blockEnd = GAP + shift + Math.max(0, Math.min(1, solid)) * (end - GAP - shift);
  const shapes: Point[][] = [
    [
      [GAP, top],
      [blockEnd, top],
      [blockEnd - shift, bottom],
      [GAP, bottom],
    ],
  ];

  for (let x = blockEnd + (pitch - stripe); x < end; x += pitch) {
    shapes.push(slanted(x, Math.min(stripe, end - x), top, bottom));
  }

  return {
    viewBox: `0 0 ${w} ${h}`,
    outlineD,
    fillD: shapes.map(closed).join(" "),
    stripes: shapes.length - 1,
  };
}
