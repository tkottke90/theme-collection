import { svg, type SVGTemplateResult } from "lit";
import { renderBrushFilter } from "./glyphs.js";
import { renderBevel } from "./plate-frame-svg.js";
import { computePlate } from "./plate-geometry.js";

/**
 * The faces of `theme-plate-stack`. Each renders at a measured width `w` (px)
 * and returns its own height, so the bar stretches to its container without
 * distorting bevels or brush strokes. Fixed-width `shards` is the original.
 */
export interface StackFace {
  height: number;
  content: SVGTemplateResult;
}

const GLOW = "url(#zd-stack-glow)";

// --- Shards: the original overlapping armour shards (fixed width) ------------

const SHARD = "M2 44 Q5 16 26 2 L30 6 Q17 21 15 46 Z";
const SHARD_STEP = 20;

export function shardsWidth(segments: number): number {
  return (segments - 1) * SHARD_STEP + 34;
}

export function renderShards(pct: number, segments: number): StackFace {
  const lit = Math.round(pct * segments);
  const shards = Array.from({ length: segments }, (_, i) => {
    const on = i < lit;
    return svg`
      <g transform="translate(${i * SHARD_STEP} 0)" class=${on ? "shard on" : "shard"}>
        <path d=${SHARD} transform="translate(2 3)" fill="var(--color-core-deep)" />
        <path
          d=${SHARD}
          fill=${on ? "var(--color-plate-100)" : "var(--color-plate-700)"}
          stroke=${on ? "var(--color-plate-50)" : "var(--color-plate-500)"}
          stroke-width="1"
        />
        ${on ? svg`<path d="M26 2 L30 6" stroke="var(--color-brand-500)" stroke-width="2.5" filter=${GLOW} />` : null}
      </g>
    `;
  });
  return { height: 50, content: svg`${shards}` };
}

// --- Channel: raised steel plate with a sunken, cyan-filled channel ----------

const CH_H = 22;
const CH_INSET = 9; // channel's left/right inset from the plate edge
const CH_Y = 8;
const CH_DEPTH = 6;

/**
 * A raised, bevelled steel plate (the secondary button's construction) with a
 * channel cut into it. The channel is lit as a recess: its top and left walls
 * face away from the light and read dark, its bottom and right walls catch it.
 * A glowing cyan bar fills the channel; seam ticks split it into `segments`.
 */
export function renderChannel(w: number, pct: number, segments: number): StackFace {
  const g = computePlate(w, CH_H, { cut: 8, smallCut: 0, groove: 3, drop: 3, notch: false });
  const x0 = CH_INSET;
  const x1 = w - CH_INSET;
  const len = Math.max(0, x1 - x0);
  const fill = len * pct;
  const y1 = CH_Y + CH_DEPTH;

  const ticks = Array.from({ length: segments - 1 }, (_, k) => {
    const x = x0 + (len * (k + 1)) / segments;
    return svg`<line class="tick" x1=${x} y1=${CH_Y} x2=${x} y2=${y1} stroke="var(--color-core-deep)" stroke-width="1.5" />`;
  });

  return {
    height: CH_H,
    content: svg`
      ${
        g
          ? svg`
            <defs><clipPath id="zd-ch-clip"><path d=${g.underD} /></clipPath></defs>
            <path d=${g.dropD} fill="var(--color-core-deep)" />
            <path d=${g.underD} fill="var(--color-plate-700)" />
            ${renderBevel(g, "zd-ch-clip")}
          `
          : null
      }
      <rect class="channel" x=${x0} y=${CH_Y} width=${len} height=${CH_DEPTH} fill="var(--color-core-deep)" />
      <rect class="fill" x=${x0} y=${CH_Y} width=${fill} height=${CH_DEPTH} fill="var(--color-brand-500)" filter=${GLOW} />
      ${
        pct > 0 && pct < 1
          ? svg`<rect x=${x0 + fill - 2} y=${CH_Y} width="2" height=${CH_DEPTH} fill="var(--color-brand-100)" />`
          : null
      }
      ${ticks}
      <path d="M${x0} ${y1} V${CH_Y} H${x1}" fill="none" stroke="var(--color-core)" stroke-width="1" />
      <path d="M${x1} ${CH_Y} V${y1} H${x0}" fill="none" stroke="var(--color-plate-300)" stroke-opacity="0.6" stroke-width="1" />
    `,
  };
}

// --- Cells: a row of small raised plate blocks --------------------------------

const CELL_H = 14;
const CELL_GAP = 4;

/**
 * `segments` small raised plates, each built and bevelled exactly like a
 * button. Filled cells are sunlit plate with a cyan seam just inside the top
 * bevel (on the bevel itself the lit facet washes it out); empty cells are
 * dark steel.
 */
export function renderCells(w: number, pct: number, segments: number): StackFace {
  const lit = Math.round(pct * segments);
  const cw = Math.max(6, (w - CELL_GAP * (segments - 1)) / segments);

  const cells = Array.from({ length: segments }, (_, i) => {
    const on = i < lit;
    const g = computePlate(cw, CELL_H, { cut: 4, smallCut: 0, groove: 2, drop: 2, notch: false });
    if (!g) return null;
    const clip = `zd-cell-clip-${i}`;
    return svg`
      <g class=${on ? "cell on" : "cell"} transform="translate(${(i * (cw + CELL_GAP)).toFixed(2)} 0)">
        <defs><clipPath id=${clip}><path d=${g.underD} /></clipPath></defs>
        <path d=${g.dropD} fill="var(--color-core-deep)" />
        <path d=${g.underD} fill=${on ? "var(--color-plate-100)" : "var(--color-plate-700)"} />
        ${renderBevel(g, clip)}
        ${
          on
            ? // A rect, not a line: a filter sized from a zero-height line's
              // bounding box has no area, so a glowing horizontal line vanishes.
              svg`<rect class="seam" x="5" y="2.25" width=${(cw - 8).toFixed(2)} height="2" fill="var(--color-brand-500)" filter=${GLOW} />`
            : null
        }
      </g>
    `;
  });

  return { height: CELL_H + 2, content: svg`${cells}` };
}

// --- Peaks: the divider's painted sawtooth, filling with ochre ----------------

const PK_STEP = 12;
const PK_BASE = 20;
const PK_H = 30;

/**
 * The divider's sawtooth band, brush-painted. Peaks fill with ochre up to the
 * value, and the ochre diamond medallion rides the band as the progress
 * marker.
 */
export function renderPeaksBar(w: number, pct: number): StackFace {
  const count = Math.max(2, Math.floor(w / PK_STEP));
  const step = w / count;
  const teeth = Array.from({ length: count }, (_, i) => {
    const x = i * step;
    const tip = i % 2 === 0 ? 4 : 11;
    const on = (i + 0.5) / count <= pct;
    return svg`<polygon
      class=${on ? "tooth on" : "tooth"}
      points="${x.toFixed(2)},${PK_BASE} ${(x + step / 2).toFixed(2)},${tip} ${(x + step).toFixed(2)},${PK_BASE}"
      fill=${on ? "var(--color-tribe-ochre)" : "var(--color-plate-500)"}
    />`;
  });
  const mx = Math.min(w - 7, Math.max(7, w * pct));
  const my = PK_BASE + 1.5;

  return {
    height: PK_H,
    content: svg`
      <defs>${renderBrushFilter("zd-stack-brush", 2)}</defs>
      <g filter="url(#zd-stack-brush)">
        ${teeth}
        <rect x="0" y=${PK_BASE} width=${w} height="3" fill="var(--color-band)" />
        <g class="marker">
          <path d="M${mx} ${my - 7} L${mx + 7} ${my} L${mx} ${my + 7} L${mx - 7} ${my} Z" fill="var(--color-tribe-ochre)" />
          <path d="M${mx} ${my - 3.5} L${mx + 3.5} ${my} L${mx} ${my + 3.5} L${mx - 3.5} ${my} Z" fill="var(--color-core)" />
          <circle cx=${mx} cy=${my} r="1.5" fill="var(--color-brand-500)" />
        </g>
      </g>
    `,
  };
}
