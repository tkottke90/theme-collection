import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-transport-control")
export class ThemeTransportControl extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
      .ctrl {
        display: inline-grid;
        place-items: center;
        width: 64px;
        height: 56px;
        padding: 0;
        border: 3px solid var(--color-border-hi);
        border-radius: var(--radius-theme-sm);
        background: linear-gradient(180deg, var(--color-surface-raised), var(--color-surface));
        color: var(--color-text-muted);
        cursor: pointer;
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.06),
          0 3px 6px rgba(0, 0, 0, 0.5);
      }
      ::slotted(svg) {
        width: 30px;
        height: 30px;
      }
      .ctrl:hover {
        border-color: var(--color-text-muted);
        color: var(--color-text);
      }
      .ctrl[aria-pressed="true"] {
        border-color: var(--color-brand-500);
        color: var(--color-brand-500);
        box-shadow: 0 0 10px rgb(163 206 66 / 0.25);
      }
      .ctrl:focus-visible {
        outline: 2px solid var(--color-brand-500);
        outline-offset: 3px;
      }
    `,
  ];

  @property({ type: Boolean }) pressed = false;
  @property({ type: String }) label = "";

  render() {
    return html`<button class="ctrl" aria-pressed=${String(this.pressed)} aria-label=${this.label}>
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-transport-control": ThemeTransportControl;
  }
}
