import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormControlElement } from "./generated/core/form-control.js";
import { themeStyles } from "./generated/theme-styles.js";

/** A native `<textarea>` in a form-associated host (see `FormControlElement`). */
@customElement("theme-textarea")
export class ThemeTextarea extends FormControlElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
        font-family: var(--font-sans);
      }
      :host([disabled]),
      :host([data-disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
    `,
  ];

  @property({ type: Number }) rows = 4;
  @property({ type: String }) value = "";
  @property({ type: String }) placeholder = "";

  private defaultValue = "";

  connectedCallback(): void {
    super.connectedCallback();
    this.defaultValue = this.getAttribute("value") ?? "";
  }

  protected formValue(): string {
    return this.value;
  }

  protected restoreDefault(): void {
    this.value = this.defaultValue;
  }

  private onInput(e: Event): void {
    this.value = (e.target as HTMLTextAreaElement).value;
  }

  render() {
    return html`<textarea
      rows=${this.rows}
      .value=${this.value}
      placeholder=${this.placeholder}
      ?disabled=${this.isDisabled}
      aria-label=${ifDefined(this.accessibleName)}
      @input=${this.onInput}
      @change=${this.emitChange}
      class="rounded-theme border border-border px-3 py-2 [font:inherit] bg-surface-alt text-text placeholder:text-text-muted focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1"
    ></textarea>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-textarea": ThemeTextarea;
  }
}
