import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { plateStyles } from "./plate-styles.js";

@customElement("theme-skeleton-heading")
export class ThemeSkeletonHeading extends LitElement {
  static styles = [
    themeStyles,
    plateStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) width = "60%";

  render() {
    return html`<div
      class="bar theme-shimmer zd-chamfer h-7 mb-3 [--zd-cut:8px]"
      style="width:${this.width}"
    ></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-skeleton-heading": ThemeSkeletonHeading;
  }
}
