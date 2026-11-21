import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tokens } from "./tokens.js";

@customElement("theme-button")
export class ThemeButton extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: inline-block;
      }
      button {
        border-radius: var(--radius-theme);
        background-color: var(--brand-500);
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        cursor: pointer;
        font: inherit;
      }
      button:hover {
        background-color: var(--brand-600);
      }
      :host([variant="secondary"]) button {
        background-color: transparent;
        color: var(--brand-500);
        border: 1px solid var(--brand-500);
      }
      :host([variant="secondary"]) button:hover {
        background-color: var(--brand-50);
      }
      :host([variant="ghost"]) button {
        background-color: transparent;
        color: var(--brand-500);
      }
      :host([variant="ghost"]) button:hover {
        background-color: var(--brand-50);
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        background-color: var(--neutral-300);
        color: var(--neutral-500);
        border-color: var(--neutral-300);
      }
    `,
  ];

  @property({ type: String }) label = "Click me";
  @property({ type: String, reflect: true }) variant: "primary" | "secondary" | "ghost" = "primary";
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`<button ?disabled=${this.disabled}><slot>${this.label}</slot></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-button": ThemeButton;
  }
}
