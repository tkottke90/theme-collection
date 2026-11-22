import type { JSX } from "preact";

export interface ThemeProgressProps {
  label?: string;
  value?: number;
  max?: number;
}

/** Segmented linear bar meter, e.g. the tick-marked bars in HUD telemetry panels. */
export function ThemeProgress({ label, value = 0, max = 100 }: ThemeProgressProps): JSX.Element {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="font-sans">
      {label ? (
        <p className="m-0 mb-1.5 text-xs font-semibold tracking-[0.2em] text-text-muted uppercase">
          {label}
        </p>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="rounded-theme relative h-3 w-full overflow-hidden border border-border bg-surface-alt"
      >
        <div
          className="shadow-glow h-full bg-brand-500 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_calc(6%-2px),var(--color-surface-alt)_calc(6%-2px),var(--color-surface-alt)_6%)] transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
