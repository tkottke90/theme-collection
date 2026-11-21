import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tokens } from "./tokens.js";

@customElement("theme-detail")
export class ThemeDetail extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: block;
        font-family: var(--font-sans);
      }
      details {
        border-radius: var(--radius-theme);
        border: 1px solid var(--neutral-100);
        padding: 0.75rem 1rem;
      }
      summary {
        font-weight: 600;
        cursor: pointer;
        color: var(--neutral-900);
      }
    `,
  ];

  @property({ type: String }) summary = "";

  render() {
    return html`
      <details>
        <summary>${this.summary}</summary>
        <slot></slot>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-detail": ThemeDetail;
  }
}
