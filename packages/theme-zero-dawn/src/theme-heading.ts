import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { html as staticHtml, literal, type StaticValue } from "lit/static-html.js";
import { themeStyles } from "./generated/theme-styles.js";

type HeadingLevel = 1 | 2 | 3 | 4;

const TAGS: Record<HeadingLevel, StaticValue> = {
  1: literal`h1`,
  2: literal`h2`,
  3: literal`h3`,
  4: literal`h4`,
};

const SIZE_CLASSES: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold tracking-[0.08em]",
  2: "text-[1.75rem] font-bold tracking-[0.08em]",
  3: "text-[1.375rem] font-semibold tracking-[0.06em]",
  4: "text-lg font-semibold tracking-[0.06em]",
};

const ORNAMENT_WIDTH = 120;

/**
 * Squared display sans in caps. Levels 1–2 carry a painted underline
 * ornament (tapered rules either side of a diamond bead) centred on the
 * heading text.
 *
 * Centring works in two layers:
 * - CSS: text and ornament sit in a shrink-to-fit column, so for a
 *   single-line heading the column is exactly the text's width and the
 *   ornament centres on it, following the heading's own text-align.
 * - JS, only when the text wraps: a wrapped line box stretches the column to
 *   the full available width, which CSS can't shrink to the longest line. The
 *   heading then measures its rendered lines and offsets the ornament to the
 *   centre of the widest one.
 */
@customElement("theme-heading")
export class ThemeHeading extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: Number }) level: HeadingLevel = 1;

  /** Ornament left offset within the column when wrapped, else null (CSS-centred). */
  @state() private ornamentOffset: number | null = null;

  private resizeObserver?: ResizeObserver;

  connectedCallback(): void {
    super.connectedCallback();
    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.alignOrnament());
      this.resizeObserver.observe(this);
    }
    // Web fonts change line widths without changing the host's size.
    void document.fonts?.ready.then(() => this.alignOrnament());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
  }

  private alignOrnament(): void {
    const column = this.shadowRoot?.querySelector<HTMLElement>(".column");
    if (!column) return;

    const range = document.createRange();
    range.selectNodeContents(this);
    const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0);
    const tops = new Set(rects.map((r) => Math.round(r.top)));

    let next: number | null = null;
    if (tops.size > 1) {
      const left = Math.min(...rects.map((r) => r.left));
      const right = Math.max(...rects.map((r) => r.right));
      const centre = (left + right) / 2 - column.getBoundingClientRect().left;
      next = Math.max(0, Math.round(centre - ORNAMENT_WIDTH / 2));
    }
    if (next !== this.ornamentOffset) this.ornamentOffset = next;
  }

  private onSlotChange = () => this.alignOrnament();

  render() {
    const level = TAGS[this.level] ? this.level : 1;
    const tagClasses = `m-0 mb-3 font-sans leading-tight uppercase text-[var(--zd-ink,var(--color-text))] ${SIZE_CLASSES[level]}`;

    if (level > 2) {
      return staticHtml`<${TAGS[level]} class=${tagClasses}><slot></slot></${TAGS[level]}>`;
    }

    const ornamentStyle =
      this.ornamentOffset === null
        ? "color: var(--zd-accent, var(--color-wire-300))"
        : `color: var(--zd-accent, var(--color-wire-300)); align-self: flex-start; margin-left: ${this.ornamentOffset}px`;

    const ornament = html`<svg
      viewBox="0 0 120 10"
      class="ornament mt-2 block h-2.5 w-[120px] max-w-full"
      aria-hidden="true"
      style=${ornamentStyle}
    >
      <path d="M0 5 L46 3.5 V6.5 Z M120 5 L74 3.5 V6.5 Z" fill="currentColor" />
      <path d="M60 0 L65 5 L60 10 L55 5 Z" fill="currentColor" />
    </svg>`;

    // The text's negative end margin drops the trailing letter-spacing after
    // the last glyph, which would otherwise pull the diamond off centre.
    return staticHtml`<${TAGS[level]} class=${tagClasses}><span class="column inline-flex max-w-full flex-col items-center align-top"><span class="text block mr-[-0.08em]"><slot @slotchange=${this.onSlotChange}></slot></span>${ornament}</span></${TAGS[level]}>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-heading": ThemeHeading;
  }
}
