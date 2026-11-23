import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { themeStyles } from "./generated/theme-styles.js";

interface OptionData {
  value: string;
  label: string;
  selected: boolean;
  disabled: boolean;
}

/**
 * A styled native `<select>` built from light-DOM `<option>` children.
 *
 * The options are mirrored into the shadow `<select>` rather than slotted:
 * Chromium doesn't render `<option>`s slotted into a shadow-root `<select>`,
 * which left the control empty. A MutationObserver keeps the mirror in sync
 * when options are added, removed or edited.
 */
@customElement("theme-select")
export class ThemeSelect extends LitElement {
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

  /** The selected option's value. Defaults to the `selected` option, else the first. */
  @property({ type: String }) value = "";
  /**
   * Accessible name, forwarded to the inner control. `theme-field` sets this
   * from its label, since a label outside this shadow root can't reach it.
   */
  @property({ type: String, attribute: "accessible-label" }) accessibleLabel?: string;

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
      label: o.textContent ?? "",
      selected: o.hasAttribute("selected"),
      disabled: o.disabled,
    }));
    if (!this.options.some((o) => o.value === this.value)) {
      this.value = (this.options.find((o) => o.selected) ?? this.options[0])?.value ?? "";
    }
  }

  private onChange(e: Event): void {
    this.value = (e.target as HTMLSelectElement).value;
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  render() {
    return html`<select
      aria-label=${ifDefined(this.accessibleLabel)}
      class="rounded-theme border border-neutral-300 px-3 py-2 [font:inherit] text-neutral-900 bg-neutral-50 focus:outline focus:outline-2 focus:outline-brand-500 focus:outline-offset-1"
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
