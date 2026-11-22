import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/** Plain cream card — the base surface quest cards, notes and item slots build on. */
@customElement("theme-card")
export class ThemeCard extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) heading = "";

  render() {
    return html`
      <div
        class="rounded-theme bg-[image:var(--grain-soft)] bg-surface-alt text-text border border-border shadow-card px-5 py-4"
      >
        ${
          this.heading
            ? html`<h2 class="m-0 mb-2 font-head text-lg font-normal">${this.heading}</h2>`
            : null
        }
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-card": ThemeCard;
  }
}
