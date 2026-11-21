import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tokens } from "./tokens.js";

@customElement("theme-textarea")
export class ThemeTextarea extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: inline-block;
      }
      textarea {
        border-radius: var(--radius-theme);
        border: 1px solid var(--neutral-300);
        padding: 0.5rem 0.75rem;
        font: inherit;
        color: var(--neutral-900);
      }
      textarea:focus {
        outline: 2px solid var(--brand-500);
        outline-offset: 1px;
      }
    `,
  ];

  @property({ type: Number }) rows = 4;
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";

  render() {
    return html`<textarea
      rows=${this.rows}
      .value=${this.value}
      placeholder=${this.placeholder}
    ></textarea>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-textarea": ThemeTextarea;
  }
}
