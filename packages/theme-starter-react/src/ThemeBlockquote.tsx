import type { ComponentChildren, JSX } from "preact";

export type ThemeBlockquoteType =
  | "info"
  | "tip"
  | "question"
  | "success"
  | "warning"
  | "failure"
  | "danger"
  | "bug"
  | "example"
  | "quote";

export interface ThemeBlockquoteProps {
  type?: ThemeBlockquoteType;
  children?: ComponentChildren;
}

const LABELS: Record<ThemeBlockquoteType, string> = {
  info: "Info",
  tip: "Tip",
  question: "Question",
  success: "Success",
  warning: "Warning",
  failure: "Failure",
  danger: "Danger",
  bug: "Bug",
  example: "Example",
  quote: "Quote",
};

const ACCENT_CLASSES: Record<ThemeBlockquoteType, string> = {
  info: "border-info-500 bg-[color-mix(in_srgb,var(--color-info-500)_10%,white)]",
  tip: "border-tip-500 bg-[color-mix(in_srgb,var(--color-tip-500)_10%,white)]",
  question: "border-question-500 bg-[color-mix(in_srgb,var(--color-question-500)_10%,white)]",
  success: "border-success-500 bg-[color-mix(in_srgb,var(--color-success-500)_10%,white)]",
  warning: "border-warning-500 bg-[color-mix(in_srgb,var(--color-warning-500)_10%,white)]",
  failure: "border-failure-500 bg-[color-mix(in_srgb,var(--color-failure-500)_10%,white)]",
  danger: "border-danger-500 bg-[color-mix(in_srgb,var(--color-danger-500)_10%,white)]",
  bug: "border-bug-500 bg-[color-mix(in_srgb,var(--color-bug-500)_10%,white)]",
  example: "border-example-500 bg-[color-mix(in_srgb,var(--color-example-500)_10%,white)]",
  quote: "border-quote-500 bg-[color-mix(in_srgb,var(--color-quote-500)_10%,white)]",
};

const ACCENT_TEXT_CLASSES: Record<ThemeBlockquoteType, string> = {
  info: "text-info-500",
  tip: "text-tip-500",
  question: "text-question-500",
  success: "text-success-500",
  warning: "text-warning-500",
  failure: "text-failure-500",
  danger: "text-danger-500",
  bug: "text-bug-500",
  example: "text-example-500",
  quote: "text-quote-500",
};

export function ThemeBlockquote({ type = "info", children }: ThemeBlockquoteProps): JSX.Element {
  return (
    <blockquote className={`border-l-4 rounded-theme py-3 px-4 m-0 ${ACCENT_CLASSES[type]}`}>
      <span className={`block font-semibold mb-1 ${ACCENT_TEXT_CLASSES[type]}`}>
        {LABELS[type]}
      </span>
      {children}
    </blockquote>
  );
}
