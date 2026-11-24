import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormControlElement } from "./generated/core/form-control.js";
import { themeStyles } from "./generated/theme-styles.js";

interface OptionData {
  value: string;
  label: string;
  selected: boolean;
  disabled: boolean;
}

/**
 * A styled native `<select>` built from light-DOM `<option>` children, in a
 * form-associated host (see `FormControlElement`).
 *
 * The options are mirrored into the shadow `<select>` rather than slotted:
 * Chromium doesn't render `<option>`s slotted into a shadow-root `<select>`,
 * which leaves the control empty. A MutationObserver keeps the mirror in
 * sync when options are added, removed or edited.
 */
@customElement("theme-select")
export class ThemeSelect extends FormControlElement {
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

  /** The selected option's value. Defaults to the `selected` option, else the first. */
  @property({ type: String }) value = "";

  @state() private options: OptionData[] = [];

  private observer?: MutationObserver;

  connectedCallback(): void {
    super.connectedCallback();
    this.readOptions();
    this.observer = new MutationObserver(() => this.readOptions());
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  private readOptions(): void {
    this.options = [...this.querySelectorAll("option")].map((o) => ({
      value: o.value,
      label: o.textContent?.trim() ?? "",
      selected: o.hasAttribute("selected"),
      disabled: o.disabled,
    }));
    if (!this.options.some((o) => o.value === this.value)) {
      this.value = (this.options.find((o) => o.selected) ?? this.options[0])?.value ?? "";
    }
  }

  private onChange(e: Event): void {
    this.value = (e.target as HTMLSelectElement).value;
    this.emitChange();
  }

  protected formValue(): string {
    return this.value;
  }

  /** Back to the option marked `selected` in markup, or the first one. */
  protected restoreDefault(): void {
    this.value = "";
    this.readOptions();
  }

  render() {
    return html`<select
      ?disabled=${this.isDisabled}
      aria-label=${ifDefined(this.accessibleName)}
      class="rounded-theme border border-border bg-surface-alt px-3 py-2 [font:inherit] text-text focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1"
      @change=${this.onChange}
    >
      ${this.options.map(
        (o) =>
          html`<option value=${o.value} ?disabled=${o.disabled} ?selected=${o.value === this.value}>
            ${o.label}
          </option>`,
      )}
    </select>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-select": ThemeSelect;
  }
}
