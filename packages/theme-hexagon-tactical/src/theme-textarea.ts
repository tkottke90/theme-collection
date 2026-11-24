import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeStyles } from "./generated/theme-styles.js";

@customElement("theme-textarea")
export class ThemeTextarea extends LitElement {
  /** Focusing the element focuses the inner control (used by `theme-field`'s label). */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  @property({ type: Number }) rows = 4;
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";
  /**
   * Accessible name, forwarded to the inner control. `theme-field` sets this
   * from its label, since a label outside this shadow root can't reach it.
   */
  @property({ type: String, attribute: "accessible-label" }) accessibleLabel?: string;

  render() {
    return html`<textarea
      aria-label=${ifDefined(this.accessibleLabel)}
      rows=${this.rows}
      .value=${this.value}
      placeholder=${this.placeholder}
      class="rounded-theme border border-border bg-surface-alt px-3 py-2 [font:inherit] text-text placeholder:text-text-muted focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1"
    ></textarea>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-textarea": ThemeTextarea;
  }
}
