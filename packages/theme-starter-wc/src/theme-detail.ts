import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-detail")
export class ThemeDetail extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) summary = "";

  render() {
    return html`
      <details class="font-sans rounded-theme border border-neutral-100 px-4 py-3">
        <summary class="font-semibold cursor-pointer text-neutral-900">${this.summary}</summary>
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
