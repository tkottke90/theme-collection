import type { ComponentChildren, JSX } from "preact";

export interface ThemeSelectProps {
  value?: string;
  disabled?: boolean;
  onChange?: (event: Event) => void;
  children?: ComponentChildren;
}

export function ThemeSelect({
  value,
  disabled = false,
  onChange,
  children,
}: ThemeSelectProps): JSX.Element {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={onChange}
      className="rounded-theme border border-border bg-surface-alt px-3 py-2 [font:inherit] text-text cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1"
    >
      {children}
    </select>
  );
}
