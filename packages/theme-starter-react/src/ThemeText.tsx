import type { ComponentChildren, JSX } from "preact";

export type ThemeTextVariant = "body" | "caption";

export interface ThemeTextProps {
  variant?: ThemeTextVariant;
  children?: ComponentChildren;
}

export function ThemeText({ variant = "body", children }: ThemeTextProps): JSX.Element {
  if (variant === "caption") {
    return <small className="block m-0 text-xs text-neutral-500">{children}</small>;
  }

  return <p className="m-0 text-base leading-normal text-neutral-900">{children}</p>;
}
