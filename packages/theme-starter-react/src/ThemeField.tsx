import type { ComponentChildren, JSX } from "preact";

export interface ThemeFieldProps {
  label: string;
  htmlFor?: string;
  children?: ComponentChildren;
}

export function ThemeField({ label, htmlFor, children }: ThemeFieldProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-neutral-900">
        {label}
      </label>
      {children}
    </div>
  );
}
