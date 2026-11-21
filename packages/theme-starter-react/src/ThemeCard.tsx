import type { ComponentChildren, JSX } from "preact";

export interface ThemeCardProps {
  heading?: string;
  children?: ComponentChildren;
}

export function ThemeCard({ heading, children }: ThemeCardProps): JSX.Element {
  return (
    <div
      style={{
        borderRadius: "0.5rem",
        backgroundColor: "#f5f7ff",
        color: "#262d6b",
        border: "1px solid #e8ecfe",
        padding: "1rem 1.25rem",
      }}
    >
      {heading ? <h2>{heading}</h2> : null}
      {children}
    </div>
  );
}
