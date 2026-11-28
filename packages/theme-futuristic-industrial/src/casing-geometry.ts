import { hazardStripeScale } from "./hazard-frame-geometry.js";
import { roundedRect } from "./path-utils.js";

/**
 * Pure geometry for the "heavy casing" frame, from the reference sheet's dark
 * mechanical-arm body: a charcoal panel with rounded corners, a thin light
 * rule inset from its edge, a rivet in each corner, and a strip of hazard tape
 * set into the bottom edge.
 */

export interface CasingOptions {
  /** Corner radius, px. Default 12. */
  radius?: number;
  /** Height of the hazard-tape inlay, px. 0 omits it. Default 12. */
  stripHeight?: number;
}

export interface CasingGeometry {
  viewBox: string;
  bodyD: string;
  ruleD: string;
  rivets: { cx: number; cy: number }[];
  strip: { x: number; y: number; width: number; height: number; margin: number } | null;
  pitch: number;
  stripeWidth: number;
}

const RULE_INSET = 6;
const RIVET_INSET = 14;
/** The strip starts past the rivets so the two never overlap. */
const STRIP_SIDE_INSET = 28;
const STRIP_BOTTOM_INSET = 12;
const MIN_STRIP_WIDTH = 40;

export function computeCasing(
  w: number,
  h: number,
  options: CasingOptions = {},
): CasingGeometry | null {
  if (!w || !h) return null;

  const r = options.radius ?? 12;
  const stripHeight = options.stripHeight ?? 12;
  const { pitch, stripeWidth, margin } = hazardStripeScale(stripHeight);

  const stripWidth = w - 2 * STRIP_SIDE_INSET;
  const strip =
    stripHeight > 0 && stripWidth >= MIN_STRIP_WIDTH && h > stripHeight + 2 * RIVET_INSET
      ? {
          x: STRIP_SIDE_INSET,
          y: h - STRIP_BOTTOM_INSET - stripHeight,
          width: stripWidth,
          height: stripHeight,
          margin,
        }
      : null;

  return {
    viewBox: `0 0 ${w} ${h}`,
    bodyD: roundedRect(0, 0, w, h, r),
    ruleD: roundedRect(
      RULE_INSET,
      RULE_INSET,
      Math.max(0, w - 2 * RULE_INSET),
      Math.max(0, h - 2 * RULE_INSET),
      r - RULE_INSET / 2,
    ),
    rivets: [
      { cx: RIVET_INSET, cy: RIVET_INSET },
      { cx: w - RIVET_INSET, cy: RIVET_INSET },
      { cx: w - RIVET_INSET, cy: h - RIVET_INSET },
      { cx: RIVET_INSET, cy: h - RIVET_INSET },
    ],
    strip,
    pitch,
    stripeWidth,
  };
}
