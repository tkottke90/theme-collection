import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tokens } from "./tokens.js";

@customElement("theme-link")
export class ThemeLink extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: inline;
        font-family: var(--font-sans);
      }
      a {
        color: var(--brand-500);
        text-decoration: underline;
      }
      a:hover {
        color: var(--brand-600);
      }
    `,
  ];

  @property({ type: String }) href = "#";

  render() {
    return html`<a href=${this.href}><slot></slot></a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-link": ThemeLink;
  }
}
