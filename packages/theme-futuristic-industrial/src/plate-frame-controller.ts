import type { ReactiveControllerHost } from "lit";
import { computePlateFrame, type PlateGeometry, type PlateOptions } from "./plate-geometry.js";
import { ResizeFrameController } from "./resize-frame-controller.js";

/** `ResizeFrameController` bound to the plate frame's chamfer/rivet/stripe geometry. */
export class PlateFrameController extends ResizeFrameController<PlateGeometry> {
  constructor(host: ReactiveControllerHost & HTMLElement, options: PlateOptions = {}) {
    super(host, (w, h) => computePlateFrame(w, h, options));
  }
}
