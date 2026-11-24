import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormControlElement } from "./generated/core/form-control.js";
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
 *
 * The native `<input>` sits in a form-associated host (see
 * `FormControlElement`): it submits under `name`, resets with its form and
 * forwards its accessible name to the inner input.
 */
@customElement("theme-input")
export class ThemeInput extends FormControlElement {
  static styles = [
    themeStyles,
    pixelFrameStyles,
    css`
      :host {
        display: inline-block;
        width: 100%;
        font-family: var(--font-sans);
      }
      :host([type="checkbox"]),
      :host([type="radio"]) {
        width: auto;
        vertical-align: middle;
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
      /* Preflight's 50% currentcolor placeholder is 2.9:1 on the well; muted ink is 4.8:1. */
      input::placeholder {
        color: var(--color-text-muted);
        opacity: 1;
      }
      /*
       * The focus ring goes on the host: the pixel frame's fill is clipped
       * (clip-path), which would cut off an outline on the inner control.
       */
      .pixel-frame input:focus {
        outline: none;
      }
      :host(:not([type="checkbox"]):not([type="radio"]):focus-within) {
        outline: 2px solid var(--color-brand-600);
        outline-offset: 2px;
      }
    `,
  ];

  @property({ type: String, reflect: true }) type: ThemeInputType = "text";
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";
  /** Checked state, for `type="checkbox"` and `type="radio"`. */
  @property({ type: Boolean }) checked = false;

  private defaultValue = "";
  private defaultChecked = false;

  private get isBox(): boolean {
    return this.type === "checkbox" || this.type === "radio";
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.defaultValue = this.getAttribute("value") ?? "";
    this.defaultChecked = this.hasAttribute("checked");
    this.addEventListener("click", this.onHostClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("click", this.onHostClick);
  }

  protected formValue(): string | null {
    if (this.isBox) return this.checked ? this.value || "on" : null;
    return this.value;
  }

  protected restoreDefault(): void {
    this.value = this.defaultValue;
    this.checked = this.defaultChecked;
  }

  /**
   * A label activating this control clicks the host, not the native box
   * inside it; pass that click on so the label toggles the box. Clicks that
   * started inside (on the box itself) are left alone.
   */
  private onHostClick = (e: MouseEvent): void => {
    if (!this.isBox || this.isDisabled || e.composedPath()[0] !== this) return;
    this.renderRoot.querySelector("input")?.click();
  };

  /**
   * Each radio lives in its own shadow root, so native `name` grouping can't
   * reach its siblings: uncheck same-named `theme-input` radios by hand.
   */
  private onBoxChange(e: Event): void {
    this.checked = (e.target as HTMLInputElement).checked;
    if (this.type === "radio" && this.checked && this.name) {
      const root = this.getRootNode() as Document | ShadowRoot;
      root.querySelectorAll<ThemeInput>(`theme-input[type="radio"]`).forEach((other) => {
        if (other !== this && other.name === this.name) other.checked = false;
      });
    }
    this.emitChange();
  }

  private onTextInput(e: Event): void {
    this.value = (e.target as HTMLInputElement).value;
  }

  render() {
    if (this.isBox) {
      return html`<input
        type=${this.type}
        .value=${this.value}
        .checked=${this.checked}
        ?disabled=${this.isDisabled}
        aria-label=${ifDefined(this.accessibleName)}
        @change=${this.onBoxChange}
        class="accent-brand-600"
        style="width: 1rem; height: 1rem; margin: 0;"
      />`;
    }

    return html`<div class="pixel-frame" style=${SHAPE_STYLE}>
      <div class="pixel-frame__fill">
        <input
          type=${this.type}
          .value=${this.value}
          placeholder=${ifDefined(this.placeholder || undefined)}
          ?disabled=${this.isDisabled}
          aria-label=${ifDefined(this.accessibleName)}
          @input=${this.onTextInput}
          @change=${this.emitChange}
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
