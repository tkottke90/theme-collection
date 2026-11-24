import { svg, type SVGTemplateResult } from "lit";
import { renderBevel } from "./plate-frame-svg.js";
import { computePlate, type PlateGeometry } from "./plate-geometry.js";

/**
 * The faces of `theme-progress`: a glowing cyan channel, either on a
 * raised steel plate or cut straight into the surface. Each renders at a
 * measured width `w` (px) and returns its own height, so the bar stretches
 * to its container without distorting bevels.
 */
export interface ProgressFace {
  height: number;
  content: SVGTemplateResult;
}

const GLOW = "url(#zd-progress-glow)";

/**
 * The lit part shared by both faces: the cyan fill on the channel floor, a
 * bright leading edge, and seam ticks splitting the floor into `segments`.
 */
function renderFill(
  x0: number,
  y0: number,
  len: number,
  depth: number,
  pct: number,
  segments: number,
) {
  const fill = len * pct;
  const ticks = Array.from({ length: segments - 1 }, (_, k) => {
    const x = x0 + (len * (k + 1)) / segments;
    return svg`<line class="tick" x1=${x} y1=${y0} x2=${x} y2=${y0 + depth} stroke="var(--color-core-deep)" stroke-width="1.5" />`;
  });
  return svg`
    <rect class="fill" x=${x0} y=${y0} width=${fill} height=${depth} fill="var(--color-brand-500)" filter=${GLOW} />
    ${
      pct > 0 && pct < 1
        ? svg`<rect x=${x0 + fill - 2} y=${y0} width="2" height=${depth} fill="var(--color-brand-100)" />`
        : null
    }
    ${ticks}
  `;
}

// --- Raised: a bevelled steel plate with the channel cut into it -------------

const RAISED_H = 22;
const RAISED_INSET = 9; // channel's left/right inset from the plate edge
const RAISED_Y = 8;
const RAISED_DEPTH = 6;

/**
 * A raised, bevelled steel plate (the secondary button's construction) with a
 * channel cut into it. Sits best on dark steel containers. The channel is lit
 * as a recess: top and left walls dark, bottom and right walls catching the
 * light.
 */
export function renderRaised(w: number, pct: number, segments: number): ProgressFace {
  const g = computePlate(w, RAISED_H, { cut: 8, smallCut: 0, groove: 3, drop: 3, notch: false });
  const x0 = RAISED_INSET;
  const x1 = w - RAISED_INSET;
  const len = Math.max(0, x1 - x0);
  const y1 = RAISED_Y + RAISED_DEPTH;

  return {
    height: RAISED_H,
    content: svg`
      ${
        g
          ? svg`
            <defs><clipPath id="zd-ch-clip"><path d=${g.underD} /></clipPath></defs>
            <path class="drop" d=${g.dropD} fill="var(--color-core-deep)" />
            <path class="plate" d=${g.underD} fill="var(--color-plate-700)" />
            ${renderBevel(g, "zd-ch-clip")}
          `
          : null
      }
      <rect class="channel" x=${x0} y=${RAISED_Y} width=${len} height=${RAISED_DEPTH} fill="var(--color-core-deep)" />
      ${renderFill(x0, RAISED_Y, len, RAISED_DEPTH, pct, segments)}
      <path d="M${x0} ${y1} V${RAISED_Y} H${x1}" fill="none" stroke="var(--color-core)" stroke-width="1" />
      <path d="M${x1} ${RAISED_Y} V${y1} H${x0}" fill="none" stroke="var(--color-plate-300)" stroke-opacity="0.6" stroke-width="1" />
    `,
  };
}

// --- Recessed: the channel cut straight into the surface ----------------------

const RECESSED_H = 14;
const RECESSED_WALL = 3;

/** The same bevel facets, lit as walls of a hole: each faces inward. */
function invert(g: PlateGeometry): PlateGeometry {
  return { ...g, bevel: g.bevel.map((f) => ({ ...f, light: -f.light })) };
}

/**
 * No plate: a chamfered slot cut into whatever surface it sits on, so it
 * takes that surface's colour. Its bevel band is lit as the slot's walls, the
 * reverse of a raised edge: the top and left walls face away from the light
 * and fall into shadow, the bottom and right walls catch it. The cyan fill
 * sits on the slot floor and its glow spills up the walls (but never out onto
 * the surface), so on a light panel the light reads as coming from inside it.
 */
export function renderRecessed(w: number, pct: number, segments: number): ProgressFace {
  const g = computePlate(w, RECESSED_H, {
    cut: 5,
    smallCut: 0,
    groove: RECESSED_WALL,
    drop: 0,
    notch: false,
  });
  const x0 = RECESSED_WALL;
  const len = Math.max(0, w - 2 * RECESSED_WALL);
  const depth = RECESSED_H - 2 * RECESSED_WALL;

  return {
    height: RECESSED_H,
    content: svg`
      ${
        g
          ? svg`
            <defs>
              <clipPath id="zd-rc-slot"><path d=${g.underD} /></clipPath>
              <clipPath id="zd-rc-floor"><path d=${g.grooveD} /></clipPath>
            </defs>
            <path class="slot" d=${g.underD} fill="var(--color-core)" fill-opacity="0.35" />
            <g class="walls">${renderBevel(invert(g), "zd-rc-slot")}</g>
            <path class="floor" d=${g.grooveD} fill="var(--color-core-deep)" />
            <g clip-path="url(#zd-rc-slot)">
              <g clip-path="url(#zd-rc-floor)">${renderFill(x0, RECESSED_WALL, len, depth, pct, segments)}</g>
              <rect class="spill" x=${x0} y="0" width=${len * pct} height=${RECESSED_H} fill="var(--color-brand-500)" fill-opacity="0.18" />
            </g>
          `
          : null
      }
    `,
  };
}
