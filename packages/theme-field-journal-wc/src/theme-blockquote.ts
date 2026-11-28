import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

export type BlockquoteType =
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

const LABELS: Record<BlockquoteType, string> = {
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

const ACCENT_CLASSES: Record<BlockquoteType, string> = {
  info: "border border-l-4 border-l-info-500 border-[color:color-mix(in_srgb,var(--color-info-500)_50%,var(--card))] bg-[color-mix(in_srgb,var(--color-info-500)_22%,var(--card))]",
  tip: "border border-l-4 border-l-tip-500 border-[color:color-mix(in_srgb,var(--color-tip-500)_50%,var(--card))] bg-[color-mix(in_srgb,var(--color-tip-500)_22%,var(--card))]",
  question:
    "border border-l-4 border-l-question-500 border-[color:color-mix(in_srgb,var(--color-question-500)_50%,var(--card))] bg-[color-mix(in_srgb,var(--color-question-500)_22%,var(--card))]",
  success:
    "border border-l-4 border-l-success-500 border-[color:color-mix(in_srgb,var(--color-success-500)_50%,var(--card))] bg-[color-mix(in_srgb,var(--color-success-500)_22%,var(--card))]",
  warning:
    "border border-l-4 border-l-warning-500 border-[color:color-mix(in_srgb,var(--color-warning-500)_50%,var(--card))] bg-[color-mix(in_srgb,var(--color-warning-500)_22%,var(--card))]",
  failure:
    "border border-l-4 border-l-failure-500 border-[color:color-mix(in_srgb,var(--color-failure-500)_50%,var(--card))] bg-[color-mix(in_srgb,var(--color-failure-500)_22%,var(--card))]",
  danger:
    "border border-l-4 border-l-danger-500 border-[color:color-mix(in_srgb,var(--color-danger-500)_50%,var(--card))] bg-[color-mix(in_srgb,var(--color-danger-500)_22%,var(--card))]",
  bug: "border border-l-4 border-l-bug-500 border-[color:color-mix(in_srgb,var(--color-bug-500)_50%,var(--card))] bg-[color-mix(in_srgb,var(--color-bug-500)_26%,var(--card))]",
  example:
    "border border-l-4 border-l-example-500 border-[color:color-mix(in_srgb,var(--color-example-500)_50%,var(--card))] bg-[color-mix(in_srgb,var(--color-example-500)_24%,var(--card))]",
  quote:
    "border border-l-4 border-l-quote-500 border-[color:color-mix(in_srgb,var(--color-quote-500)_50%,var(--card))] bg-[color-mix(in_srgb,var(--color-quote-500)_22%,var(--card))]",
};

/**
 * Label ink: the type's colour blended into the body brown, so every label
 * keeps 4.5:1 on its tinted panel (the pale bug and example hues need more
 * brown, and a stronger panel tint to read as a panel at all). The border keeps the pure colour.
 */
const ACCENT_TEXT_CLASSES: Record<BlockquoteType, string> = {
  info: "text-[color:color-mix(in_srgb,var(--color-info-500)_55%,var(--color-text))]",
  tip: "text-[color:color-mix(in_srgb,var(--color-tip-500)_55%,var(--color-text))]",
  question: "text-[color:color-mix(in_srgb,var(--color-question-500)_55%,var(--color-text))]",
  success: "text-[color:color-mix(in_srgb,var(--color-success-500)_55%,var(--color-text))]",
  warning: "text-[color:color-mix(in_srgb,var(--color-warning-500)_55%,var(--color-text))]",
  failure: "text-[color:color-mix(in_srgb,var(--color-failure-500)_55%,var(--color-text))]",
  danger: "text-[color:color-mix(in_srgb,var(--color-danger-500)_55%,var(--color-text))]",
  bug: "text-[color:color-mix(in_srgb,var(--color-bug-500)_35%,var(--color-text))]",
  example: "text-[color:color-mix(in_srgb,var(--color-example-500)_40%,var(--color-text))]",
  quote: "text-[color:color-mix(in_srgb,var(--color-quote-500)_55%,var(--color-text))]",
};

@customElement("theme-blockquote")
export class ThemeBlockquote extends LitElement {
  static styles = [themeStyles];

  @property({ type: String, reflect: true }) type: BlockquoteType = "info";

  render() {
    return html`
      <blockquote class="font-sans rounded-theme px-4 py-3 text-text ${ACCENT_CLASSES[this.type]}">
        <span
          class="label block font-title font-normal tracking-wide mb-1 ${ACCENT_TEXT_CLASSES[this.type]}"
          >${LABELS[this.type]}</span
        >
        <slot></slot>
      </blockquote>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-blockquote": ThemeBlockquote;
  }
}
