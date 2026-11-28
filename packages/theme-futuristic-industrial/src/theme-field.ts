import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { FieldElement } from "./generated/core/field.js";
import { themeStyles } from "./generated/theme-styles.js";

/**
 * A label stacked over the control slotted into it.
 *
 * Linking the label to its control (accessible name, click-to-focus) comes
 * from the shared `FieldElement` base; see its docs.
 */
@customElement("theme-field")
export class ThemeField extends FieldElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`
      <div class="field font-sans flex flex-col gap-1.5">
        <label
          @click=${this.onLabelClick}
          class="font-semibold text-fg text-sm tracking-wide uppercase"
          >${this.label}</label
        >
        <slot @slotchange=${this.link}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-field": ThemeField;
  }
}
