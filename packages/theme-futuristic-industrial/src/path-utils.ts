/**
 * Shared, framework-free SVG path helpers for every frame in this package.
 * Each frame's own geometry module builds its outline points and passes them
 * through these, so the inset math and path formatting live in one place.
 */

export type Point = readonly [number, number];

/**
 * Shifts every vertex inward by `d`, keeping each edge parallel to the
 * original (a miter offset) — the same approach as `theme-tactical-wc`'s
 * `hud-geometry.ts`. Points must run clockwise in screen coordinates
 * (y down), or the offset goes outward. A large `d` on a small shape can make
 * edges cross, so keep it well below the shortest edge.
 */
export function inset(pts: readonly Point[], d: number): Point[] {
  const n = pts.length;
  const normal = (a: Point, b: Point): Point => {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    return [-dy / len, dx / len];
  };
  return pts.map((p, i) => {
    const n1 = normal(pts[(i - 1 + n) % n] as Point, p);
    const n2 = normal(p, pts[(i + 1) % n] as Point);
    const f = d / (1 + n1[0] * n2[0] + n1[1] * n2[1]);
    return [p[0] + (n1[0] + n2[0]) * f, p[1] + (n1[1] + n2[1]) * f] as Point;
  });
}

/** Twice the signed area; positive means clockwise in screen coordinates. */
export function signedArea(pts: readonly Point[]): number {
  let a = 0;
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % pts.length]!;
    a += p[0] * q[1] - q[0] * p[1];
  });
  return a;
}

/** Returns the points in clockwise order, for `inset()`. */
export function clockwise(pts: readonly Point[]): Point[] {
  return signedArea(pts) < 0 ? [...pts].reverse() : [...pts];
}

export const fmt = (n: number) => +n.toFixed(2);
const pt = ([x, y]: Point) => `${fmt(x)},${fmt(y)}`;

/** Closed polygon path. */
export const closed = (pts: readonly Point[]) => "M" + pts.map(pt).join(" L") + " Z";

/** Open polyline path. */
export const line = (...pts: Point[]) => "M" + pts.map(pt).join(" L");

/** Rounded rectangle path; `r` is clamped to fit. */
export function roundedRect(x: number, y: number, w: number, h: number, r: number): string {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  const a = (ex: number, ey: number) => `A${fmt(rr)},${fmt(rr)} 0 0 1 ${fmt(ex)},${fmt(ey)}`;
  return [
    `M${fmt(x + rr)},${fmt(y)}`,
    `H${fmt(x + w - rr)}`,
    a(x + w, y + rr),
    `V${fmt(y + h - rr)}`,
    a(x + w - rr, y + h),
    `H${fmt(x + rr)}`,
    a(x, y + h - rr),
    `V${fmt(y + rr)}`,
    a(x + rr, y),
    "Z",
  ].join(" ");
}
