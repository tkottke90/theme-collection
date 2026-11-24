import { LitElement, css, html, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import { themeStyles } from "./generated/theme-styles.js";
import {
  GLYPH_COLORS,
  GLYPH_SHAPES,
  GLYPHS,
  type GlyphColor,
  type GlyphName,
  type GlyphShape,
  renderBrushFilter,
  renderGlyphStrokes,
} from "./glyphs.js";

/**
 * A hand-painted tribal emblem: a dry-brushed backing shape in one of the
 * tribal paint colours with an off-white glyph on top. Decorative unless a
 * `label` is given, in which case it's exposed as an image.
 */
@customElement("theme-glyph")
export class ThemeGlyph extends LitElement {
  static styles = [
    themeStyles,
    css`
      :host {
        display: inline-block;
        line-height: 0;
      }
    `,
  ];

  @property({ type: String, reflect: true }) name: GlyphName = "spear";
  @property({ type: String, reflect: true }) color: GlyphColor = "red";
  @property({ type: String, reflect: true }) shape: GlyphShape = "triangle";
  @property({ type: Number }) size = 56;
  @property({ type: String }) label = "";

  render() {
    const name = this.name in GLYPHS ? this.name : "spear";
    const colors = GLYPH_COLORS[this.color] ?? GLYPH_COLORS.red;
    const shape = GLYPH_SHAPES[this.shape] ?? GLYPH_SHAPES.triangle;
    // With no backing, the glyph is painted directly in the colour itself.
    const ink = this.shape === "none" ? colors.fill : colors.ink;

    return html`<svg
      viewBox="0 0 100 100"
      width=${this.size}
      height=${this.size}
      role=${this.label ? "img" : "presentation"}
      aria-label=${this.label || ""}
      aria-hidden=${this.label ? "false" : "true"}
    >
      <defs>${renderBrushFilter("zd-glyph-brush", 5)}</defs>
      <g filter="url(#zd-glyph-brush)">
        ${shape.d ? svg`<path class="backing" d=${shape.d} fill=${colors.fill} />` : null}
        ${renderGlyphStrokes(name, ink, shape.transform)}
      </g>
    </svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "theme-glyph": ThemeGlyph;
  }
}
