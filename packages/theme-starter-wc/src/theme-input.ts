import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tokens } from "./tokens.js";

export type ThemeInputType = "text" | "email" | "password" | "number" | "checkbox" | "radio";

@customElement("theme-input")
export class ThemeInput extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: inline-block;
        font-family: var(--font-sans);
      }
      input[type="text"],
      input[type="email"],
      input[type="password"],
      input[type="number"] {
        border-radius: var(--radius-theme);
        border: 1px solid var(--neutral-300);
        padding: 0.5rem 0.75rem;
        font: inherit;
        color: var(--neutral-900);
      }
      input[type="text"]:focus,
      input[type="email"]:focus,
      input[type="password"]:focus,
      input[type="number"]:focus {
        outline: 2px solid var(--brand-500);
        outline-offset: 1px;
      }
      input[type="checkbox"],
      input[type="radio"] {
        accent-color: var(--brand-500);
      }
    `,
  ];

  @property({ type: String }) type: ThemeInputType = "text";
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";

  render() {
    return html`<input type=${this.type} .value=${this.value} placeholder=${this.placeholder} />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-input": ThemeInput;
  }
}
