import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
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
export class ThemeInput extends LitElement {
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
    `,
  ];

  @property({ type: String }) type: ThemeInputType = "text";
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";

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
