import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

export type ThemeInputType = "text" | "email" | "password" | "number" | "checkbox" | "radio";

const FRAME_SHAPE = pixelFrameShapes(1, 2, 0, 16);
const SHAPE_STYLE = pixelFrameShapeStyle(FRAME_SHAPE);

/**
 * The source image has no literal text input anywhere (it's a static
 * infographic poster) — this is extrapolated from the same token system:
 * a plain thin-bordered pixel-frame, filled with `--color-bg-alt` to read
 * as a slightly recessed well against the page's `--color-bg`.
 */
@customElement("theme-input")
export class ThemeInput extends LitElement {
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
      input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border: 0;
        background: none;
        padding: 0.5rem 0.75rem;
        font: inherit;
        color: var(--color-text);
      }
      input:focus {
        outline: 2px solid var(--color-brand-600);
        outline-offset: 1px;
      }
    `,
  ];

  @property({ type: String }) type: ThemeInputType = "text";
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";
  /**
   * Accessible name, forwarded to the inner control. `theme-field` sets this
   * from its label, since a label outside this shadow root can't reach it.
   */
  @property({ type: String, attribute: "accessible-label" }) accessibleLabel?: string;

  render() {
    const isBoxType = this.type === "checkbox" || this.type === "radio";
    if (isBoxType) {
      return html`<input
        aria-label=${ifDefined(this.accessibleLabel)}
        type=${this.type}
        .value=${this.value}
        class="accent-brand-600"
        style="width: 1rem; height: 1rem;"
      />`;
    }

    return html`<div class="pixel-frame" style=${SHAPE_STYLE}>
      <div class="pixel-frame__fill">
        <input
          aria-label=${ifDefined(this.accessibleLabel)}
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
        />
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-input": ThemeInput;
  }
}
