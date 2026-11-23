/**
 * Pure geometry for the "plate" panel frame: a measured-size rectangle whose
 * corners are each either a 45° chamfer (cut) or left square, plus a bolt
 * "rivet" circle at every square corner and an optional diagonal hazard-
 * stripe band running along one chamfered edge.
 *
 * Framework-free like `@tkottke90/theme-tactical-wc`'s `hud-geometry.ts` —
 * only `(width, height, options)` in, SVG path strings/circle centers out —
 * so it's unit-testable on its own and the Lit-specific rendering lives in
 * `plate-frame-svg.ts` instead. `PlateFrameController` reuses this and three
 * different option presets give Card, Container, and the bonus ID-plate
 * component three visually distinct borders from one tested shape.
 */

import { closed, inset, type Point } from "./path-utils.js";

export type Corner = "tl" | "tr" | "br" | "bl";

const ALL_CORNERS: Corner[] = ["tl", "tr", "br", "bl"];

export interface Outline {
  /** Outline points, clockwise, starting at the top edge. */
  pts: Point[];
  /** For each chamfered corner, the index pair of its two outline points. */
  cutIndex: Partial<Record<Corner, readonly [number, number]>>;
}

/**
 * Builds the outer outline: each corner in `cutCorners` becomes two points
 * (a 45° chamfer of size `cut`), every other corner stays a single square
 * point. Order is clockwise starting just right of the top-left corner, so
 * the result is a valid clockwise polygon for `inset()` regardless of which
 * corners are cut.
 */
export function outline(
  w: number,
  h: number,
  cut: number,
  cutCorners: ReadonlySet<Corner>,
): Outline {
  const pts: Point[] = [];
  const cutIndex: Outline["cutIndex"] = {};

  const corner = (name: Corner, square: Point, a: Point, b: Point) => {
    if (cutCorners.has(name)) {
      const i = pts.length;
      pts.push(a, b);
      cutIndex[name] = [i, i + 1];
    } else {
      pts.push(square);
    }
  };

  corner("tl", [0, 0], [0, cut], [cut, 0]);
  corner("tr", [w, 0], [w - cut, 0], [w, cut]);
  corner("br", [w, h], [w, h - cut], [w - cut, h]);
  corner("bl", [0, h], [cut, h], [0, h - cut]);

  return { pts, cutIndex };
}

const RIVET_POS: Record<Corner, (w: number, h: number, m: number) => Point> = {
  tl: (_w, _h, m) => [m, m],
  tr: (w, _h, m) => [w - m, m],
  br: (w, h, m) => [w - m, h - m],
  bl: (_w, h, m) => [m, h - m],
};

export interface PlateOptions {
  /** Chamfer size, px. Default 18. */
  cut?: number;
  /** Which corners are chamfered; the rest stay square. Default ["tl", "br"]. */
  cutCorners?: Corner[];
  /** Draw a rivet circle at each square (non-chamfered) corner. Default true. */
  rivets?: boolean;
  /** How far each rivet sits in from the two edges meeting at its corner. Default 14. */
  rivetMargin?: number;
  /** Rivet circle radius, px. Default 3. */
  rivetRadius?: number;
  /**
   * Which chamfered corner gets the diagonal hazard-stripe band. `null`
   * omits the stripe entirely. Defaults to the first entry of `cutCorners`.
   */
  stripeCorner?: Corner | null;
  /** Hazard-stripe band width, px. Default 10. */
  stripeWidth?: number;
}

export interface PlateGeometry {
  viewBox: string;
  outerD: string;
  innerD: string;
  stripeD: string | null;
  rivets: { cx: number; cy: number; r: number }[];
}

/**
 * Computes the plate frame's SVG geometry for a measured `w`×`h` box.
 * Returns `null` when there's nothing to measure yet (e.g. before first
 * layout).
 */
export function computePlateFrame(
  w: number,
  h: number,
  options: PlateOptions = {},
): PlateGeometry | null {
  if (!w || !h) return null;

  const cut = options.cut ?? 18;
  const cutCornersList = options.cutCorners ?? ["tl", "br"];
  const cutCorners = new Set(cutCornersList);
  const { pts, cutIndex } = outline(w, h, cut, cutCorners);

  const outerD = closed(inset(pts, 1));
  const innerD = closed(inset(pts, 9));

  const rivetMargin = options.rivetMargin ?? 14;
  const rivetRadius = options.rivetRadius ?? 3;
  const rivets =
    options.rivets === false
      ? []
      : ALL_CORNERS.filter((c) => !cutCorners.has(c)).map((c) => {
          const [cx, cy] = RIVET_POS[c](w, h, rivetMargin);
          return { cx, cy, r: rivetRadius };
        });

  const stripeCorner =
    options.stripeCorner === undefined ? (cutCornersList[0] ?? null) : options.stripeCorner;
  let stripeD: string | null = null;
  const stripeAt = stripeCorner ? cutIndex[stripeCorner] : undefined;
  if (stripeAt) {
    const stripeWidth = options.stripeWidth ?? 10;
    const [i, j] = stripeAt;
    const bandOuter = inset(pts, 2);
    const bandInner = inset(pts, 2 + stripeWidth);
    stripeD = closed([bandOuter[i]!, bandOuter[j]!, bandInner[j]!, bandInner[i]!]);
  }

  return { viewBox: `0 0 ${w} ${h}`, outerD, innerD, stripeD, rivets };
}
