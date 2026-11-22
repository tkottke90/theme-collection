import { svg } from "lit";

/**
 * Shared SVG filter/gradient definitions for the field-journal surfaces.
 *
 * Shadow DOM scopes element IDs: a filter defined in one component's shadow
 * root can't be reached via `url(#id)`/`filter="url(#id)"` from a different
 * shadow root (confirmed by `@tkottke90/theme-tactical-wc`'s
 * `hud-frame-svg.ts`, which hits the same constraint for its HUD glow
 * filter). Rather than one page-wide `<svg><defs>` (the approach the
 * original reference HTML and the React/CSS builds of a theme can use),
 * every component that needs one of these renders its own copy via the
 * functions below. They're tiny and static, so duplicating them per
 * instance costs nothing measurable.
 */

/** Parchment grain + faint stains (`#j-paper`) and slightly uneven, hand-cut edges (`#j-rough`). Used by theme-journal-page. */
export function renderPaperFilters() {
  return svg`
    <filter id="j-paper" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="3" result="fine" />
      <feColorMatrix
        in="fine"
        type="matrix"
        result="fineA"
        values="0 0 0 0 .42  0 0 0 0 .30  0 0 0 0 .16  .6 0 0 0 -.22"
      />
      <feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" seed="11" result="blot" />
      <feColorMatrix
        in="blot"
        type="matrix"
        result="blotA"
        values="0 0 0 0 .55  0 0 0 0 .38  0 0 0 0 .18  1 0 0 0 -.45"
      />
      <feMerge result="merged">
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="blotA" />
        <feMergeNode in="fineA" />
      </feMerge>
      <feComposite in="merged" in2="SourceGraphic" operator="in" />
    </filter>
    <filter id="j-rough" x="-3%" y="-3%" width="106%" height="106%">
      <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="4" result="t" />
      <feDisplacementMap in="SourceGraphic" in2="t" scale="5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  `;
}

/** Page shading: a soft vignette toward the edges and a gutter shadow toward the spine. */
export function renderPageGradients() {
  return svg`
    <radialGradient id="j-vignette" cx=".5" cy=".5" r=".75">
      <stop offset=".55" stop-color="#6e4620" stop-opacity="0" />
      <stop offset="1" stop-color="#6e4620" stop-opacity=".26" />
    </radialGradient>
    <linearGradient id="j-gutter-left" x1="0" x2="1">
      <stop offset=".86" stop-color="#3d2410" stop-opacity="0" />
      <stop offset=".97" stop-color="#3d2410" stop-opacity=".22" />
      <stop offset="1" stop-color="#3d2410" stop-opacity=".42" />
    </linearGradient>
    <linearGradient id="j-gutter-right" x1="1" x2="0">
      <stop offset=".86" stop-color="#3d2410" stop-opacity="0" />
      <stop offset=".97" stop-color="#3d2410" stop-opacity=".22" />
      <stop offset="1" stop-color="#3d2410" stop-opacity=".42" />
    </linearGradient>
  `;
}

/** Hand-drawn wobble (`#j-ink`), for consumers supplying their own illustrations/sketches inside theme-taped. */
export function renderInkFilter() {
  return svg`
    <filter id="j-ink">
      <feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="2" result="t" />
      <feDisplacementMap in="SourceGraphic" in2="t" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  `;
}

/** Corner flourish ornament, drawn in `currentColor` — wrap in an `<svg viewBox="0 0 40 40">`. */
export function renderFlourishPath() {
  return svg`
    <path
      d="M3 37 V12 Q3 3 12 3 H37 M9 31 V15 Q9 9 15 9 H31"
      fill="none"
      stroke="currentColor"
      stroke-width="1.1"
    />
    <path d="M15 15 q8 -1 9 6 q-7 1 -9 -6z" fill="currentColor" opacity=".55" />
    <circle cx="3" cy="37" r="1.6" fill="currentColor" />
    <circle cx="37" cy="3" r="1.6" fill="currentColor" />
  `;
}

/** Ornamental divider, drawn in `currentColor` — wrap in an `<svg viewBox="0 0 260 16">`. */
export function renderDividerPath() {
  return svg`
    <path
      d="M0 8 H100 M160 8 H260 M100 8 q7 -7 14 0 M146 8 q7 7 14 0"
      fill="none"
      stroke="currentColor"
      stroke-width="1.1"
    />
    <path d="M130 1 L137 8 L130 15 L123 8z" fill="currentColor" />
    <circle cx="118" cy="8" r="1.6" fill="currentColor" />
    <circle cx="142" cy="8" r="1.6" fill="currentColor" />
  `;
}
