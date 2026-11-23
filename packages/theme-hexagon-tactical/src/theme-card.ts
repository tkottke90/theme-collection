import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { panelFrameStyles } from "./panel-frame.js";

@customElement("theme-card")
export class ThemeCard extends LitElement {
  static styles = [
    themeStyles,
    panelFrameStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) heading = "";

  render() {
    return html`
      <div class="panel">
        ${this.heading ? html`<h2 class="panel-title">${this.heading}</h2>` : null}
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
