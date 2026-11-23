import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { plateStyles } from "./plate-styles.js";
import { SOCKET_CLASSES, SOCKET_CONTROL_CLASSES } from "./form-control-classes.js";

/**
 * Projects light-DOM `<option>` children straight into a native `<select>`
 * via the default slot. Current Chromium/Firefox/Safari render slotted
 * `<option>` elements correctly inside a shadow-DOM `<select>`.
 */
@customElement("theme-select")
export class ThemeSelect extends LitElement {
  static styles = [
    themeStyles,
    plateStyles,
    css`
      :host {
        display: inline-block;
        font-family: var(--font-sans);
      }
      select {
        appearance: none;
      }
    `,
  ];

  render() {
    return html`<span class=${SOCKET_CLASSES}>
      <select class="${SOCKET_CONTROL_CLASSES} cursor-pointer pr-9">
        <slot></slot>
      </select>
      <svg
        viewBox="0 0 12 12"
        class="pointer-events-none absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2"
        aria-hidden="true"
      >
        <path d="M1 3 L6 9 L11 3" fill="none" stroke="var(--color-brand-300)" stroke-width="2" />
      </svg>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-select": ThemeSelect;
  }
}
