import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-skeleton-heading")
export class ThemeSkeletonHeading extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) width = "60%";

  render() {
    return html`<div
      class="bar theme-shimmer rounded-theme h-6 mb-2"
      style="width:${this.width}"
    ></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-skeleton-heading": ThemeSkeletonHeading;
  }
}
