import type { ReactiveControllerHost } from "lit";
import { computeHudFrame, type HudFrameGeometry } from "./hud-geometry.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

export interface HudFrameOptions {
  /** Corner cut size, px. */
  cut?: number;
  /** How far the top-left/bottom-right tabs stick out, px. */
  notch?: number;
  /** How far each tab runs along its edge, px (clamped to 40% of the width). */
  notchLength?: number;
}

/** `ResizeFrameController` bound to Card/Stat's tab-and-chevron geometry. */
export class HudFrameController extends ResizeFrameController<HudFrameGeometry> {
  constructor(host: ReactiveControllerHost & HTMLElement, options: HudFrameOptions = {}) {
    const { cut = 22, notch = 6, notchLength = 170 } = options;
    super(host, (w, h) => computeHudFrame(w, h, cut, notch, notchLength));
  }
}
