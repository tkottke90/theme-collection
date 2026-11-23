import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-counter")
export class ThemeCounter extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
      .counter {
        display: grid;
        place-items: center;
        min-width: 56px;
        height: 56px;
        padding: 0 10px;
        font-family: var(--font-sans);
        font-size: 2.125rem;
        font-weight: 700;
        color: var(--color-brand-500);
        background: var(--background-image-brackets);
      }
    `,
  ];

  @property({ type: String }) value = "0";
  @property({ type: String }) label = "";

  render() {
    return html`<span class="counter" aria-label=${this.label || this.value}>${this.value}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-counter": ThemeCounter;
  }
}
