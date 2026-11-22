import type { JSX } from "preact";
import { useId } from "preact/hooks";
import type { HudFrameGeometry } from "./hud-geometry.js";

/**
 * Renders the HUD frame's `<svg>` overlay for a given (possibly not-yet-
 * measured) geometry. Place inside a `position: relative; isolation: isolate`
 * parent — the svg itself is `position: absolute; inset: 0; z-index: -1` so
 * it never affects that parent's own layout (the parent's ordinary content
 * sets its size, not this overlay).
 *
 * Unlike the Web Components build of this theme, there's no Shadow DOM here
 * to scope the glow filter's `id` to this one instance, so each instance
 * gets its own unique id via `useId()` — reusing one literal id across every
 * `<ThemeCard>`/`<ThemeStat>` on a page would be invalid, duplicate-id HTML.
 */
export function HudFrameSvg({ geometry }: { geometry: HudFrameGeometry | null }): JSX.Element {
  const filterId = `hud-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const viewBox = geometry?.viewBox ?? "0 0 1 1";
  const outerD = geometry?.outerD ?? "";
  const innerD = geometry?.innerD ?? "";
  const accentsD = geometry?.accentsD ?? "";

  return (
    <svg
      className="pointer-events-none absolute inset-0 block h-full w-full"
      style={{ overflow: "visible" }}
      viewBox={viewBox}
      aria-hidden="true"
    >
      {/* eslint-disable react/no-unknown-property -- Preact (unlike React) doesn't
      camelCase-normalize SVG attributes; these must stay kebab-case or the browser ignores them. */}
      <defs>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={2.5} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d={outerD} fill="var(--color-surface)" stroke="var(--color-border)" stroke-width={2} />
      <path d={innerD} fill="none" stroke="var(--color-frame-inner)" stroke-width={1} />
      <path
        d={accentsD}
        fill="none"
        stroke="var(--color-brand-500)"
        stroke-width={4}
        stroke-linejoin="miter"
        filter={`url(#${filterId})`}
      />
      {/* eslint-enable react/no-unknown-property */}
    </svg>
  );
}
