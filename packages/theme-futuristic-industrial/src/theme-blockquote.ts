import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { lightSurface } from "./surfaces.js";

export type BlockquoteType =
  | "info"
  | "tip"
  | "question"
  | "success"
  | "warning"
  | "failure"
  | "danger"
  | "bug"
  | "example"
  | "quote";

const LABELS: Record<BlockquoteType, string> = {
  info: "Info",
  tip: "Tip",
  question: "Question",
  success: "Success",
  warning: "Warning",
  failure: "Failure",
  danger: "Danger",
  bug: "Bug",
  example: "Example",
  quote: "Quote",
};

/** The variants that keep the tinted, left-ruled treatment. */
type PlainType = Exclude<BlockquoteType, "warning" | "danger">;

const ACCENT_CLASSES: Record<PlainType, string> = {
  info: "border-info-500 bg-[color-mix(in_srgb,var(--color-info-500)_10%,white)]",
  tip: "border-tip-500 bg-[color-mix(in_srgb,var(--color-tip-500)_10%,white)]",
  question: "border-question-500 bg-[color-mix(in_srgb,var(--color-question-500)_10%,white)]",
  success: "border-success-500 bg-[color-mix(in_srgb,var(--color-success-500)_10%,white)]",
  failure: "border-failure-500 bg-[color-mix(in_srgb,var(--color-failure-500)_10%,white)]",
  bug: "border-bug-500 bg-[color-mix(in_srgb,var(--color-bug-500)_10%,white)]",
  example: "border-example-500 bg-[color-mix(in_srgb,var(--color-example-500)_10%,white)]",
  quote: "border-quote-500 bg-[color-mix(in_srgb,var(--color-quote-500)_10%,white)]",
};

const ACCENT_TEXT_CLASSES: Record<PlainType, string> = {
  info: "text-info-500",
  tip: "text-tip-500",
  question: "text-question-500",
  success: "text-success-500",
  failure: "text-failure-500",
  bug: "text-bug-500",
  example: "text-example-500",
  quote: "text-quote-500",
};

/**
 * Warning and danger use the reference sheet's warning-tag treatment (the
 * CAUTION and BIOHAZARD labels): a solid plate, a dark outline separated from
 * it by a hairline of background, and the label in its own strip. The `vars`
 * switch slotted text and links to colors that pass on that plate — on the
 * yellow, the default link and muted colors drop to ~3.5:1.
 */
const TAGS: Partial<
  Record<BlockquoteType, { plate: string; text: string; label: string; vars: string }>
> = {
  warning: {
    plate: "bg-caution-500",
    text: "text-neutral-900",
    label: "bg-neutral-900 text-caution-500",
    vars: "--theme-fg-muted:var(--color-neutral-900);--theme-link:var(--color-neutral-900);--theme-link-hover:var(--color-neutral-900)",
  },
  danger: {
    plate: "bg-danger-500",
    text: "text-neutral-50",
    label: "bg-neutral-50 text-danger-500",
    vars: "--theme-fg:var(--color-neutral-50);--theme-fg-muted:var(--color-neutral-100);--theme-link:var(--color-neutral-50);--theme-link-hover:var(--color-caution-500)",
  },
};

@customElement("theme-blockquote")
export class ThemeBlockquote extends LitElement {
  static styles = [themeStyles, lightSurface];

  @property({ type: String, reflect: true }) type: BlockquoteType = "info";

  render() {
    const tag = TAGS[this.type];
    if (tag) {
      return html`
        <blockquote
          class="font-sans m-1 rounded-theme px-4 py-3 outline-2 outline-offset-2 outline-neutral-900 ${tag.plate} ${tag.text}"
          style=${tag.vars}
        >
          <span
            class="label mb-2 inline-block px-2 py-0.5 text-xs font-bold tracking-widest uppercase ${tag.label}"
            >${LABELS[this.type]}</span
          >
          <div><slot></slot></div>
        </blockquote>
      `;
    }

    const plain = this.type as PlainType;
    return html`
      <blockquote
        class="font-sans border-l-4 rounded-theme px-4 py-3 text-fg ${ACCENT_CLASSES[plain]}"
      >
        <span class="label block font-semibold mb-1 ${ACCENT_TEXT_CLASSES[plain]}"
          >${LABELS[this.type]}</span
        >
        <slot></slot>
      </blockquote>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-blockquote": ThemeBlockquote;
  }
}
