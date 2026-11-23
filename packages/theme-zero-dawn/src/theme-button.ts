import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { plateStyles } from "./plate-styles.js";

type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Face/edge colours per variant, as arbitrary-property utilities so they
 * resolve from theme tokens; the chamfered shape comes from `.zd-plate`.
 */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "zd-drop text-core [--zd-face:var(--color-plate-100)] [--zd-edge:var(--color-plate-50)] hover:[--zd-face:var(--color-plate-50)] focus-visible:[--zd-edge:var(--color-brand-500)]",
  secondary:
    "zd-drop text-text [--zd-face:var(--color-plate-700)] [--zd-edge:var(--color-plate-300)] hover:[--zd-face:var(--color-plate-500)] focus-visible:[--zd-edge:var(--color-brand-500)]",
  ghost:
    "text-brand-300 [--zd-edge:transparent] hover:[--zd-face:var(--color-core)] focus-visible:[--zd-edge:var(--color-brand-500)]",
};

const DISABLED_CLASSES =
  "cursor-not-allowed text-text-muted [--zd-face:var(--color-plate-800)] [--zd-edge:var(--color-plate-700)]";

@customElement("theme-button")
export class ThemeButton extends LitElement {
  static styles = [
    themeStyles,
    plateStyles,
    css`
      :host {
        display: inline-block;
      }
      button:focus-visible {
        outline: none;
        filter: drop-shadow(0 0 6px var(--color-brand-500));
      }
    `,
  ];

  @property({ type: String }) label = "Click me";
  @property({ type: String, reflect: true }) variant: ButtonVariant = "primary";
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    const variantClasses = this.disabled ? DISABLED_CLASSES : VARIANT_CLASSES[this.variant];
    return html`<button
      ?disabled=${this.disabled}
      class="zd-plate cursor-pointer border-0 bg-transparent px-5 py-2.5 font-sans text-sm font-semibold tracking-[0.12em] uppercase ${variantClasses}"
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
