import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("theme-button")
export class ThemeButton extends LitElement {
  static styles = css`
    :host {
      --brand-500: #4f5bd5;
      --brand-600: #3f4ab0;
      display: inline-block;
    }
    button {
      border-radius: 0.5rem;
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
  `;

  @property({ type: String }) label = "Click me";

  render() {
    return html`<button><slot>${this.label}</slot></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-button": ThemeButton;
  }
}
