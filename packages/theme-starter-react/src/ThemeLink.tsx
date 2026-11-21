import type { ComponentChildren, JSX } from "preact";
import { tokens } from "./tokens.js";

export interface ThemeLinkProps {
  href?: string;
  onClick?: (event: Event) => void;
  children?: ComponentChildren;
}

export function ThemeLink({ href = "#", onClick, children }: ThemeLinkProps): JSX.Element {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{
        color: tokens.brand500,
        textDecoration: "underline",
        textDecorationColor: tokens.brand100,
        cursor: "pointer",
      }}
    >
      {children}
    </a>
  );
}
