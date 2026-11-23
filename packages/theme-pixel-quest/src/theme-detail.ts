import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

const FRAME_SHAPE = pixelFrameShapes(2, 2, 0, 24);
const SHAPE_STYLE = pixelFrameShapeStyle(FRAME_SHAPE);

@customElement("theme-detail")
export class ThemeDetail extends LitElement {
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
        padding: 0.75rem 1rem;
        font-family: var(--font-sans);
        color: var(--color-text);
      }
      summary {
        font-family: var(--font-slab);
        font-weight: 700;
        cursor: pointer;
      }
    `,
  ];

  @property({ type: String }) summary = "";

  render() {
    return html`
      <div class="pixel-frame" style=${SHAPE_STYLE}>
        <details class="pixel-frame__fill">
          <summary>${this.summary}</summary>
          <slot></slot>
        </details>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-detail": ThemeDetail;
  }
}
