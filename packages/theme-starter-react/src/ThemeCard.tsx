import type { ComponentChildren, JSX } from "preact";

export interface ThemeCardProps {
  heading?: string;
  children?: ComponentChildren;
}

export function ThemeCard({ heading, children }: ThemeCardProps): JSX.Element {
  return (
    <div className="rounded-theme bg-brand-50 text-brand-900 border border-brand-100 px-5 py-4">
      {heading ? <h2>{heading}</h2> : null}
      {children}
    </div>
  );
}
