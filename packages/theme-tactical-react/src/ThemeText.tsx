import type { ComponentChildren, JSX } from "preact";

export type ThemeTextVariant = "body" | "caption";

export interface ThemeTextProps {
  variant?: ThemeTextVariant;
  children?: ComponentChildren;
}

export function ThemeText({ variant = "body", children }: ThemeTextProps): JSX.Element {
  if (variant === "caption") {
    return <small className="m-0 block text-xs text-text-muted">{children}</small>;
  }

  return <p className="m-0 text-base leading-normal text-text">{children}</p>;
}
