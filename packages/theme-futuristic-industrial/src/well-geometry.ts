import { closed, inset } from "./path-utils.js";
import { outline } from "./plate-geometry.js";

/**
 * Pure geometry for the control well, from the compartments holding the
 * up/down arrows on the reference sheet's top-right panel: a chamfered box
 * drawn as a double thin rule. All four corners are cut (the source cuts only
 * the left pair) so the well reads the same whichever side it sits on.
 */
const CUT = 10;
const RULE_GAP = 4;

export interface WellGeometry {
  viewBox: string;
  outerD: string;
  innerD: string;
}

export function computeWell(w: number, h: number): WellGeometry | null {
  if (!w || !h || w <= 2 * RULE_GAP + 4 || h <= 2 * RULE_GAP + 4) return null;
  const cut = Math.min(CUT, Math.min(w, h) / 3);
  const { pts } = outline(w, h, cut, new Set(["tl", "tr", "br", "bl"]));
  return {
    viewBox: `0 0 ${w} ${h}`,
    outerD: closed(inset(pts, 0.75)),
    innerD: closed(inset(pts, 0.75 + RULE_GAP)),
  };
}
