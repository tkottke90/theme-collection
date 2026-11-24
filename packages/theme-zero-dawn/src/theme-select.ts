import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { FormControlElement } from "./form-control.js";
import { themeStyles } from "./generated/theme-styles.js";
import { plateStyles } from "./plate-styles.js";
import { SOCKET_CLASSES, SOCKET_CONTROL_CLASSES } from "./form-control-classes.js";

interface OptionData {
  value: string;
  label: string;
  selected: boolean;
  disabled: boolean;
}

/**
 * Native `<select>` in a socket frame. Consumers write light-DOM `<option>`
 * children; they're mirrored into the shadow `<select>` (and kept in sync
 * with a MutationObserver), because Chromium doesn't render `<option>`
 * elements slotted into a shadow-DOM `<select>`.
 */
@customElement("theme-select")
export class ThemeSelect extends FormControlElement {
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
      select {
        appearance: none;
      }
      option {
        background: var(--color-core);
        color: var(--color-text);
      }
    `,
  ];

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
      characterData: true,
      attributes: true,
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
  }

  private readOptions(): void {
    this.options = Array.from(this.querySelectorAll("option")).map((o) => ({
      value: o.value,
      label: o.textContent?.trim() ?? "",
      selected: o.hasAttribute("selected"),
      disabled: o.disabled,
    }));
    if (!this.value) {
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
    return html`<span class=${SOCKET_CLASSES}>
      <select
        ?disabled=${this.isDisabled}
        class="${SOCKET_CONTROL_CLASSES} cursor-pointer pr-9"
        @change=${this.onChange}
      >
        ${this.options.map(
          (o) =>
            html`<option
              value=${o.value}
              ?disabled=${o.disabled}
              ?selected=${o.value === this.value}
            >
              ${o.label}
            </option>`,
        )}
      </select>
      <svg
        viewBox="0 0 12 12"
        class="pointer-events-none absolute top-1/2 right-3 h-3 w-3 -translate-y-1/2"
        aria-hidden="true"
      >
        <path d="M1 3 L6 9 L11 3" fill="none" stroke="var(--color-brand-300)" stroke-width="2" />
      </svg>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-select": ThemeSelect;
  }
}
