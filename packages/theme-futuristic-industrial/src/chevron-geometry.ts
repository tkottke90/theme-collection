import { closed, type Point } from "./path-utils.js";

/**
 * Pure geometry for the chevron rule, from the reference sheet's row of dark
 * chevrons (bottom left) and the stacked ones in the centre: chunky chevrons
 * packed close together. All proportions are fractions of the rule's
 * thickness, measured from the uncropped centre stack (40px wide: 20px arms,
 * 26px pitch).
 */
const SLOPE = 0.8; // how far each arm leans along the rule per unit of thickness
const ARM = 0.5; // arm width along the rule
const PITCH = 0.65; // distance between chevron starts

export type ChevronDirection = "right" | "left" | "down" | "up";

export interface ChevronGeometry {
  viewBox: string;
  d: string;
  count: number;
}

/**
 * Lays chevrons pointing along +u across a rule `length` long and `thickness`
 * wide, centred so the row never ends on a partial chevron.
 */
export function chevronsAlong(length: number, thickness: number): Point[][] {
  const t = thickness;
  const tip = SLOPE * (t / 2);
  const extent = ARM * t + tip;
  const pitch = PITCH * t;
  if (length < extent) return [];
  const count = Math.floor((length - extent) / pitch) + 1;
  const start = (length - ((count - 1) * pitch + extent)) / 2;

  return Array.from({ length: count }, (_, i) => {
    const u = start + i * pitch;
    return [
      [u, 0],
      [u + ARM * t, 0],
      [u + ARM * t + tip, t / 2],
      [u + ARM * t, t],
      [u, t],
      [u + tip, t / 2],
    ] as Point[];
  });
}

export function computeChevrons(
  w: number,
  h: number,
  direction: ChevronDirection = "right",
): ChevronGeometry | null {
  if (!w || !h) return null;
  const vertical = direction === "down" || direction === "up";
  const length = vertical ? h : w;
  const thickness = vertical ? w : h;

  const map = (p: Point): Point => {
    const [u, v] = p;
    switch (direction) {
      case "left":
        return [length - u, v];
      case "down":
        return [v, u];
      case "up":
        return [v, length - u];
      default:
        return [u, v];
    }
  };

  const shapes = chevronsAlong(length, thickness);
  return {
    viewBox: `0 0 ${w} ${h}`,
    d: shapes.map((s) => closed(s.map(map))).join(" "),
    count: shapes.length,
  };
}
