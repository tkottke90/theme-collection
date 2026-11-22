import type { JSX } from "preact";
import { useId } from "preact/hooks";
import type { ViewfinderGeometry } from "./viewfinder-geometry.js";

/**
 * Renders the viewfinder frame's `<svg>` overlay: an outer outline (shared
 * corner radius, a raised top tab and inward side/bottom notches), a plain
 * inset inner line, and four identical inset corner brackets. Place inside a
 * `position: relative; isolation: isolate` parent — see `HudFrameSvg.tsx`
 * for why the glow filter gets a unique `id` per instance here (no Shadow
 * DOM to scope it like the WC build has).
 */
export function ViewfinderFrameSvg({
  geometry,
}: {
  geometry: ViewfinderGeometry | null;
}): JSX.Element {
  const filterId = `viewfinder-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const viewBox = geometry?.viewBox ?? "0 0 1 1";
  const outerD = geometry?.outerD ?? "";
  const innerD = geometry?.innerD ?? "";
  const bracketsD = geometry?.bracketsD ?? "";

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
        d={bracketsD}
        fill="none"
        stroke="var(--color-brand-500)"
        stroke-width={4}
        stroke-linecap="square"
        stroke-linejoin="miter"
        filter={`url(#${filterId})`}
      />
      {/* eslint-enable react/no-unknown-property */}
    </svg>
  );
}
