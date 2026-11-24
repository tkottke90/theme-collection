import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

const FRAME_SHAPE = pixelFrameShapes(2, 2, 0, 24);
const SHAPE_STYLE = pixelFrameShapeStyle(FRAME_SHAPE);

@customElement("theme-card")
export class ThemeCard extends LitElement {
  static styles = [
    themeStyles,
    pixelFrameStyles,
    css`
      :host {
        display: block;
      }
      .pixel-frame {
        display: block;
      }
      .pixel-frame__fill {
        display: block;
        padding: 1rem 1.25rem;
        color: var(--color-text);
      }
      h2 {
        margin: 0 0 0.5rem;
        font-size: 1.125rem;
        line-height: 1.2;
        font-family: var(--font-slab);
        font-weight: 700;
      }
    `,
  ];

  @property({ type: String }) heading = "";

  render() {
    return html`
      <div class="pixel-frame" style=${SHAPE_STYLE}>
        <div class="pixel-frame__fill">
          ${this.heading ? html`<h2>${this.heading}</h2>` : null}
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-card": ThemeCard;
  }
}
