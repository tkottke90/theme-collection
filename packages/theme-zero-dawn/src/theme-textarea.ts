import { css, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { customElement, property } from "lit/decorators.js";
import { FormControlElement } from "./form-control.js";
import { themeStyles } from "./generated/theme-styles.js";
import { plateStyles } from "./plate-styles.js";
import { SOCKET_CLASSES, SOCKET_CONTROL_CLASSES } from "./form-control-classes.js";

@customElement("theme-textarea")
export class ThemeTextarea extends FormControlElement {
  static styles = [
    themeStyles,
    plateStyles,
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
    return html`<span class=${SOCKET_CLASSES}>
      <textarea
        rows=${this.rows}
        .value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.isDisabled}
        aria-label=${ifDefined(this.accessibleName)}
        @input=${this.onInput}
        @change=${this.emitChange}
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
