import type { JSX } from "preact";
import { ThemeFrame, frameClipPath } from "./ThemeFrame.js";

export interface ThemeStatProps {
  label: string;
  value: string | number;
  unit?: string;
}

/** Large numeric readout panel, e.g. "SYSTEM STATUS 1565". */
export function ThemeStat({ label, value, unit }: ThemeStatProps): JSX.Element {
  return (
    <div
      className="relative border border-border bg-surface px-5 py-4"
      style={{ clipPath: frameClipPath() }}
    >
      <ThemeFrame />
      <div className="relative font-sans">
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
