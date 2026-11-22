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
  info: "border-info-500 bg-[color-mix(in_srgb,var(--color-info-500)_14%,var(--card))]",
  tip: "border-tip-500 bg-[color-mix(in_srgb,var(--color-tip-500)_14%,var(--card))]",
  question: "border-question-500 bg-[color-mix(in_srgb,var(--color-question-500)_14%,var(--card))]",
  success: "border-success-500 bg-[color-mix(in_srgb,var(--color-success-500)_14%,var(--card))]",
  warning: "border-warning-500 bg-[color-mix(in_srgb,var(--color-warning-500)_14%,var(--card))]",
  failure: "border-failure-500 bg-[color-mix(in_srgb,var(--color-failure-500)_14%,var(--card))]",
  danger: "border-danger-500 bg-[color-mix(in_srgb,var(--color-danger-500)_14%,var(--card))]",
  bug: "border-bug-500 bg-[color-mix(in_srgb,var(--color-bug-500)_14%,var(--card))]",
  example: "border-example-500 bg-[color-mix(in_srgb,var(--color-example-500)_14%,var(--card))]",
  quote: "border-quote-500 bg-[color-mix(in_srgb,var(--color-quote-500)_14%,var(--card))]",
};

const ACCENT_TEXT_CLASSES: Record<BlockquoteType, string> = {
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

@customElement("theme-blockquote")
export class ThemeBlockquote extends LitElement {
  static styles = [themeStyles];

  @property({ type: String, reflect: true }) type: BlockquoteType = "info";

  render() {
    return html`
      <blockquote
        class="font-sans border-l-4 rounded-theme px-4 py-3 text-text ${ACCENT_CLASSES[this.type]}"
      >
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
