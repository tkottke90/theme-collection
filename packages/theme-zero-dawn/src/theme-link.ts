import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/**
 * Machine-cyan link. On a light plate it switches to the deep cyan via the
 * plate's `--zd-link` so it keeps AA contrast.
 */
@customElement("theme-link")
export class ThemeLink extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline;
      }
      a:focus-visible {
        outline: 2px solid var(--color-brand-500);
        outline-offset: 2px;
      }
    `,
  ];

  @property({ type: String }) href = "#";

  render() {
    return html`<a
      href=${this.href}
      class="text-[var(--zd-link,var(--color-brand-300))] underline decoration-1 underline-offset-[3px] transition-[text-decoration-thickness] hover:decoration-2"
      ><slot></slot
    ></a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-link": ThemeLink;
  }
}
