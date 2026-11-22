import { useEffect, useRef, useState } from "preact/hooks";

/**
 * Measures the element the returned `ref` is attached to with a
 * `ResizeObserver` and recomputes whatever `compute(width, height)` returns
 * whenever its border-box size changes (fixed size, fluid width, or
 * content-driven height all trigger this the same way).
 *
 * This is the generic measure-and-redraw primitive behind every SVG frame in
 * this package (`useHudFrame` for Card/Stat's tab-and-chevron frame,
 * `useViewfinderFrame` for the rounded corner-bracket frame) — it knows
 * nothing about path geometry, only about keeping `geometry` in sync with
 * the ref'd element's actual rendered size.
 *
 * `deps` is passed straight through to the underlying effect, the same as
 * `useEffect`/`useCallback`'s own dependency array — pass whatever `compute`
 * closes over (e.g. `[cut, notch, notchLength]`) so a changed option
 * re-measures with the new geometry function.
 */
export function useResizeFrame<TElement extends HTMLElement, TGeometry>(
  compute: (width: number, height: number) => TGeometry | null,
  deps: readonly unknown[],
) {
  const ref = useRef<TElement | null>(null);
  const [geometry, setGeometry] = useState<TGeometry | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      setGeometry(compute(el.offsetWidth, el.offsetHeight));
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
  }, deps);

  return { ref, geometry } as const;
}
