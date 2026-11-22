import { css } from "lit";

/**
 * Cut-corner panel: a bold border built from two clipped layers (`::before`
 * is the border color, `::after` is the fill, inset by `--bw`), since
 * `clip-path` removes a regular CSS border. The inner cut is shrunk by
 * `--bw * .586` so a 45° diagonal border reads the same thickness as the
 * straight edges — see hex-tactical-style-guide.md §4.1.
 */
export const panelFrameStyles = css`
  .panel {
    --cut: 16px;
    --bw: 3px;
    --border: var(--color-border);
    --fill: linear-gradient(180deg, var(--color-surface-raised), var(--color-surface));
    --c-tl: var(--cut);
    --c-tr: var(--cut);
    --c-br: var(--cut);
    --c-bl: var(--cut);
    position: relative;
    isolation: isolate;
    padding: calc(var(--cut) * 0.5 + 12px) calc(var(--cut) * 0.5 + 14px);
    filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.55));
    color: var(--color-text);
    font-family: var(--font-sans);
  }
  .panel::before,
  .panel::after {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none;
  }
  .panel::before {
    inset: 0;
    background: var(--border);
    clip-path: polygon(
      var(--c-tl) 0,
      calc(100% - var(--c-tr)) 0,
      100% var(--c-tr),
      100% calc(100% - var(--c-br)),
      calc(100% - var(--c-br)) 100%,
      var(--c-bl) 100%,
      0 calc(100% - var(--c-bl)),
      0 var(--c-tl)
    );
  }
  .panel::after {
    --i-tl: max(0px, calc(var(--c-tl) - var(--bw) * 0.586));
    --i-tr: max(0px, calc(var(--c-tr) - var(--bw) * 0.586));
    --i-br: max(0px, calc(var(--c-br) - var(--bw) * 0.586));
    --i-bl: max(0px, calc(var(--c-bl) - var(--bw) * 0.586));
    inset: var(--bw);
    background: var(--fill);
    clip-path: polygon(
      var(--i-tl) 0,
      calc(100% - var(--i-tr)) 0,
      100% var(--i-tr),
      100% calc(100% - var(--i-br)),
      calc(100% - var(--i-br)) 100%,
      var(--i-bl) 100%,
      0 calc(100% - var(--i-bl)),
      0 var(--i-tl)
    );
  }
  .panel.diag {
    --c-tr: 0px;
    --c-bl: 0px;
  }
  .panel.top {
    --c-br: 0px;
    --c-bl: 0px;
  }
  .panel.accent {
    --border: var(--color-brand-500);
  }
  .panel.alert {
    --border: var(--color-danger-500);
  }
  .panel.heavy {
    --bw: 5px;
    --cut: 22px;
  }
  .panel.well {
    --fill: var(--color-void);
    --border: var(--color-border-lo);
    filter: none;
  }
  @media (forced-colors: active) {
    .panel::before,
    .panel::after {
      display: none;
    }
    .panel {
      border: 3px solid CanvasText;
    }
  }

  .panel-title {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 12px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-text-muted);
  }
  .panel-title::before {
    content: "";
    width: 14px;
    height: 4px;
    background: var(--color-brand-500);
    transform: skewX(-30deg);
    flex: none;
  }
`;
