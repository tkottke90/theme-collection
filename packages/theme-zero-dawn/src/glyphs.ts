import { svg } from "lit";

/**
 * Original brush-stroke glyphs in the spirit of the tribal sign-painting
 * reference (symmetric, chevron-heavy, a few chunky strokes). None of these
 * trace the reference sheet. Each glyph is stroke-only path data in a 60×60
 * local box.
 */
export const GLYPHS = {
  spear: "M30 4 V58 M17 19 L30 4 L43 19 M19 40 H41",
  peaks: "M4 48 L20 20 L30 34 L40 16 L56 48 M10 57 H50",
  eye: "M4 30 Q30 6 56 30 Q30 54 4 30 Z M30 21 L39 30 L30 39 L21 30 Z",
  sun: "M30 14 L46 30 L30 46 L14 30 Z M30 1 V8 M30 52 V59 M1 30 H8 M52 30 H59",
  feather:
    "M30 4 V58 M30 14 L16 5 M30 14 L44 5 M30 27 L14 17 M30 27 L46 17 M30 40 L16 31 M30 40 L44 31",
  wave: "M3 18 L13 8 L23 18 L33 8 L43 18 L57 6 M3 42 L13 32 L23 42 L33 32 L43 42 L57 30",
  hearth: "M30 5 L55 52 H5 Z M30 26 V40",
  focus: "M30 12 A18 18 0 1 1 29.9 12 M30 1 V20 M30 40 V59 M1 30 H20 M40 30 H59",
  claw: "M14 6 Q6 30 18 56 M30 4 V58 M46 6 Q54 30 42 56",
  quote: "M12 12 H28 L18 40 M34 12 H50 L40 40",
} as const;

export type GlyphName = keyof typeof GLYPHS;

export type GlyphColor =
  "red" | "orange" | "ochre" | "moss" | "teal" | "cobalt" | "violet" | "band" | "core";

/** Fill token per colour, and whether paint-white or core ink reads on it. */
export const GLYPH_COLORS: Record<GlyphColor, { fill: string; ink: string }> = {
  red: { fill: "var(--color-tribe-red)", ink: "var(--color-paint)" },
  orange: { fill: "var(--color-tribe-orange)", ink: "var(--color-paint)" },
  ochre: { fill: "var(--color-tribe-ochre)", ink: "var(--color-core)" },
  moss: { fill: "var(--color-tribe-moss)", ink: "var(--color-paint)" },
  teal: { fill: "var(--color-tribe-teal)", ink: "var(--color-paint)" },
  cobalt: { fill: "var(--color-tribe-cobalt)", ink: "var(--color-paint)" },
  violet: { fill: "var(--color-tribe-violet)", ink: "var(--color-paint)" },
  band: { fill: "var(--color-band)", ink: "var(--color-core)" },
  core: { fill: "var(--color-core)", ink: "var(--color-paint)" },
};

export type GlyphShape = "triangle" | "shield" | "diamond" | "none";

/** Painted backing shape (100×100 box) and where the 60×60 glyph sits on it. */
export const GLYPH_SHAPES: Record<GlyphShape, { d: string; transform: string }> = {
  triangle: { d: "M50 4 L96 92 L4 92 Z", transform: "translate(32 44) scale(0.6)" },
  shield: { d: "M12 8 H88 V58 L50 96 L12 58 Z", transform: "translate(25 18) scale(0.83)" },
  diamond: { d: "M50 2 L98 50 L50 98 L2 50 Z", transform: "translate(27 27) scale(0.77)" },
  none: { d: "", transform: "translate(10 10) scale(1.33)" },
};

/**
 * Rough-edged brush filter: displaces a shape's edges with fractal noise so
 * flat vector fills read as dry-brushed paint.
 */
export function renderBrushFilter(id = "zd-brush", scale = 4) {
  return svg`
    <filter id=${id} x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" result="noise" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale=${scale}
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  `;
}

/** Glyph strokes (no backing), for embedding in another component's SVG. */
export function renderGlyphStrokes(name: GlyphName, ink: string, transform: string) {
  return svg`<path
    d=${GLYPHS[name]}
    transform=${transform}
    fill="none"
    stroke=${ink}
    stroke-width="8"
    stroke-linecap="square"
    stroke-linejoin="miter"
  />`;
}
