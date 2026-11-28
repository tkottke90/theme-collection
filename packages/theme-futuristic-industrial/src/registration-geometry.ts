import { line } from "./path-utils.js";

/**
 * Pure geometry for the registration-mark frame, from the reference sheet's
 * crosshair square: four chamfered corner brackets with a gap at the middle of
 * each edge, each gap closed off by two short lines crossing the edge (they
 * poke out past the frame, like print registration marks). The source's thick
 * centre cross is left out — it would sit on top of the content.
 */

/** Gap at each edge's midpoint, as a fraction of the shorter side, so all four match. */
const GAP = 0.22;
/** How far each tick extends either side of the edge, px. */
export const TICK = 6;
const INSET = 1;

export interface RegistrationGeometry {
  viewBox: string;
  bracketsD: string;
  ticksD: string;
}

export function computeRegistration(w: number, h: number): RegistrationGeometry | null {
  if (!w || !h) return null;
  const i = INSET;
  const x1 = w - INSET;
  const y1 = h - INSET;
  const cx = w / 2;
  const cy = h / 2;
  const gx = (GAP * Math.min(w, h)) / 2;
  const gy = gx;
  // The chamfer must leave some straight run before each gap.
  const c = Math.max(0, Math.min(12, 0.12 * Math.min(w, h), cx - gx - i - 2, cy - gy - i - 2));

  const bracketsD = [
    line([i, cy - gy], [i, i + c], [i + c, i], [cx - gx, i]),
    line([cx + gx, i], [x1 - c, i], [x1, i + c], [x1, cy - gy]),
    line([x1, cy + gy], [x1, y1 - c], [x1 - c, y1], [cx + gx, y1]),
    line([cx - gx, y1], [i + c, y1], [i, y1 - c], [i, cy + gy]),
  ].join(" ");

  const ticksD = [
    // left and right edges: horizontal ticks at each end of the gap
    ...[cy - gy, cy + gy].flatMap((y) => [
      line([i - TICK, y], [i + TICK, y]),
      line([x1 - TICK, y], [x1 + TICK, y]),
    ]),
    // top and bottom edges: vertical ticks
    ...[cx - gx, cx + gx].flatMap((x) => [
      line([x, i - TICK], [x, i + TICK]),
      line([x, y1 - TICK], [x, y1 + TICK]),
    ]),
  ].join(" ");

  return { viewBox: `0 0 ${w} ${h}`, bracketsD, ticksD };
}
