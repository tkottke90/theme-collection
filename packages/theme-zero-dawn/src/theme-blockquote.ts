import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import { GLYPHS, type GlyphName, renderBrushFilter } from "./glyphs.js";
import { PLATE_INK_CLASSES, PlateFrameController, renderPlateFrame } from "./plate-frame-svg.js";

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

const TYPE_GLYPHS: Record<BlockquoteType, GlyphName> = {
  info: "eye",
  tip: "feather",
  question: "focus",
  success: "sun",
  warning: "hearth",
  failure: "wave",
  danger: "spear",
  bug: "claw",
  example: "peaks",
  quote: "quote",
};

/** Steel plate with a hand-painted band and glyph chip in the type's colour. */
@customElement("theme-blockquote")
export class ThemeBlockquote extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: block;
        position: relative;
        isolation: isolate;
      }
    `,
  ];

  @property({ type: String, reflect: true }) type: BlockquoteType = "info";

  private frame = new PlateFrameController(this, { cut: 14, notch: false });

  render() {
    const fill = `var(--color-${this.type}-500)`;
    const ink = `var(--color-${this.type}-ink)`;
    return html`
      ${renderPlateFrame(this.frame.geometry, "steel")}
      <blockquote
        class="relative m-0 flex gap-4 py-4 pr-6 pl-4 font-serif text-lg text-text ${PLATE_INK_CLASSES.steel}"
      >
        <svg
          viewBox="0 0 10 100"
          preserveAspectRatio="none"
          class="w-2 shrink-0 self-stretch"
          aria-hidden="true"
        >
          <defs>${renderBrushFilter("zd-band-brush", 2)}</defs>
          <path d="M1 2 L9 0 L8 100 L2 98 Z" fill=${fill} filter="url(#zd-band-brush)" />
        </svg>
        <div class="min-w-0 flex-1">
          <span
            class="label mb-2 inline-flex items-center gap-2 px-2.5 py-1 font-sans text-xs font-bold tracking-[0.14em] uppercase [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)]"
            style="background:${fill};color:${ink}"
            ><svg viewBox="0 0 60 60" class="h-3.5 w-3.5" aria-hidden="true">
              ${svg`<path d=${GLYPHS[TYPE_GLYPHS[this.type]]} fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="square" />`}</svg
            >${LABELS[this.type]}</span
          >
          <div><slot></slot></div>
        </div>
      </blockquote>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-blockquote": ThemeBlockquote;
  }
}
