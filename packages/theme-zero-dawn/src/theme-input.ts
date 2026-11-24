import { css, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { customElement, property } from "lit/decorators.js";
import { FormControlElement } from "./generated/core/form-control.js";
import { themeStyles } from "./generated/theme-styles.js";
import { plateStyles } from "./plate-styles.js";
import { SOCKET_CLASSES, SOCKET_CONTROL_CLASSES } from "./form-control-classes.js";

export type ThemeInputType = "text" | "email" | "password" | "number" | "checkbox" | "radio";

/** Chamfered square for checkbox, diamond for radio — 20×20 SVG marks. */
const BOX_MARKS = {
  checkbox: {
    outer: "M5 1 H19 V15 L15 19 H1 V5 Z",
    inner: "M5 10 L9 14 L15 6",
  },
  radio: {
    outer: "M10 1 L19 10 L10 19 L1 10 Z",
    inner: "M10 6 L14 10 L10 14 L6 10 Z",
  },
} as const;

@customElement("theme-input")
export class ThemeInput extends FormControlElement {
  static styles = [
    themeStyles,
    plateStyles,
    css`
      :host {
        display: inline-block;
        font-family: var(--font-sans);
      }
      .mark-inner {
        opacity: 0;
        transition: opacity 0.12s ease;
      }
      input:checked + svg .mark-inner {
        opacity: 1;
      }
      input:checked + svg .mark-outer {
        stroke: var(--color-brand-500);
      }
      input:focus-visible + svg {
        filter: drop-shadow(0 0 4px var(--color-brand-500));
      }
      input:focus-visible + svg .mark-outer {
        stroke: var(--color-brand-300);
      }
      :host([disabled]),
      :host([data-disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
    `,
  ];

  @property({ type: String, reflect: true }) type: ThemeInputType = "text";
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";
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
   * A label activating this control clicks the host, not the hidden native
   * box inside it; pass that click on so the label toggles the box. Clicks
   * that started inside (on the box itself) are left alone.
   */
  private onHostClick = (e: MouseEvent): void => {
    if (!this.isBox || this.isDisabled || e.composedPath()[0] !== this) return;
    this.renderRoot.querySelector("input")?.click();
  };

  /**
   * Each radio lives in its own shadow root, so native `name` grouping can't
   * reach its siblings — uncheck same-named `theme-input` radios by hand.
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
    if (this.type === "checkbox" || this.type === "radio") {
      const mark = BOX_MARKS[this.type];
      const innerAttrs =
        this.type === "checkbox"
          ? { fill: "none", stroke: "var(--color-brand-500)" }
          : { fill: "var(--color-brand-500)", stroke: "none" };
      return html`<label class="relative inline-flex h-5 w-5 cursor-pointer">
        <input
          type=${this.type}
          .value=${this.value}
          .checked=${this.checked}
          ?disabled=${this.isDisabled}
          aria-label=${ifDefined(this.accessibleName)}
          @change=${this.onBoxChange}
          class="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <svg viewBox="0 0 20 20" class="h-5 w-5" aria-hidden="true">
          <path
            class="mark-outer"
            d=${mark.outer}
            fill="var(--color-core)"
            stroke="var(--color-plate-300)"
            stroke-width="1.5"
          />
          <path
            class="mark-inner"
            d=${mark.inner}
            fill=${innerAttrs.fill}
            stroke=${innerAttrs.stroke}
            stroke-width="2.5"
            stroke-linecap="square"
          />
        </svg>
      </label>`;
    }

    return html`<span class=${SOCKET_CLASSES}>
      <input
        type=${this.type}
        .value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.isDisabled}
        aria-label=${ifDefined(this.accessibleName)}
        @input=${this.onTextInput}
        @change=${this.emitChange}
        class=${SOCKET_CONTROL_CLASSES}
      />
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-input": ThemeInput;
  }
}
