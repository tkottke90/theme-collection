import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { plateStyles } from "./plate-styles.js";
import { SOCKET_CLASSES, SOCKET_CONTROL_CLASSES } from "./form-control-classes.js";

@customElement("theme-textarea")
export class ThemeTextarea extends LitElement {
  static styles = [
    themeStyles,
    plateStyles,
    css`
      :host {
        display: inline-block;
        font-family: var(--font-sans);
      }
    `,
  ];

  @property({ type: Number }) rows = 4;
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";

  render() {
    return html`<span class=${SOCKET_CLASSES}>
      <textarea
        rows=${this.rows}
        .value=${this.value}
        placeholder=${this.placeholder}
        class="${SOCKET_CONTROL_CLASSES} resize-y"
      ></textarea>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-textarea": ThemeTextarea;
  }
}
