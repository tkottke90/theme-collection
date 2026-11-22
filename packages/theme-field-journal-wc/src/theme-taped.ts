import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/** A taped-in sketch or photo: a white photo border, tape strips across opposite corners, a slight tilt, a handwritten caption. */
@customElement("theme-taped")
export class ThemeTaped extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      .taped {
        position: relative;
        padding: 10px;
        background: var(--taped-border);
        box-shadow: var(--shadow-taped);
      }
      .taped.tilt-l {
        transform: rotate(-1.5deg);
      }
      .taped.tilt-r {
        transform: rotate(1.2deg);
      }
      .taped::before,
      .taped::after {
        content: "";
        position: absolute;
        width: 74px;
        height: 22px;
        background: var(--tape);
        box-shadow: 0 1px 2px rgba(70, 45, 20, 0.2);
      }
      .taped::before {
        top: -9px;
        left: -20px;
        transform: rotate(-35deg);
      }
      .taped::after {
        bottom: -9px;
        right: -20px;
        transform: rotate(-35deg);
      }
      ::slotted(*) {
        display: block;
        width: 100%;
        height: auto;
      }
      figcaption {
        margin-top: 6px;
        text-align: center;
        font-family: var(--font-hand);
        font-size: 19px;
        color: var(--ink-soft);
      }
    `,
  ];

  @property({ type: String }) tilt: "l" | "r" | "none" = "l";
  @property({ type: String }) caption = "";

  render() {
    const tiltClass = this.tilt === "none" ? "" : ` tilt-${this.tilt}`;
    return html`
      <figure class="taped${tiltClass}">
        <slot></slot>
        ${this.caption ? html`<figcaption>${this.caption}</figcaption>` : null}
      </figure>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-taped": ThemeTaped;
  }
}
