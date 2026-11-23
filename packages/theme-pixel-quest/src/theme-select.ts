import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

const FRAME_SHAPE = pixelFrameShapes(1, 2, 0, 16);
const SHAPE_STYLE = pixelFrameShapeStyle(FRAME_SHAPE);

/**
 * Projects light-DOM `<option>` children straight into a native `<select>`
 * via the default slot. Current Chromium/Firefox/Safari render slotted
 * `<option>` elements correctly inside a shadow-DOM `<select>`; older
 * browsers without that support would need a different approach.
 *
 * No literal select exists in the source image — extrapolated the same way
 * as Input/Textarea (see theme-input.ts).
 */
@customElement("theme-select")
export class ThemeSelect extends LitElement {
  static styles = [
    themeStyles,
    pixelFrameStyles,
    css`
      :host {
        display: inline-block;
        width: 100%;
        font-family: var(--font-sans);
      }
      .pixel-frame {
        display: block;
        width: 100%;
      }
      .pixel-frame:not(.badge) .pixel-frame__fill {
        display: block;
        background-color: var(--color-bg-alt);
      }
      select {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border: 0;
        background: none;
        padding: 0.5rem 0.75rem;
        font: inherit;
        color: var(--color-text);
      }
      select:focus {
        outline: 2px solid var(--color-brand-600);
        outline-offset: 1px;
      }
    `,
  ];

  render() {
    return html`<div class="pixel-frame" style=${SHAPE_STYLE}>
      <div class="pixel-frame__fill">
        <select>
          <slot></slot>
        </select>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-select": ThemeSelect;
  }
}
