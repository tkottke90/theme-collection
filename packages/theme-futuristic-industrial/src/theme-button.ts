import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormButtonElement } from "./generated/core/form-button.js";
import { themeStyles } from "./generated/theme-styles.js";

/*
 * Hover states keep AA: the primary fill lightens (ink on it 5.68:1; ink on
 * the darker brand-600 would be 3.05:1), and secondary/ghost text moves to
 * the link-hover colour so it still passes over the 10% tint.
 */
const VARIANT_CLASSES: Record<"primary" | "secondary" | "ghost", string> = {
  primary:
    "chamfer text-neutral-900 [--btn-fill:var(--color-brand-500)] hover:[--btn-fill:color-mix(in_srgb,var(--color-brand-500)_75%,white)] disabled:[--btn-fill:var(--color-neutral-100)]",
  secondary:
    "rounded-theme bg-transparent text-link border border-current hover:text-link-hover hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)] disabled:bg-neutral-100 disabled:border-neutral-100",
  ghost:
    "rounded-theme bg-transparent text-link hover:text-link-hover hover:bg-[color-mix(in_srgb,currentColor_10%,transparent)] disabled:bg-neutral-100",
};

/**
 * A form-associated button (see `FormButtonElement`): `type="submit"` or
 * `"reset"` acts on its form, it follows `<fieldset disabled>`, and it is
 * named by the host's `aria-label`.
 */
@customElement("theme-button")
export class ThemeButton extends FormButtonElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
      }
      /* The primary variant's chamfered fill is drawn on a clipped layer
         behind the label rather than by clipping the button itself, which
         would also cut away the focus outline. */
      .chamfer::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        background: var(--btn-fill);
        clip-path: polygon(
          8px 0,
          100% 0,
          100% calc(100% - 8px),
          calc(100% - 8px) 100%,
          0 100%,
          0 8px
        );
      }
    `,
  ];

  @property({ type: String }) label = "Click me";
  @property({ type: String, reflect: true }) variant: "primary" | "secondary" | "ghost" = "primary";

  render() {
    return html`<button
      aria-label=${ifDefined(this.accessibleName)}
      ?disabled=${this.isDisabled}
      class="relative isolate px-4 py-2 cursor-pointer whitespace-nowrap text-sm font-semibold tracking-wide uppercase [font:inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link disabled:cursor-not-allowed disabled:opacity-50 disabled:text-neutral-500 ${VARIANT_CLASSES[this.variant]}"
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
