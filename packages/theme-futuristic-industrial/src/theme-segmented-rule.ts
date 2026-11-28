import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";

/**
 * Proportions of the reference sheet's top segmented rule (88px bars, 8×15px
 * slots), as fractions of the bar thickness.
 */
const SEGMENT_LENGTH = 0.55;
const SEGMENT_GAP = 0.67;
const BAR_GAP = 0.8;

export type SegmentedRuleOrientation = "horizontal" | "vertical";

/**
 * A divider from the reference sheet: two equal orange bars with a run of
 * short slots between them. Horizontal by default, filling its width; a
 * vertical rule fills its parent's height.
 */
@customElement("theme-segmented-rule")
export class ThemeSegmentedRule extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
      }
      :host([orientation="vertical"]) {
        display: inline-block;
        height: 100%;
      }
    `,
  ];

  @property({ type: String, reflect: true }) orientation: SegmentedRuleOrientation = "horizontal";
  /** Bar thickness, px. Everything else scales from it. */
  @property({ type: Number }) size = 10;
  @property({ type: Number }) segments = 5;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }

  protected updated(): void {
    this.setAttribute("aria-orientation", this.orientation);
  }

  render() {
    const vertical = this.orientation === "vertical";
    const s = this.size;
    const box = vertical ? `width:${s}px;height:100%` : `height:${s}px`;
    const segment = vertical ? `height:${s * SEGMENT_LENGTH}px` : `width:${s * SEGMENT_LENGTH}px`;
    const dir = vertical ? "flex-col" : "";

    return html`<div class="flex ${dir}" style="${box};gap:${s * BAR_GAP}px">
      <span class="flex-1 bg-brand-500"></span>
      <span class="flex ${dir}" style="gap:${s * SEGMENT_GAP}px">
        ${Array.from(
          { length: Math.max(0, this.segments) },
          () => html`<span class="bg-brand-500" style=${segment}></span>`,
        )}
      </span>
      <span class="flex-1 bg-brand-500"></span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-segmented-rule": ThemeSegmentedRule;
  }
}
