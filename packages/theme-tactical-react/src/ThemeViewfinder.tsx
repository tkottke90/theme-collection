import type { ComponentChildren, JSX } from "preact";
import { ViewfinderFrameSvg } from "./ViewfinderFrameSvg.js";
import { useViewfinderFrame } from "./useViewfinderFrame.js";

export interface ThemeViewfinderProps {
  heading?: string;
  children?: ComponentChildren;
}

/**
 * A generic bordered panel, like `ThemeCard`, but with the "viewfinder"
 * two-layer border: an outer rounded outline with deliberately uneven
 * corners and a tab notch, plus four identical, symmetrical corner-bracket
 * accents inset from the edge.
 */
export function ThemeViewfinder({ heading, children }: ThemeViewfinderProps): JSX.Element {
  const { ref, geometry } = useViewfinderFrame<HTMLDivElement>();

  return (
    <div ref={ref} className="relative isolate block">
      <ViewfinderFrameSvg geometry={geometry} />
      <div className="relative px-6 py-6 font-sans text-text">
        {heading ? (
          <h2 className="mb-2 text-sm font-semibold tracking-widest text-brand-500 uppercase">
            {heading}
          </h2>
        ) : null}
        {children}
      </div>
    </div>
  );
}
