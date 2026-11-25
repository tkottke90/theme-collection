import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormButtonElement } from "./generated/core/form-button.js";
import { themeStyles } from "./generated/theme-styles.js";

const VARIANT_CLASSES: Record<"primary" | "secondary" | "ghost", string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  secondary: "bg-transparent text-brand-500 border border-brand-500 hover:bg-brand-50",
  ghost: "bg-transparent text-brand-500 hover:bg-brand-50",
};

@customElement("theme-button")
export class ThemeButton extends FormButtonElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  @property({ type: String }) label = "Click me";
  @property({ type: String, reflect: true }) variant: "primary" | "secondary" | "ghost" = "primary";

  render() {
    return html`<button
      aria-label=${ifDefined(this.accessibleName)}
      ?disabled=${this.isDisabled}
      class="rounded-theme px-4 py-2 cursor-pointer [font:inherit] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:border-neutral-100 ${VARIANT_CLASSES[this.variant]}"
    >
      <slot>${this.label}</slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-button": ThemeButton;
  }
}
