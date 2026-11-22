import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

const VARIANT_CLASSES: Record<"primary" | "secondary" | "ghost", string> = {
  primary: "bg-brand-500 text-neutral-900 shadow-glow hover:bg-brand-600",
  secondary: "bg-transparent text-brand-500 border border-brand-500 hover:bg-brand-900",
  ghost: "bg-transparent text-brand-500 hover:bg-brand-900",
};

@customElement("theme-button")
export class ThemeButton extends LitElement {
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
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`<button
      ?disabled=${this.disabled}
      class="rounded-theme px-4 py-2 cursor-pointer text-sm font-semibold tracking-wide uppercase [font:inherit] disabled:cursor-not-allowed disabled:border-border disabled:bg-surface-alt disabled:text-text-muted disabled:opacity-60 disabled:shadow-none ${VARIANT_CLASSES[this.variant]}"
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
