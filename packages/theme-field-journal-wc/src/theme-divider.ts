import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { renderDividerPath } from "./journal-defs-svg.js";

/** Two thin lines with curls meeting a central diamond — sits under page titles and between major sections. */
@customElement("theme-divider")
export class ThemeDivider extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      svg {
        display: block;
        width: min(260px, 80%);
        height: 16px;
        margin: 6px auto;
        color: var(--ink-soft);
      }
    `,
  ];

  render() {
    return html`<svg viewBox="0 0 260 16" aria-hidden="true">${renderDividerPath()}</svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-divider": ThemeDivider;
  }
}
