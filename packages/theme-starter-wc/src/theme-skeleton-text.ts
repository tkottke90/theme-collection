import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-skeleton-text")
export class ThemeSkeletonText extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) width = "100%";

  render() {
    return html`<div
      class="bar theme-shimmer rounded-theme h-3.5 mb-1.5"
      style="width:${this.width}"
    ></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-skeleton-text": ThemeSkeletonText;
  }
}
