import { closed, inset, type Point } from "./path-utils.js";

/**
 * Pure geometry for the stepped-tab panel, from the reference sheet's large
 * thin-ruled panel (bottom right): a raised tab at the top-left that holds the
 * heading, joined to the body by a 45° shoulder; a chamfered top-right corner;
 * and a 45° step in the bottom edge, so the left part of the bottom sits
 * higher than the right.
 */

export interface TabPanelOptions {
  /** Tab width, px — normally the measured heading label plus padding. Default 96. */
  tabWidth?: number;
  /** How far the tab rises above the body, px. Default 26. */
  tabHeight?: number;
  /** Top-right chamfer, px. Default 16. */
  cut?: number;
  /** Depth of the bottom-edge step, px. Default 10. */
  step?: number;
}

export interface TabPanelGeometry {
  viewBox: string;
  outerD: string;
  innerD: string;
  /** The tab width actually used, after clamping to the panel. */
  tabWidth: number;
}

export function outlinePoints(
  w: number,
  h: number,
  tabWidth: number,
  tabHeight: number,
  cut: number,
  step: number,
): Point[] {
  const stepX = Math.max(w * 0.35, step + 8);
  return [
    [0, 0],
    [tabWidth, 0],
    [tabWidth + tabHeight, tabHeight],
    [w - cut, tabHeight],
    [w, tabHeight + cut],
    [w, h],
    [stepX, h],
    [stepX - step, h - step],
    [0, h - step],
  ];
}

export function computeTabPanel(
  w: number,
  h: number,
  options: TabPanelOptions = {},
): TabPanelGeometry | null {
  const tabHeight = options.tabHeight ?? 26;
  const cut = options.cut ?? 16;
  const step = options.step ?? 10;
  if (!w || !h || h <= tabHeight + cut + step || w <= tabHeight + cut + 40) return null;

  // Keep the shoulder clear of the top-right chamfer on a narrow panel.
  const maxTab = w - cut - tabHeight - 24;
  const tabWidth = Math.max(40, Math.min(options.tabWidth ?? 96, maxTab));

  const pts = outlinePoints(w, h, tabWidth, tabHeight, cut, step);
  return {
    viewBox: `0 0 ${w} ${h}`,
    outerD: closed(inset(pts, 1)),
    innerD: closed(inset(pts, 6)),
    tabWidth,
  };
}
