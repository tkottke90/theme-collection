import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { panelFrameStyles } from "./panel-frame.js";

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

// The cut-corner panel's `--border` is recolored per type, the same
// mechanism `.panel.accent`/`.panel.alert` already use for a single color —
// this just generalizes it to all ten semantic colors instead of adding a
// second, redundant accent-stripe border.
const BORDER_VARS: Record<BlockquoteType, string> = {
  info: "--color-info-500",
  tip: "--color-tip-500",
  question: "--color-question-500",
  success: "--color-success-500",
  warning: "--color-warning-500",
  failure: "--color-failure-500",
  danger: "--color-danger-500",
  bug: "--color-bug-500",
  example: "--color-example-500",
  quote: "--color-quote-500",
};

const LABEL_CLASSES: Record<BlockquoteType, string> = {
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
  static styles = [
    themeStyles,
    panelFrameStyles,
    css`
      :host {
        display: block;
      }
      blockquote {
        margin: 0;
      }
    `,
  ];

  @property({ type: String, reflect: true }) type: BlockquoteType = "info";

  render() {
    return html`
      <blockquote class="panel" style="--border: var(${BORDER_VARS[this.type]})">
        <span
          class="label block text-sm font-semibold tracking-widest uppercase mb-1 ${LABEL_CLASSES[this.type]}"
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
