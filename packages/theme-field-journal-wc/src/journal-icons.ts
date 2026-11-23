import { svg, type SVGTemplateResult } from "lit";

/**
 * Interface icons for the field-journal theme: 24×24, 1.7px stroked lines in
 * `currentColor`, round caps/joins, no fills except small details — so each
 * icon takes on the colour of the text/accent around it. Inlined directly
 * (rather than a `<symbol>`/`<use>` sprite) since `<use href="#id">` can't
 * reach a `<symbol>` defined in a different shadow root — see
 * journal-defs-svg.ts.
 */
export type JournalIconName =
  | "quest"
  | "pin"
  | "person"
  | "paw"
  | "feather"
  | "bag"
  | "parcel"
  | "lantern"
  | "mushroom"
  | "coin"
  | "flask"
  | "star";

export const JOURNAL_ICON_PATHS: Record<JournalIconName, SVGTemplateResult> = {
  quest: svg`<path d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2zM9 9h6M9 13h6M9 17h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />`,
  pin: svg`<path d="M12 21s-6-6.5-6-11a6 6 0 0 1 12 0c0 4.5-6 11-6 11z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /><circle cx="12" cy="10" r="2.2" fill="currentColor" />`,
  person: svg`<circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="1.7" /><path d="M5 20c1-4 4-6 7-6s6 2 7 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />`,
  paw: svg`<g fill="currentColor"><circle cx="6.5" cy="10" r="1.9" /><circle cx="10" cy="6" r="1.9" /><circle cx="14" cy="6" r="1.9" /><circle cx="17.5" cy="10" r="1.9" /><path d="M12 11.5c-3 0-5.5 3.4-5.5 5.6 0 1.9 2 2.4 5.5 2.4s5.5-.5 5.5-2.4c0-2.2-2.5-5.6-5.5-5.6z" /></g>`,
  feather: svg`<path d="M19 4C12 5 8 10 7 17l-2 3M7 17c4 0 8-3 9-8M10 13h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />`,
  bag: svg`<path d="M5 9h14l-1 11H6zM9 9V7a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />`,
  parcel: svg`<path d="M4 8l8-4 8 4v8l-8 4-8-4zM4 8l8 4 8-4M12 12v8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />`,
  lantern: svg`<path d="M10 3h4M9 6h6M8 6h8v11H8zM7 20h10M9 17v3M15 17v3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" /><path d="M12 9.5c1.3 1.3 1.3 3 0 4.5-1.3-1.5-1.3-3.2 0-4.5z" fill="currentColor" />`,
  mushroom: svg`<path d="M4 12a8 7 0 0 1 16 0zM10 12v6a2 2 0 0 0 4 0v-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /><circle cx="9" cy="8.5" r="1" fill="currentColor" /><circle cx="14.5" cy="7.5" r="1" fill="currentColor" />`,
  coin: svg`<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.7" /><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.2" />`,
  flask: svg`<path d="M10 3h4M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />`,
  star: svg`<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor" />`,
};
