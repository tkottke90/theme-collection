import type { JSX } from "preact";
import { HudFrameSvg } from "./HudFrameSvg.js";
import { useHudFrame } from "./useHudFrame.js";

export interface ThemeStatProps {
  label: string;
  value: string | number;
  unit?: string;
}

/** Large numeric readout panel, e.g. "SYSTEM STATUS 1565". */
export function ThemeStat({ label, value, unit }: ThemeStatProps): JSX.Element {
  const { ref, geometry } = useHudFrame<HTMLDivElement>();

  return (
    <div ref={ref} className="relative isolate block">
      <HudFrameSvg geometry={geometry} />
      <div className="relative px-8 py-7 font-sans">
        <p className="m-0 text-xs font-semibold tracking-[0.2em] text-text-muted uppercase">
          {label}
        </p>
        <p className="m-0 mt-1 font-mono text-3xl leading-none text-brand-500">
          {value}
          {unit ? <span className="ml-1 text-base text-text-muted">{unit}</span> : null}
        </p>
      </div>
    </div>
  );
}
