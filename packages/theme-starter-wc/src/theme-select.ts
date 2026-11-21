import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { tokens } from "./tokens.js";

/**
 * Projects light-DOM `<option>` children straight into a native `<select>`
 * via the default slot. Current Chromium/Firefox/Safari render slotted
 * `<option>` elements correctly inside a shadow-DOM `<select>`; older
 * browsers without that support would need a different approach.
 */
@customElement("theme-select")
export class ThemeSelect extends LitElement {
  static styles = [
    tokens,
    css`
      :host {
        display: inline-block;
      }
      select {
        border-radius: var(--radius-theme);
        border: 1px solid var(--neutral-300);
        padding: 0.5rem 0.75rem;
        font: inherit;
        color: var(--neutral-900);
        background-color: white;
      }
      select:focus {
        outline: 2px solid var(--brand-500);
        outline-offset: 1px;
      }
    `,
  ];

  render() {
    return html`<select>
      <slot></slot>
    </select>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-select": ThemeSelect;
  }
}
