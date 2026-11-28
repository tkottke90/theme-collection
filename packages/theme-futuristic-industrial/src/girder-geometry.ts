import { roundedPolygon, roundedRect, type Point } from "./path-utils.js";

/**
 * Pure geometry for the girder band, from the reference sheet's dark truss bar
 * (top left): a rounded charcoal bar whose interior is cut into a Warren
 * truss — 45° diagonals alternating direction, with flat joints where they
 * meet the top and bottom chords, so the openings are trapezoids rather than
 * triangles. The two end openings mirror each other.
 *
 * Proportions are fractions of the band height, read from the source bar.
 */
const CHORD = 0.13; // top/bottom chord thickness
const MEMBER = 0.18; // horizontal width of each diagonal
const JOINT = 0.9; // target flat-joint width, as a fraction of the opening height
const MIN_JOINT = 0.4;
const OUTER_RADIUS = 0.1;
const OPENING_RADIUS = 0.06;

export interface GirderGeometry {
  viewBox: string;
  /** Bar outline plus every opening; fill with `fill-rule="evenodd"`. */
  d: string;
  openings: number;
}

/**
 * Lays out the openings across an interior `width` wide and `rise` tall:
 * 2 × `pairs` diagonals, so 2 × `pairs` + 1 openings. Every flat joint and both
 * end openings' short sides share one width, solved so the openings fill the
 * interior exactly.
 */
export function openingPolygons(
  x0: number,
  y0: number,
  width: number,
  rise: number,
  member: number,
) {
  const y1 = y0 + rise;
  const period = 2 * (rise + member);
  let pairs = Math.max(0, Math.round((width - JOINT * rise) / (period + 2 * JOINT * rise)));
  let joint = (width - pairs * period) / (2 * pairs + 1);
  while (pairs > 0 && joint < MIN_JOINT * rise) {
    pairs -= 1;
    joint = (width - pairs * period) / (2 * pairs + 1);
  }
  if (pairs === 0) {
    return [
      [
        [x0, y0],
        [x0 + width, y0],
        [x0 + width, y1],
        [x0, y1],
      ] as Point[],
    ];
  }

  // Top-edge x of each diagonal's left side; "\" diagonals land `rise` to the
  // right at the bottom, "/" diagonals `rise` to the left.
  const tops: number[] = [];
  let t = x0 + joint;
  for (let i = 0; i < 2 * pairs; i++) {
    tops.push(t);
    t += i % 2 === 0 ? 2 * rise + member + joint : member + joint;
  }
  const bottom = (i: number) => tops[i]! + (i % 2 === 0 ? rise : -rise);

  const polys: Point[][] = [];
  polys.push([
    [x0, y0],
    [tops[0]!, y0],
    [bottom(0), y1],
    [x0, y1],
  ]);
  for (let i = 0; i < tops.length - 1; i++) {
    polys.push([
      [tops[i]! + member, y0],
      [tops[i + 1]!, y0],
      [bottom(i + 1), y1],
      [bottom(i) + member, y1],
    ]);
  }
  const last = tops.length - 1;
  polys.push([
    [tops[last]! + member, y0],
    [x0 + width, y0],
    [x0 + width, y1],
    [bottom(last) + member, y1],
  ]);
  return polys;
}

export function computeGirder(w: number, h: number): GirderGeometry | null {
  const chord = CHORD * h;
  if (!w || !h || w <= 4 * chord) return null;

  const polys = openingPolygons(chord, chord, w - 2 * chord, h - 2 * chord, MEMBER * h);
  const d = [
    roundedRect(0, 0, w, h, OUTER_RADIUS * h),
    ...polys.map((p) => roundedPolygon(p, OPENING_RADIUS * h)),
  ].join(" ");

  return { viewBox: `0 0 ${w} ${h}`, d, openings: polys.length };
}
