import { css } from "lit";

/**
 * For components that paint their own light surface (Card, Container, Detail,
 * ...): clears any `--theme-*` text overrides inherited from a dark ancestor,
 * so `text-fg` and friends fall back to the dark-on-light defaults. Custom
 * properties inherit through slots, so without this a Card inside a Casing
 * would get light text on a light panel.
 */
export const lightSurface = css`
  :host {
    --theme-fg: initial;
    --theme-fg-muted: initial;
    --theme-link: initial;
    --theme-link-hover: initial;
  }
`;

/** For dark surfaces: switches slotted text roles to light, contrast-checked values. */
export const darkSurface = css`
  :host {
    --theme-fg: var(--color-neutral-50);
    --theme-fg-muted: var(--color-neutral-300);
    --theme-link: var(--color-brand-500);
    --theme-link-hover: var(--color-brand-50);
  }
`;
