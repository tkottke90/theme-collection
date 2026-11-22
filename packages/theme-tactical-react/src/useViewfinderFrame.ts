import {
  computeViewfinderFrame,
  type ViewfinderGeometry,
  type ViewfinderOptions,
} from "./viewfinder-geometry.js";
import { useResizeFrame } from "./useResizeFrame.js";

/** `useResizeFrame` bound to the viewfinder's uneven-corner-plus-brackets geometry. */
export function useViewfinderFrame<T extends HTMLElement = HTMLElement>(
  options: ViewfinderOptions = {},
) {
  return useResizeFrame<T, ViewfinderGeometry>(
    (w, h) => computeViewfinderFrame(w, h, options),
    [options.radius, options.notch, options.bracketMargin, options.bracketArm],
  );
}
