/**
 * Pure geometry for the HUD panel frame: a measured-size outline (two 45°
 * corner cuts, a raised tab top-left and a mirrored tab bottom-right) plus
 * glowing accent segments, all derived from one list of outline points.
 *
 * This is deliberately framework-free — `useHudFrame` (a Preact hook) is the
 * only thing that knows about Preact; this module just turns `(width,
 * height, cut, notch, notchLength)` into SVG path strings. It's an identical
 * copy of `@tkottke90/theme-tactical-wc`'s `hud-geometry.ts` so both packages
 * draw the same shape; it has no framework dependency to actually share
 * through, so it's duplicated rather than pulled from a shared package.
 */

export type Point = readonly [number, number];

/**
 * The outline as 12 points on the outer edge, clockwise, in screen
 * coordinates (y increases downward). `c` = corner cut, `s` = how far the
 * tabs stick out, `L` = tab length. The top edge has a raised tab at the
 * top-left, and the bottom edge has a mirrored tab at the bottom-right; every
 * corner is a plain 45° cut. To change the shape (add a notch, a step, or
 * another tab), edit only this list — everything else is derived from it.
 */
export function outline(w: number, h: number, c: number, s: number, L: number): Point[] {
  return [
    [0, c],
    [c, 0],
    [L, 0],
    [L + s, s],
    [w - c, s],
    [w, s + c],
    [w, h - c],
    [w - c, h],
    [w - L, h],
    [w - L - s, h - s],
    [c, h - s],
    [0, h - s - c],
  ];
}

/**
 * Shifts every vertex inward by `d`, keeping each edge parallel to the
 * original (a miter offset). Works for the concave tab steps as well as the
 * convex corners. The points must be clockwise (otherwise the inset goes
 * outward), and no two consecutive edges can point in exactly opposite
 * directions — a large `d` on a small shape can also make edges cross, so
 * keep it well below `s + c`.
 */
export function inset(pts: Point[], d: number): Point[] {
  const n = pts.length;
  const normal = (a: Point, b: Point): Point => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    return [-dy / len, dx / len];
  };
  return pts.map((p, i) => {
    const n1 = normal(pts[(i - 1 + n) % n] as Point, p);
    const n2 = normal(p, pts[(i + 1) % n] as Point);
    const f = d / (1 + n1[0] * n2[0] + n1[1] * n2[1]);
    return [p[0] + (n1[0] + n2[0]) * f, p[1] + (n1[1] + n2[1]) * f] as Point;
  });
}

const fmt = ([x, y]: Point) => `${+x.toFixed(2)},${+y.toFixed(2)}`;
export const closed = (pts: Point[]) => "M" + pts.map(fmt).join(" L") + " Z";
export const line = (...pts: Point[]) => "M" + pts.map(fmt).join(" L");

export interface HudFrameGeometry {
  viewBox: string;
  outerD: string;
  innerD: string;
  accentsD: string;
}

/**
 * Computes the frame's SVG geometry for a measured `w`×`h` box. Returns
 * `null` when there's nothing to measure yet (e.g. before first layout).
 */
export function computeHudFrame(
  w: number,
  h: number,
  cut: number,
  notch: number,
  notchLength: number,
): HudFrameGeometry | null {
  if (!w || !h) return null;

  // Tab length: clamp so it fits narrow panels and stays longer than the cut.
  const L = Math.max(cut + 3 * notch, Math.min(notchLength, w * 0.4));

  const base = outline(w, h, cut, notch, L);
  const outerD = closed(inset(base, 1));
  const innerD = closed(inset(base, 7));

  // Accents run along the centre of a 4px stroke, so inset by 2.
  const P = inset(base, 2);
  const chev = Math.min(60, (P[4]![0] - P[3]![0]) * 0.3);
  const drop = Math.min(22, (P[6]![1] - P[5]![1]) * 0.2);
  const tab = Math.min(70, (P[2]![0] - P[1]![0]) * 0.6);

  const parts = [
    // bar on the top-left tab
    line([P[1]![0] + 14, P[1]![1]], [P[1]![0] + 14 + tab, P[1]![1]]),
    // short bar on the left edge, under the TL cut
    line([P[0]![0], P[0]![1] + 14], [P[0]![0], P[0]![1] + 14 + Math.min(50, h * 0.2)]),
    // top-right chevron
    line([P[4]![0] - chev, P[4]![1]], P[4]!, P[5]!, [P[5]![0], P[5]![1] + drop]),
    // bottom-left chevron
    line([P[11]![0], P[11]![1] - drop], P[11]!, P[10]!, [P[10]![0] + chev, P[10]![1]]),
    // bar on the bottom-right tab (mirror of the top-left one)
    line([P[7]![0] - 14 - tab, P[7]![1]], [P[7]![0] - 14, P[7]![1]]),
  ];

  // right bar on the straight part of the right edge, clear of both corners
  const rStart = Math.max(h * 0.5, P[5]![1] + drop + 20);
  const rEnd = Math.min(h * 0.85, P[6]![1] - 16);
  if (rEnd - rStart > 10) parts.push(line([P[5]![0], rStart], [P[5]![0], rEnd]));

  return { viewBox: `0 0 ${w} ${h}`, outerD, innerD, accentsD: parts.join(" ") };
}
