import type { JSX } from "preact";

export interface ThemeButtonProps {
  label?: string;
  onClick?: () => void;
}

export function ThemeButton({ label = "Click me", onClick }: ThemeButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: "0.5rem",
        backgroundColor: "#4f5bd5",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
