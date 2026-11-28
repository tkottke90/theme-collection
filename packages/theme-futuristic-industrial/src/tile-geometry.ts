import { closed, roundedRect } from "./path-utils.js";

/**
 * Pure geometry for the corner-hatch tile, from the reference sheet's dark
 * rounded tile with light diagonal stripes cut into its bottom-right corner,
 * parallel to that corner's diagonal.
 */
const RADIUS = 10;
const STRIPES = 3;
const STRIPE = 5;
const GAP = 6;
/** Distance from the corner to the first stripe, measured along x + y. */
const FIRST = 12;

export interface TileGeometry {
  viewBox: string;
  bodyD: string;
  /** The hatch stripes; clip them to `bodyD` so they follow the rounded corner. */
  hatchD: string;
  /** How far the hatch reaches in from the corner, measured perpendicular to the stripes. */
  hatchReach: number;
}

export function computeTile(w: number, h: number): TileGeometry | null {
  if (!w || !h) return null;
  const corner = w + h;
  const pad = Math.max(w, h); // run each stripe well past the box; the clip trims it

  const bands = Array.from({ length: STRIPES }, (_, j) => {
    const near = corner - FIRST - j * (STRIPE + GAP);
    const far = near - STRIPE;
    // Each stripe is the band between the lines x + y = far and x + y = near.
    return closed([
      [near - h - pad, h + pad],
      [w + pad, near - w - pad],
      [w + pad, far - w - pad],
      [far - h - pad, h + pad],
    ]);
  });

  const reach = (FIRST + STRIPES * STRIPE + (STRIPES - 1) * GAP) / Math.SQRT2;
  return {
    viewBox: `0 0 ${w} ${h}`,
    bodyD: roundedRect(0, 0, w, h, RADIUS),
    hatchD: bands.join(" "),
    hatchReach: reach,
  };
}
