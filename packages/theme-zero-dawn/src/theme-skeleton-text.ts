import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { plateStyles } from "./plate-styles.js";

@customElement("theme-skeleton-text")
export class ThemeSkeletonText extends LitElement {
  static styles = [
    themeStyles,
    plateStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) width = "100%";

  render() {
    return html`<div
      class="bar theme-shimmer zd-chamfer h-3.5 mb-2 [--zd-cut:4px]"
      style="width:${this.width}"
    ></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-skeleton-text": ThemeSkeletonText;
  }
}
