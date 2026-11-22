import { computeHudFrame, type HudFrameGeometry } from "./hud-geometry.js";
import { useResizeFrame } from "./useResizeFrame.js";

export interface HudFrameOptions {
  /** Corner cut size, px. */
  cut?: number;
  /** How far the top-left/bottom-right tabs stick out, px. */
  notch?: number;
  /** How far each tab runs along its edge, px (clamped to 40% of the width). */
  notchLength?: number;
}

/** `useResizeFrame` bound to Card/Stat's tab-and-chevron geometry. */
export function useHudFrame<T extends HTMLElement = HTMLElement>(options: HudFrameOptions = {}) {
  const { cut = 22, notch = 6, notchLength = 170 } = options;
  return useResizeFrame<T, HudFrameGeometry>(
    (w, h) => computeHudFrame(w, h, cut, notch, notchLength),
    [cut, notch, notchLength],
  );
}
