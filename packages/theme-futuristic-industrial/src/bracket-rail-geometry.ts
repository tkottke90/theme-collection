import { closed, type Point } from "./path-utils.js";

/**
 * Pure geometry for the bracket rail, from the orange rail down the reference
 * sheet's left edge: a vertical bar whose bottom sprouts a diagonal arm rising
 * to the right, like a "√". Proportions are from the source (16px bar, arm the
 * same width, leaning 0.47px right per px up and rising 3.75 bar-widths).
 */
const LEAN = 0.47;
const ARM_RISE = 3.75;

export interface BracketRailGeometry {
  viewBox: string;
  d: string;
  /** Rightmost x of the shape: content must start past this. */
  reach: number;
}

/**
 * @param bar Bar width, px.
 * @param inset Offset from the box edge so a stroke on the outline isn't clipped.
 */
export function computeBracketRail(
  w: number,
  h: number,
  bar = 10,
  inset = 1,
): BracketRailGeometry | null {
  if (!w || !h) return null;
  const x0 = inset;
  const x1 = inset + bar;
  const top = inset;
  const bottom = h - inset;
  // The arm's inner edge leaves the bar at bar / LEAN above the bottom, so it
  // must rise further than that; shorten it on a short rail.
  const rise = Math.min(ARM_RISE * bar, (bottom - top) * 0.5);
  if (rise <= bar / LEAN) {
    const d = closed([
      [x0, top],
      [x1, top],
      [x1, bottom],
      [x0, bottom],
    ]);
    return { viewBox: `0 0 ${w} ${h}`, d, reach: x1 };
  }

  const lean = LEAN * rise;
  const pts: Point[] = [
    [x0, top],
    [x1, top],
    [x1, bottom - bar / LEAN], // where the arm's inner edge leaves the bar
    [x0 + lean, bottom - rise],
    [x1 + lean, bottom - rise],
    [x1, bottom],
    [x0, bottom],
  ];
  return { viewBox: `0 0 ${w} ${h}`, d: closed(pts), reach: x1 + lean };
}
