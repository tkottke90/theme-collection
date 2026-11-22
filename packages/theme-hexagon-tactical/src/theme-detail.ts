import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { panelFrameStyles } from "./panel-frame.js";

@customElement("theme-detail")
export class ThemeDetail extends LitElement {
  static styles = [
    themeStyles,
    panelFrameStyles,
    css`
      :host {
        display: block;
      }
      summary {
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-brand-500);
        cursor: pointer;
      }
      summary::-webkit-details-marker {
        color: var(--color-brand-500);
      }
    `,
  ];

  @property({ type: String }) summary = "";

  render() {
    return html`
      <details class="panel diag">
        <summary>${this.summary}</summary>
        <div style="margin-top: 0.75rem">
          <slot></slot>
        </div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-detail": ThemeDetail;
  }
}
