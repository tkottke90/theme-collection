import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { FieldElement } from "./generated/core/field.js";
import { themeStyles } from "./generated/theme-styles.js";

/**
 * Label + control stack; the label carries a small wire-amber bead.
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
      <div class="field flex flex-col gap-2 font-sans">
        <label
          @click=${this.onLabelClick}
          class="flex cursor-pointer items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[var(--zd-ink,var(--color-text))]"
          ><svg viewBox="0 0 8 8" class="h-2 w-2" aria-hidden="true">
            <path d="M4 0 L8 4 L4 8 L0 4 Z" fill="var(--zd-accent, var(--color-wire-300))" /></svg
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
