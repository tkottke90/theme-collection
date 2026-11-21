import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

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
      <div class="card rounded-theme bg-brand-50 text-brand-900 border border-brand-100 px-5 py-4">
        ${this.heading ? html`<h2>${this.heading}</h2>` : null}
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
