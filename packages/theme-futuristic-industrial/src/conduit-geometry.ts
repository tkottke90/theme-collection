import { closed, roundedRect, type Point } from "./path-utils.js";

/**
 * Pure geometry for the conduit panel, from the reference sheet's large
 * top-right panel: a thin double rule with rounded bevels, open screw holes at
 * the two bottom corners, and a hazard-striped channel cutting diagonally
 * across the top-right corner.
 */

export interface ConduitGeometry {
  viewBox: string;
  outerD: string;
  innerD: string;
  /** The diagonal channel across the top-right corner, or null if the panel is too small. */
  channelD: string | null;
  screws: { cx: number; cy: number }[];
}

const RADIUS = 14;
const RULE_GAP = 6;
const SCREW_INSET = 18;
/**
 * The channel's two edges, as distances along each edge from the corner.
 * Both edges meet the straight parts of the inner rule, clear of its
 * rounded corner, and a content box padded 28px on top and right stays
 * clear of the outer edge (28 + 28 > CHANNEL_FAR).
 */
const CHANNEL_NEAR = 30;
const CHANNEL_FAR = 54;

export function computeConduit(w: number, h: number): ConduitGeometry | null {
  if (!w || !h || w < 2 * RULE_GAP + 2 || h < 2 * RULE_GAP + 2) return null;

  const g = RULE_GAP;
  let channelD: string | null = null;
  if (w > 3 * CHANNEL_FAR && h > 2 * CHANNEL_FAR) {
    // Each edge of the channel is a 45° line from the inner rule's top edge
    // (y = g) to its right edge (x = w - g).
    const pts: Point[] = [
      [w - CHANNEL_FAR + g, g],
      [w - CHANNEL_NEAR + g, g],
      [w - g, CHANNEL_NEAR - g],
      [w - g, CHANNEL_FAR - g],
    ];
    channelD = closed(pts);
  }

  return {
    viewBox: `0 0 ${w} ${h}`,
    outerD: roundedRect(1, 1, w - 2, h - 2, RADIUS),
    innerD: roundedRect(g, g, w - 2 * g, h - 2 * g, RADIUS - g),
    channelD,
    screws: [
      { cx: SCREW_INSET, cy: h - SCREW_INSET },
      { cx: w - SCREW_INSET, cy: h - SCREW_INSET },
    ],
  };
}
