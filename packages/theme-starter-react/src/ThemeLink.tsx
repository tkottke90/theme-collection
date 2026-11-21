import type { ComponentChildren, JSX } from "preact";

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
      className="text-brand-500 underline decoration-brand-100 cursor-pointer"
    >
      {children}
    </a>
  );
}
