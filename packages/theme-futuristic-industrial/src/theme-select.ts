import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/**
 * Projects light-DOM `<option>` children straight into a native `<select>`
 * via the default slot. Current Chromium/Firefox/Safari render slotted
 * `<option>` elements correctly inside a shadow-DOM `<select>`; older
 * browsers without that support would need a different approach.
 */
@customElement("theme-select")
export class ThemeSelect extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  render() {
    return html`<select
      class="rounded-theme border border-neutral-300 px-3 py-2 [font:inherit] text-neutral-900 bg-neutral-50 focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1"
    >
      <slot></slot>
    </select>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-select": ThemeSelect;
  }
}
