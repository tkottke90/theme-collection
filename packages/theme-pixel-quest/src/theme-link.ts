import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-link")
export class ThemeLink extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline;
      }
    `,
  ];

  @property({ type: String }) href = "#";

  render() {
    return html`<a href=${this.href} class="font-sans text-brand-600 underline hover:text-brand-900"
      ><slot></slot
    ></a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-link": ThemeLink;
  }
}
