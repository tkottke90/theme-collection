import { css } from "lit";

/**
 * Shared hand-written CSS for the small chamfered controls (Button, Input,
 * Select, Textarea, Skeleton) — shapes Tailwind utilities can't express.
 * Colours are never set here: each component sets `--zd-face` / `--zd-edge`
 * through Tailwind arbitrary-property classes pointing at theme tokens.
 *
 * `.zd-plate` draws the edge and the face as two clipped pseudo-elements
 * (clip-path removes a real border, so the "border" is the outer layer
 * showing around a face inset by `--zd-bw`). `--zd-cut` / `--zd-bw` are read
 * with fallbacks rather than declared here, so a component's own
 * `[--zd-cut:…]` utility isn't overridden by this later stylesheet.
 */
export const plateStyles = css`
  .zd-plate {
    position: relative;
    isolation: isolate;
  }
  .zd-plate::before,
  .zd-plate::after {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none;
    clip-path: polygon(
      var(--zd-cut, 10px) 0,
      100% 0,
      100% calc(100% - var(--zd-cut, 10px)),
      calc(100% - var(--zd-cut, 10px)) 100%,
      0 100%,
      0 var(--zd-cut, 10px)
    );
    transition: background-color 0.15s ease;
  }
  .zd-plate::before {
    inset: 0;
    background: var(--zd-edge, transparent);
  }
  .zd-plate::after {
    inset: var(--zd-bw, 2px);
    background: var(--zd-face, transparent);
  }
  .zd-chamfer {
    clip-path: polygon(
      var(--zd-cut, 10px) 0,
      100% 0,
      100% calc(100% - var(--zd-cut, 10px)),
      calc(100% - var(--zd-cut, 10px)) 100%,
      0 100%,
      0 var(--zd-cut, 10px)
    );
  }
  /* Hard core drop under a plate: a flat offset, not a blur. */
  .zd-drop {
    filter: drop-shadow(3px 4px 0 var(--color-core-deep));
  }
  .zd-glow,
  .zd-socket:focus-within {
    filter: drop-shadow(0 0 6px var(--color-brand-500));
  }
  @media (prefers-reduced-motion: reduce) {
    .zd-plate::before,
    .zd-plate::after {
      transition: none;
    }
  }
`;
