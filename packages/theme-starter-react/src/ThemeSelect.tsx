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
      className="rounded-theme border border-neutral-300 px-3 py-2 [font:inherit] text-neutral-900 bg-white cursor-pointer disabled:bg-neutral-100 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1"
    >
      {children}
    </select>
  );
}
