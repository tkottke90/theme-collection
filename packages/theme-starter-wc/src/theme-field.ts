import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tokens } from "./tokens.js";

@customElement("theme-field")
export class ThemeField extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: block;
        font-family: var(--font-sans);
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
      }
      label {
        font-weight: 600;
        color: var(--neutral-900);
      }
    `,
  ];

  @property({ type: String }) label = "";
  @property({ type: String }) for = "";

  render() {
    return html`
      <div class="field">
        <label for=${this.for}>${this.label}</label>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-field": ThemeField;
  }
}
