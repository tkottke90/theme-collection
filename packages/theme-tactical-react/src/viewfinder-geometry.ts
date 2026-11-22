/**
 * Pure geometry for the "viewfinder" panel frame: an outer outline whose four
 * main corners share one radius, but whose edges are interrupted by a raised
 * tab (top), and inward notches/recesses (right, bottom, left) — the
 * "hand-fitted" layer — plus a plain inset rounded-rect inner line, plus four
 * identical corner brackets (the symmetrical layer) — matching a reference
 * HUD panel whose outer silhouette reads as technical/irregular while its
 * inner corner highlights are perfectly mirrored.
 *
 * This is an identical copy of `@tkottke90/theme-tactical-wc`'s
 * `viewfinder-geometry.ts` so both packages draw the same shape; it has no
 * framework dependency to actually share through, so it's duplicated rather
 * than pulled from a shared package.
 */

export interface ViewfinderOptions {
  /** Main corner radius, px. */
  radius?: number;
  /** Depth of the top tab / side notches / bottom recess, px. */
  step?: number;
  /** How far the corner brackets sit in from the edge, px. */
  bracketInset?: number;
}

const DEFAULT_RADIUS = 10;
const DEFAULT_STEP = 6;
const DEFAULT_BRACKET_INSET = 22;

interface VPoint {
  p: readonly [number, number];
  r: number;
}

/**
 * The outline as a list of `{ point, radius }` pairs, clockwise, on the
 * outer edge (d = 0). `r` = main corner radius, `s` = depth of the tab/
 * notches. The top edge has a raised tab on its right-hand part, the right
 * and left edges each have a short notch pushed inward, and the bottom edge
 * has a wider recess pushed inward — main corners rounded by `r`, the small
 * step corners by a much smaller radius so they read as crisp steps.
 */
function outline(w: number, h: number, r: number, s: number): VPoint[] {
  const soft = Math.min(3, s / 2);

  // Feature positions as fractions of the edge, clamped so each feature fits.
  const seg = (len: number, a: number, b: number): [number, number] => {
    let A = len * a;
    let B = len * b;
    const min = 2 * s + 8;
    if (B - A < min) {
      const mid = (A + B) / 2;
      A = mid - min / 2;
      B = mid + min / 2;
    }
    return [A, B];
  };

  const tA = Math.max(r + s + 10, w * 0.6); // where the top tab starts
  const [rA, rB] = seg(h, 0.55, 0.62); // right notch
  const [bA, bB] = seg(w, 0.4, 0.62); // bottom recess
  const [lA, lB] = seg(h, 0.4, 0.47); // left notch

  const C = (x: number, y: number): VPoint => ({ p: [x, y], r }); // main corner
  const S = (x: number, y: number): VPoint => ({ p: [x, y], r: soft }); // step corner

  return [
    C(0, s), // TL
    S(tA, s),
    S(tA + s, 0), // top tab rises
    C(w, 0), // TR (on the tab)
    S(w, rA),
    S(w - s, rA + s), // right notch in
    S(w - s, rB - s),
    S(w, rB), // right notch out
    C(w, h), // BR
    S(bB, h),
    S(bB - s, h - s), // bottom recess up
    S(bA + s, h - s),
    S(bA, h), // bottom recess down
    C(0, h), // BL
    S(0, lB),
    S(s, lB - s), // left notch in
    S(s, lA + s),
    S(0, lA), // left notch out
  ];
}

/**
 * Shifts every vertex inward by `d`, keeping each edge parallel to the
 * original (a miter offset), preserving each vertex's own radius.
 */
function inset(pts: VPoint[], d: number): VPoint[] {
  const n = pts.length;
  const normal = (a: readonly [number, number], b: readonly [number, number]): [number, number] => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    return [-dy / len, dx / len];
  };
  return pts.map((v, i) => {
    const p = v.p;
    const n1 = normal(pts[(i - 1 + n) % n]!.p, p);
    const n2 = normal(p, pts[(i + 1) % n]!.p);
    const f = d / (1 + n1[0] * n2[0] + n1[1] * n2[1]);
    return {
      p: [p[0] + (n1[0] + n2[0]) * f, p[1] + (n1[1] + n2[1]) * f] as const,
      r: v.r,
    };
  });
}

function fmt(n: number): number {
  return +n.toFixed(2);
}

function ptStr([x, y]: readonly [number, number]): string {
  return `${fmt(x)},${fmt(y)}`;
}

/** Closed path with every vertex rounded by its own radius (quadratic curve). */
function rounded(pts: VPoint[]): string {
  const n = pts.length;
  let d = "";
  pts.forEach((v, i) => {
    const prev = pts[(i - 1 + n) % n]!.p;
    const next = pts[(i + 1) % n]!.p;
    const p = v.p;
    const lin = Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    const lout = Math.hypot(next[0] - p[0], next[1] - p[1]);
    const r = Math.min(v.r, lin / 2, lout / 2);
    const a: [number, number] = [
      p[0] + ((prev[0] - p[0]) * r) / lin,
      p[1] + ((prev[1] - p[1]) * r) / lin,
    ];
    const b: [number, number] = [
      p[0] + ((next[0] - p[0]) * r) / lout,
      p[1] + ((next[1] - p[1]) * r) / lout,
    ];
    d += `${i ? "L" : "M"}${ptStr(a)} Q${ptStr(p)} ${ptStr(b)} `;
  });
  return d + "Z";
}

/** Plain rounded rectangle (for the inner line — it ignores the tab/notches entirely). */
function roundedRect(x: number, y: number, w: number, h: number, r: number): string {
  return rounded([
    { p: [x, y], r },
    { p: [x + w, y], r },
    { p: [x + w, y + h], r },
    { p: [x, y + h], r },
  ]);
}

export interface ViewfinderGeometry {
  viewBox: string;
  outerD: string;
  innerD: string;
  bracketsD: string;
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

  const r = options.radius ?? DEFAULT_RADIUS;
  const s = options.step ?? DEFAULT_STEP;
  const m = options.bracketInset ?? DEFAULT_BRACKET_INSET;

  // Outer shape: inset by half its 2px stroke so the stroke isn't clipped.
  const base = outline(w, h, r, s);
  const outerD = rounded(inset(base, 1));

  // Inner line: a plain rounded rect inside every tab and notch.
  const di = s + 7;
  const innerD = roundedRect(
    di,
    di,
    Math.max(0, w - 2 * di),
    Math.max(0, h - 2 * di),
    Math.max(2, r - 4),
  );

  // Four identical "camera viewfinder" corner brackets, inset uniformly —
  // unlike the outer border, these never vary corner to corner. Horizontal
  // and vertical arm lengths are sized separately so a wide/tall panel gets
  // proportionally longer arms along its longer axis.
  const hx = Math.max(0, Math.min(90, (w - 2 * m) * 0.2));
  const vy = Math.max(0, Math.min(110, (h - 2 * m) * 0.22));
  const L = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) =>
    `M${fmt(x1)},${fmt(y1)} L${fmt(x2)},${fmt(y2)} L${fmt(x3)},${fmt(y3)}`;
  const x0 = m;
  const x1 = w - m;
  const y0 = m;
  const y1 = h - m;
  const bracketsD = [
    L(x0, y0 + vy, x0, y0, x0 + hx, y0), // top-left
    L(x1 - hx, y0, x1, y0, x1, y0 + vy), // top-right
    L(x1, y1 - vy, x1, y1, x1 - hx, y1), // bottom-right
    L(x0 + hx, y1, x0, y1, x0, y1 - vy), // bottom-left
  ].join(" ");

  return { viewBox: `0 0 ${w} ${h}`, outerD, innerD, bracketsD };
}
