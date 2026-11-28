import type { ReactiveControllerHost } from "lit";
import {
  computeHazardFrame,
  type HazardFrameGeometry,
  type HazardFrameOptions,
} from "./hazard-frame-geometry.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

/** `ResizeFrameController` bound to the hazard-tape frame's geometry. */
export class HazardFrameController extends ResizeFrameController<HazardFrameGeometry> {
  constructor(host: ReactiveControllerHost & HTMLElement, options: HazardFrameOptions = {}) {
    super(host, (w, h) => computeHazardFrame(w, h, options));
  }
}
