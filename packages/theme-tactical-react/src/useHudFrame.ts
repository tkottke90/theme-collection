import { useEffect, useRef, useState } from "preact/hooks";
import { computeHudFrame, type HudFrameGeometry } from "./hud-geometry.js";

export interface HudFrameOptions {
  /** Corner cut size, px. */
  cut?: number;
  /** How far the top-left/bottom-right tabs stick out, px. */
  notch?: number;
  /** How far each tab runs along its edge, px (clamped to 40% of the width). */
  notchLength?: number;
}

/**
 * Measures the element the returned `ref` is attached to with a
 * `ResizeObserver` and recomputes the HUD frame's SVG path strings whenever
 * its border-box size changes (fixed size, fluid width, or content-driven
 * height all trigger this the same way).
 */
export function useHudFrame<T extends HTMLElement = HTMLElement>(options: HudFrameOptions = {}) {
  const { cut = 22, notch = 6, notchLength = 170 } = options;
  const ref = useRef<T | null>(null);
  const [geometry, setGeometry] = useState<HudFrameGeometry | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      setGeometry(computeHudFrame(el.offsetWidth, el.offsetHeight, cut, notch, notchLength));
    };
    measure();

    // Environments without ResizeObserver (e.g. jsdom in tests) just never
    // get a redraw past the initial measurement — offsetWidth/Height are 0
    // there anyway, so `geometry` stays `null` and the frame degrades to
    // nothing rather than throwing.
    if (typeof ResizeObserver === "undefined") return;
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el, { box: "border-box" });
    return () => resizeObserver.disconnect();
  }, [cut, notch, notchLength]);

  return { ref, geometry } as const;
}
