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
    return html`<a
      href=${this.href}
      class="font-sans text-brand-500 hover:text-brand-400 underline decoration-2 underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2"
      ><slot></slot
    ></a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-link": ThemeLink;
  }
}
