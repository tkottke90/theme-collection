import {
  computeViewfinderFrame,
  type ViewfinderGeometry,
  type ViewfinderOptions,
} from "./viewfinder-geometry.js";
import { useResizeFrame } from "./useResizeFrame.js";

/** `useResizeFrame` bound to the viewfinder's tab/notch-plus-brackets geometry. */
export function useViewfinderFrame<T extends HTMLElement = HTMLElement>(
  options: ViewfinderOptions = {},
) {
  return useResizeFrame<T, ViewfinderGeometry>(
    (w, h) => computeViewfinderFrame(w, h, options),
    [options.radius, options.step, options.bracketInset],
  );
}
