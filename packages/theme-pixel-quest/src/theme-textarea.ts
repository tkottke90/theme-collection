import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormControlElement } from "./generated/core/form-control.js";
import { themeStyles } from "./generated/theme-styles.js";
import { pixelFrameStyles, pixelFrameShapes, pixelFrameShapeStyle } from "./pixel-frame.js";

const FRAME_SHAPE = pixelFrameShapes(1, 2, 0, 16);
const SHAPE_STYLE = pixelFrameShapeStyle(FRAME_SHAPE);

/**
 * No literal textarea exists in the source image — extrapolated the same
 * way as Input/Select (see theme-input.ts). The native `<textarea>` sits in
 * a form-associated host (see `FormControlElement`).
 */
@customElement("theme-textarea")
export class ThemeTextarea extends FormControlElement {
  static styles = [
    themeStyles,
    pixelFrameStyles,
    css`
      :host {
        display: inline-block;
        width: 100%;
        font-family: var(--font-sans);
      }
      :host([disabled]),
      :host([data-disabled]) {
        opacity: 0.5;
        pointer-events: none;
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

  private defaultValue = "";

  connectedCallback(): void {
    super.connectedCallback();
    this.defaultValue = this.getAttribute("value") ?? "";
  }

  protected formValue(): string {
    return this.value;
  }

  protected restoreDefault(): void {
    this.value = this.defaultValue;
  }

  private onInput(e: Event): void {
    this.value = (e.target as HTMLTextAreaElement).value;
  }

  render() {
    return html`<div class="pixel-frame" style=${SHAPE_STYLE}>
      <div class="pixel-frame__fill">
        <textarea
          rows=${this.rows}
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.isDisabled}
          aria-label=${ifDefined(this.accessibleName)}
          @input=${this.onInput}
          @change=${this.emitChange}
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
