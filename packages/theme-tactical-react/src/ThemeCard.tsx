import type { ComponentChildren, JSX } from "preact";
import { ThemeFrame, frameClipPath } from "./ThemeFrame.js";

export interface ThemeCardProps {
  heading?: string;
  children?: ComponentChildren;
}

export function ThemeCard({ heading, children }: ThemeCardProps): JSX.Element {
  return (
    <div
      className="relative border border-border bg-surface px-5 py-4 font-sans text-text"
      style={{ clipPath: frameClipPath() }}
    >
      <ThemeFrame />
      <div className="relative">
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
