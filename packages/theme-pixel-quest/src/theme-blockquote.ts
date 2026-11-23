import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

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

const ACCENT_BORDER_CLASSES: Record<BlockquoteType, string> = {
  info: "border-info-500",
  tip: "border-tip-500",
  question: "border-question-500",
  success: "border-success-500",
  warning: "border-warning-500",
  failure: "border-failure-500",
  danger: "border-danger-500",
  bug: "border-bug-500",
  example: "border-example-500",
  quote: "border-quote-500",
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

const FRAME_SHAPE = pixelFrameShapes(2, 2, 0, 24);
const SHAPE_STYLE = pixelFrameShapeStyle(FRAME_SHAPE);

@customElement("theme-blockquote")
export class ThemeBlockquote extends LitElement {
  static styles = [
    themeStyles,
    pixelFrameStyles,
    css`
      :host {
        display: block;
      }
      .pixel-frame {
        display: block;
      }
      .pixel-frame__fill {
        display: block;
      }
    `,
  ];

  @property({ type: String, reflect: true }) type: BlockquoteType = "info";

  render() {
    return html`
      <div class="pixel-frame" style=${SHAPE_STYLE}>
        <blockquote
          class="pixel-frame__fill font-sans border-l-4 px-4 py-3 m-0 text-text ${
            ACCENT_BORDER_CLASSES[this.type]
          }"
        >
          <span class="label block font-semibold mb-1 ${ACCENT_TEXT_CLASSES[this.type]}"
            >${LABELS[this.type]}</span
          >
          <slot></slot>
        </blockquote>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-blockquote": ThemeBlockquote;
  }
}
