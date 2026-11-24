import { css, svg } from "lit";
import { renderBrushFilter } from "./glyphs.js";
import { renderFacet } from "./plate-frame-svg.js";
import { facingLight } from "./plate-geometry.js";

/**
 * The faces of `theme-disc`, all drawn in a 120×120 box centred on
 * (60, 60). Each takes `pct` (0–1) for a gauge, or `null` for the
 * indeterminate spinner.
 */

const C = 60;

/** Point at radius `r`, `deg` degrees clockwise from 12 o'clock. */
export function polar(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
}

function pts(points: Array<[number, number]>): string {
  return points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
}

/** How squarely a surface facing outward at `deg` faces the theme's light. */
function facing(deg: number): number {
  const a = ((deg - 90) * Math.PI) / 180;
  return facingLight(Math.cos(a), Math.sin(a));
}

function dPath(points: Array<[number, number]>): string {
  return `M${points.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L")} Z`;
}

// --- Dish: the original face, rebuilt as a raised plate -----------------------

export const DISH_SIDES = 10;
const DISH_OUT = 58; // circumradius of the outer edge
const DISH_BEVEL = 4; // bevel band width, measured square to each edge
const DISH_IN = DISH_OUT - DISH_BEVEL / Math.cos(Math.PI / DISH_SIDES);
const DISH_TRACK = 47;
const DISH_CIRC = 2 * Math.PI * DISH_TRACK;
const DISH_SPOKES = 5;
const PANEL_R = 33;
const PANEL_W = 16;
const PANEL_H = 9;
const PANEL_BEVEL = 2;
const DISH_PERIOD = 1.6;

/** Regular polygon, flat edge at the top. */
function ring(r: number, sides: number): Array<[number, number]> {
  const step = 360 / sides;
  return Array.from({ length: sides }, (_, i) => polar(r, i * step + step / 2));
}

/**
 * A small raised panel at `deg`: rectangle with a bevel band, rotated to sit
 * tangentially on the dish. Facets are shaded from their *world* normals, so
 * each panel's lit and shaded sides follow the same top-left light as the
 * dish rim and every other plate.
 */
function renderPanel(deg: number) {
  const [px, py] = polar(PANEL_R, deg);
  const w = PANEL_W / 2;
  const h = PANEL_H / 2;
  const b = PANEL_BEVEL;
  const outer: Array<[number, number]> = [
    [-w, -h],
    [w, -h],
    [w, h],
    [-w, h],
  ];
  const inner: Array<[number, number]> = [
    [-w + b, -h + b],
    [w - b, -h + b],
    [w - b, h - b],
    [-w + b, h - b],
  ];
  const normals: Array<[number, number]> = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const facets = normals.map(([nx, ny], i) => {
    const j = (i + 1) % 4;
    const d = dPath([outer[i]!, outer[j]!, inner[j]!, inner[i]!]);
    return renderFacet(d, facingLight(nx * cos - ny * sin, nx * sin + ny * cos));
  });
  return svg`
    <g class="panel">
      <path d=${dPath(outer)} transform="translate(${px + 1.5} ${py + 2}) rotate(${deg})" fill="var(--color-core-deep)" />
      <g transform="translate(${px} ${py}) rotate(${deg})">
        <path d=${dPath(outer)} fill="var(--color-plate-100)" />
        ${facets}
      </g>
    </g>
  `;
}

/**
 * The plated dish: a ten-sided raised plate with a light-shaded bevel rim and
 * a hard core drop, five raised panels, spoke seams, an amber wire ring and a
 * cyan core. Nothing structural moves. As a gauge the cyan arc shows the
 * value; as a spinner only the light moves: the arc travels round the rim
 * and the core pulses.
 */
export function renderDish(pct: number | null) {
  const outer = ring(DISH_OUT, DISH_SIDES);
  const inner = ring(DISH_IN, DISH_SIDES);
  const step = 360 / DISH_SIDES;

  const bevel = outer.map((o0, i) => {
    const j = (i + 1) % DISH_SIDES;
    return renderFacet(dPath([o0, outer[j]!, inner[j]!, inner[i]!]), facing((i + 1) * step));
  });

  const spokes = Array.from({ length: DISH_SPOKES }, (_, i) => {
    const deg = (360 / DISH_SPOKES) * i;
    const [x1, y1] = polar(24, deg);
    const [x2, y2] = polar(DISH_IN * Math.cos(Math.PI / DISH_SIDES), deg);
    return svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke="var(--color-plate-300)" stroke-width="1.5" />`;
  });

  const panels = Array.from({ length: DISH_SPOKES }, (_, i) =>
    renderPanel((360 / DISH_SPOKES) * i + 360 / DISH_SPOKES / 2),
  );

  const arc =
    pct === null
      ? svg`<g class="arc-spin">
          <circle
            class="arc"
            cx=${C}
            cy=${C}
            r=${DISH_TRACK}
            fill="none"
            stroke="var(--color-brand-500)"
            stroke-width="4"
            stroke-dasharray="${(DISH_CIRC * 0.25).toFixed(2)} ${DISH_CIRC.toFixed(2)}"
            transform="rotate(-90 ${C} ${C})"
            filter="url(#zd-disc-glow)"
          />
        </g>`
      : svg`<circle
          class="arc"
          cx=${C}
          cy=${C}
          r=${DISH_TRACK}
          fill="none"
          stroke="var(--color-brand-500)"
          stroke-width="4"
          stroke-dasharray=${DISH_CIRC.toFixed(2)}
          stroke-dashoffset=${(DISH_CIRC * (1 - pct)).toFixed(2)}
          transform="rotate(-90 ${C} ${C})"
          filter="url(#zd-disc-glow)"
        />`;

  return svg`
    <defs>
      <linearGradient id="zd-dish" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style="stop-color: var(--color-plate-50)" />
        <stop offset="1" style="stop-color: var(--color-plate-100)" />
      </linearGradient>
    </defs>
    <g class="dish">
      <path d=${dPath(outer)} transform="translate(3 4)" fill="var(--color-core-deep)" />
      <path d=${dPath(outer)} fill="url(#zd-dish)" />
      <g class="bevel">${bevel}</g>
      ${spokes}
      ${panels}
      <circle cx=${C} cy=${C} r=${DISH_TRACK} fill="none" stroke="var(--color-core)" stroke-opacity="0.3" stroke-width="4" />
      <circle cx=${C} cy=${C} r="22" fill="none" stroke="var(--color-wire)" stroke-width="3" stroke-dasharray="20 9" />
      <circle cx=${C} cy=${C} r="18" fill="var(--color-core)" />
    </g>
    ${arc}
    <circle
      class=${pct === null ? "core core-pulse" : "core"}
      cx=${C}
      cy=${C}
      r="7"
      fill="var(--color-brand-500)"
      filter="url(#zd-disc-glow)"
    />
  `;
}

// --- Segments: machine side ------------------------------------------------

export const SEGMENT_COUNT = 12;
const SEG_IN = 33;
const SEG_OUT = 52;
const SEG_GAP = 5; // degrees between segments
const SEG_PERIOD = 1.4; // seconds for the pulse to travel once round

/**
 * A ring of flat-sided plate segments around a dark core. Each segment is
 * shaded by which way it faces, like the plate bevels but gentler, so lit
 * and unlit segments never meet in the same grey. A gauge lights
 * segments clockwise from 12 o'clock with a cyan seam on the outer edge and
 * shows the value in the core; the spinner sends a cyan pulse round the ring
 * without moving the segments (so their shading stays correct).
 */
export function renderSegments(pct: number | null) {
  const lit = pct === null ? 0 : Math.round(pct * SEGMENT_COUNT);
  const step = 360 / SEGMENT_COUNT;

  const segments = Array.from({ length: SEGMENT_COUNT }, (_, i) => {
    const a0 = i * step + SEG_GAP / 2;
    const a1 = (i + 1) * step - SEG_GAP / 2;
    const quad = pts([
      polar(SEG_IN, a0),
      polar(SEG_OUT, a0),
      polar(SEG_OUT, a1),
      polar(SEG_IN, a1),
    ]);
    const light = facing(i * step + step / 2);
    const on = i < lit;
    const [ox0, oy0] = polar(SEG_OUT, a0);
    const [ox1, oy1] = polar(SEG_OUT, a1);
    const delay = ((i / SEGMENT_COUNT - 1) * SEG_PERIOD).toFixed(3);

    return svg`
      <g class=${on ? "segment on" : "segment"}>
        <polygon points=${quad} transform="translate(2 2.5)" fill="var(--color-core-deep)" />
        <polygon
          points=${quad}
          fill=${on ? "var(--color-plate-100)" : "var(--color-plate-800)"}
        />
        <polygon
          points=${quad}
          fill=${light > 0 ? "var(--color-paint)" : "var(--color-core)"}
          fill-opacity=${(light > 0 ? 0.18 * light : 0.05 + 0.2 * -light).toFixed(3)}
        />
        ${
          on
            ? svg`<line x1=${ox0} y1=${oy0} x2=${ox1} y2=${oy1} stroke="var(--color-brand-500)" stroke-width="2.5" filter="url(#zd-disc-glow)" />`
            : null
        }
        ${
          pct === null
            ? svg`<polygon
                class=${i < 3 ? "pulse rm-on" : "pulse"}
                points=${quad}
                fill="var(--color-brand-500)"
                style="animation-delay: ${delay}s"
              />`
            : null
        }
      </g>
    `;
  });

  return svg`
    <circle cx=${C + 2} cy=${C + 2.5} r="28" fill="var(--color-core-deep)" />
    <circle cx=${C} cy=${C} r="28" fill="var(--color-core)" stroke="var(--color-plate-500)" stroke-width="1" />
    ${segments}
    ${
      pct === null
        ? svg`<path
            d="M60 51 L69 60 L60 69 L51 60 Z"
            fill="var(--color-brand-500)"
            filter="url(#zd-disc-glow)"
          />`
        : svg`<text
            class="readout"
            x="60"
            y="60"
            text-anchor="middle"
            dominant-baseline="central"
            fill="var(--color-text)"
            style="font: 600 17px var(--font-sans); letter-spacing: 0.04em"
          >${Math.round(pct * 100)}</text>`
    }
  `;
}

// --- Peaks: tribal side -----------------------------------------------------

export const PEAK_COUNT = 16;
const PEAK_BASE = 37;
const PEAK_TIP = 53;
const PEAK_HALF = 7.5; // half-width of each triangle's base, in degrees
const PEAK_PERIOD = 1.6;
const PEAK_TRAIL = [1, 0.7, 0.45, 0.25];

function peak(i: number): string {
  const mid = (360 / PEAK_COUNT) * i;
  return pts([
    polar(PEAK_BASE, mid - PEAK_HALF),
    polar(PEAK_TIP, mid),
    polar(PEAK_BASE, mid + PEAK_HALF),
  ]);
}

/**
 * The art-book sawtooth bent into a ring: brush-painted triangles pointing
 * outward round a painted band, with the divider's ochre diamond medallion at
 * the centre. A gauge paints triangles ochre clockwise from 12 o'clock; the
 * spinner ticks a fading run of lit triangles round the ring in discrete
 * steps, like a ratchet.
 */
export function renderPeaks(pct: number | null) {
  const lit = pct === null ? 0 : Math.round(pct * PEAK_COUNT);

  const base = Array.from(
    { length: PEAK_COUNT },
    (_, i) => svg`<polygon
      class=${i < lit ? "peak on" : "peak"}
      points=${peak(i)}
      fill=${i < lit ? "var(--color-tribe-ochre)" : "var(--color-plate-500)"}
    />`,
  );

  const runner =
    pct === null
      ? svg`<g class="peaks-spin">
          ${PEAK_TRAIL.map(
            (opacity, k) => svg`<polygon
              points=${peak(PEAK_COUNT - k)}
              fill="var(--color-tribe-ochre)"
              fill-opacity=${opacity}
            />`,
          )}
        </g>`
      : null;

  return svg`
    <defs>${renderBrushFilter("zd-peaks-brush", 2.5)}</defs>
    <g filter="url(#zd-peaks-brush)">
      ${base}
      ${runner}
      <circle cx=${C} cy=${C} r="32" fill="none" stroke="var(--color-band)" stroke-width="4" />
      <path d="M60 40 L80 60 L60 80 L40 60 Z" fill="var(--color-tribe-ochre)" />
      <path d="M60 49 L71 60 L60 71 L49 60 Z" fill="var(--color-core)" />
      <path d="M60 55 L65 60 L60 65 L55 60 Z" fill="var(--color-brand-500)" />
    </g>
  `;
}

/** Animations for all three faces; all stop for reduced motion. */
export const discVariantStyles = css`
  .arc-spin {
    transform-origin: 60px 60px;
    animation: zd-dish-spin ${DISH_PERIOD}s linear infinite;
  }
  @keyframes zd-dish-spin {
    to {
      transform: rotate(360deg);
    }
  }
  .core-pulse {
    transform-origin: 60px 60px;
    animation: zd-core-pulse ${DISH_PERIOD}s ease-in-out infinite;
  }
  @keyframes zd-core-pulse {
    0%,
    100% {
      transform: scale(0.745);
      opacity: 0.55;
    }
    50% {
      transform: scale(1.105);
      opacity: 1;
    }
  }
  .pulse {
    fill-opacity: 0;
    animation: zd-seg-pulse ${SEG_PERIOD}s linear infinite;
  }
  @keyframes zd-seg-pulse {
    0% {
      fill-opacity: 0.9;
    }
    45%,
    100% {
      fill-opacity: 0;
    }
  }
  .peaks-spin {
    transform-origin: 60px 60px;
    animation: zd-peaks-spin ${PEAK_PERIOD}s steps(${PEAK_COUNT}) infinite;
  }
  @keyframes zd-peaks-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .pulse,
    .peaks-spin,
    .arc-spin,
    .core-pulse {
      animation: none;
    }
    /* A still spinner still needs to read as "in progress". */
    .pulse.rm-on {
      fill-opacity: 0.6;
    }
  }
`;
