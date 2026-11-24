import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

const FRAME_SHAPE = pixelFrameShapes(1, 2, 0, 16);
const SHAPE_STYLE = pixelFrameShapeStyle(FRAME_SHAPE);

/**
 * No literal textarea exists in the source image — extrapolated the same
 * way as Input/Select (see theme-input.ts).
 */
@customElement("theme-textarea")
export class ThemeTextarea extends LitElement {
  /** Focusing the element focuses the inner control (used by `theme-field`'s label). */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

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
      textarea {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border: 0;
        background: none;
        padding: 0.5rem 0.75rem;
        font: inherit;
        color: var(--color-text);
        resize: vertical;
      }
      textarea:focus {
        outline: 2px solid var(--color-brand-600);
        outline-offset: 1px;
      }
    `,
  ];

  @property({ type: Number }) rows = 4;
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";
  /**
   * Accessible name, forwarded to the inner control. `theme-field` sets this
   * from its label, since a label outside this shadow root can't reach it.
   */
  @property({ type: String, attribute: "accessible-label" }) accessibleLabel?: string;

  render() {
    return html`<div class="pixel-frame" style=${SHAPE_STYLE}>
      <div class="pixel-frame__fill">
        <textarea
          aria-label=${ifDefined(this.accessibleLabel)}
          rows=${this.rows}
          .value=${this.value}
          placeholder=${this.placeholder}
        ></textarea>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-textarea": ThemeTextarea;
  }
}
