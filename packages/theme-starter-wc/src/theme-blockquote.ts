import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tokens } from "./tokens.js";

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

@customElement("theme-blockquote")
export class ThemeBlockquote extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: block;
        font-family: var(--font-sans);
        --accent: var(--info-500);
      }
      blockquote {
        border-left: 4px solid var(--accent);
        background-color: color-mix(in srgb, var(--accent) 10%, white);
        padding: 0.75rem 1rem;
        border-radius: var(--radius-theme);
        margin: 0;
        color: var(--neutral-900);
      }
      .label {
        display: block;
        font-weight: 600;
        color: var(--accent);
        margin-bottom: 0.25rem;
      }
      :host([type="tip"]) {
        --accent: var(--tip-500);
      }
      :host([type="question"]) {
        --accent: var(--question-500);
      }
      :host([type="success"]) {
        --accent: var(--success-500);
      }
      :host([type="warning"]) {
        --accent: var(--warning-500);
      }
      :host([type="failure"]) {
        --accent: var(--failure-500);
      }
      :host([type="danger"]) {
        --accent: var(--danger-500);
      }
      :host([type="bug"]) {
        --accent: var(--bug-500);
      }
      :host([type="example"]) {
        --accent: var(--example-500);
      }
      :host([type="quote"]) {
        --accent: var(--quote-500);
      }
    `,
  ];

  @property({ type: String, reflect: true }) type: BlockquoteType = "info";

  render() {
    return html`
      <blockquote>
        <span class="label">${LABELS[this.type]}</span>
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
