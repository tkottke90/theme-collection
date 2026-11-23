export type JournalCategoryColor = "red" | "blue" | "tan" | "green" | "purple" | "orange";

/**
 * The background each category color actually renders with when it sits
 * behind light text (tabs, ribbons, pennants). Red/blue/purple are the
 * literal style-guide swatches — the style guide's own measurements already
 * pass contrast for light text there. Tan/green/orange are this theme's
 * darkened fix for the three §9 contrast failures (estimated, not measured
 * to the same rigor as the style guide's own numbers — see this package's
 * README), applied here once so every component gets it automatically
 * instead of each caller having to pick a "-dark" token itself.
 */
export const CATEGORY_BG: Record<JournalCategoryColor, string> = {
  red: "var(--red)",
  blue: "var(--blue)",
  tan: "var(--tan-dark)",
  green: "var(--green-dark)",
  purple: "var(--purple)",
  orange: "var(--orange-dark)",
};
