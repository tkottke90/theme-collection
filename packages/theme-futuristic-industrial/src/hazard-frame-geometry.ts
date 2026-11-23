import { closed, inset, outline, type Corner } from "./plate-geometry.js";

/**
 * Proportions of the reference sheet's hazard-stripe bar, measured in pixels
 * from the source image (a 67px-tall bar). The frame scales all of these by
 * `thickness / SOURCE_HEIGHT`, so a thinner or thicker border keeps the same
 * stripe spacing, stripe width, and orange margin as the original bar.
 */
const SOURCE_HEIGHT = 67;
const SOURCE_PITCH = 78;
const SOURCE_STRIPE_WIDTH = 40;
const SOURCE_MARGIN = 10;

/** Stripe lean: 42px of horizontal travel over the 47px stripe height. */
export const HAZARD_SKEW_DEG = 41.8;

export interface HazardFrameOptions {
  /** Width of the striped band, px. Default 18. */
  thickness?: number;
  /** Chamfer size, px. Default 2 × thickness. */
  cut?: number;
  /** Which corners are chamfered. Default ["tr", "bl"], matching the source bar's ends. */
  cutCorners?: Corner[];
}

export interface HazardFrameGeometry {
  viewBox: string;
  /** Orange band: the outer outline plus the inner window, filled evenodd. */
  bandD: string;
  /** Stripe region: the band shrunk by the orange margin on both sides, filled evenodd. */
  stripeD: string;
  /** The content window inside the band. */
  innerD: string;
  /** Distance between stripe starts, px. */
  pitch: number;
  /** Horizontal width of one stripe, px. */
  stripeWidth: number;
}

/**
 * Computes the hazard frame's SVG geometry for a measured `w`×`h` box.
 * Returns `null` when there's nothing to measure yet, or when the box is too
 * small for the band to leave any content window.
 */
export function computeHazardFrame(
  w: number,
  h: number,
  options: HazardFrameOptions = {},
): HazardFrameGeometry | null {
  const t = options.thickness ?? 18;
  if (!w || !h || w <= 2 * t || h <= 2 * t) return null;

  // A chamfer under ~0.586 × the inset distance collapses when inset, so the
  // inner window would lose its cut corner; keep it comfortably above that.
  const cut = Math.max(options.cut ?? 2 * t, t);
  const cutCorners = new Set<Corner>(options.cutCorners ?? ["tr", "bl"]);
  const { pts } = outline(w, h, cut, cutCorners);

  const scale = t / SOURCE_HEIGHT;
  const margin = SOURCE_MARGIN * scale;

  const innerD = closed(inset(pts, t));
  const bandD = `${closed(pts)} ${innerD}`;
  const stripeD = `${closed(inset(pts, margin))} ${closed(inset(pts, t - margin))}`;

  return {
    viewBox: `0 0 ${w} ${h}`,
    bandD,
    stripeD,
    innerD,
    pitch: +(SOURCE_PITCH * scale).toFixed(2),
    stripeWidth: +(SOURCE_STRIPE_WIDTH * scale).toFixed(2),
  };
}
