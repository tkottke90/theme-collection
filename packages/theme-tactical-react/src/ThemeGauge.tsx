import type { JSX } from "preact";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export interface ThemeGaugeProps {
  label?: string;
  value?: number;
  max?: number;
}

/** Circular radar-style dial gauge, the most SVG-dependent of the data-display set. */
export function ThemeGauge({ label, value = 0, max = 100 }: ThemeGaugeProps): JSX.Element {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const offset = CIRCUMFERENCE * (1 - pct / 100);

  return (
    <div
      className="relative h-32 w-32 font-sans"
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label || "gauge"}
    >
      {/* eslint-disable react/no-unknown-property -- Preact (unlike React) doesn't
      camelCase-normalize SVG attributes; these must stay kebab-case or the browser ignores them. */}
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx={50}
          cy={50}
          r={RADIUS}
          fill="none"
          stroke="var(--color-border)"
          stroke-width={8}
        />
        <circle
          cx={50}
          cy={50}
          r={RADIUS}
          fill="none"
          stroke="var(--color-brand-500)"
          stroke-width={8}
          stroke-linecap="round"
          stroke-dasharray={CIRCUMFERENCE}
          stroke-dashoffset={offset}
          style={{
            filter: "drop-shadow(0 0 4px var(--color-brand-500))",
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>
      {/* eslint-enable react/no-unknown-property */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-xl leading-none text-brand-500">{Math.round(value)}</span>
        {label ? (
          <span className="mt-1 text-[0.625rem] font-semibold tracking-[0.15em] text-text-muted uppercase">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
