import type { ComponentChildren, JSX } from "preact";
import { HudFrameSvg } from "./HudFrameSvg.js";
import { useHudFrame } from "./useHudFrame.js";

export interface ThemeCardProps {
  heading?: string;
  children?: ComponentChildren;
}

export function ThemeCard({ heading, children }: ThemeCardProps): JSX.Element {
  const { ref, geometry } = useHudFrame<HTMLDivElement>();

  return (
    <div ref={ref} className="relative isolate block">
      <HudFrameSvg geometry={geometry} />
      <div className="relative px-8 py-7 font-sans text-text">
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
