/**
 * Geometry for the machine-plate frame shared by Card, Container, Detail and
 * Blockquote: a faceted plate (large chamfers top-left / bottom-right, small
 * ones on the other two corners) sitting on a dark core, with a seam notch in
 * the top edge where the core and a wire show through.
 */
export interface PlateOptions {
  /** Large chamfer (top-left, bottom-right), px. */
  cut?: number;
  /** Small chamfer (top-right, bottom-left), px. */
  smallCut?: number;
  /** How far the hard core drop sits below/right of the plate, px. */
  drop?: number;
  /** Width of the bevel band (plate edge to groove), px. */
  groove?: number;
  /** Whether to cut the seam notch into the top edge. */
  notch?: boolean;
}

export interface PlateGeometry {
  viewBox: string;
  /** The plate itself (light shell), including the seam notch. */
  plateD: string;
  /** Un-notched plate outline, drawn underneath so the notch shows core. */
  underD: string;
  /** Un-notched plate outline shifted by `drop` — the hard core shadow. */
  dropD: string;
  /** Crease where the bevel meets the flat top, inset from the plate edge. */
  grooveD: string;
  /**
   * The bevel band between the plate edge and the groove, as one flat facet
   * per edge/chamfer. `light` is how squarely the facet faces a top-left light
   * (1 = straight at it, -1 = straight away), for flat per-facet shading.
   */
  bevel: Array<{ d: string; light: number }>;
  /** Glowing seam along the top-left chamfer. */
  glowD: string;
  /** Short wire running through the notch (empty when there's no notch). */
  wireD: string;
}

const K = Math.SQRT2 - 1;

/** Unit vector pointing toward the light (top-left, screen coordinates). */
const LIGHT: [number, number] = [-Math.SQRT1_2, -Math.SQRT1_2];

function r(n: number): number {
  return Math.round(n * 100) / 100;
}

function poly(points: Array<[number, number]>): string {
  return `M${points.map(([x, y]) => `${r(x)} ${r(y)}`).join(" L")} Z`;
}

/**
 * A 45° chamfer of size `c`, inset by `d`, keeps its diagonal but measures
 * c + d(√2 − 1) − d from the inset corner. A square corner (c = 0) stays
 * square, so clamp at 0 rather than going negative.
 */
function innerCut(c: number, d: number): number {
  return c > 0 ? Math.max(0, c + d * K - d) : 0;
}

/** Chamfered rectangle from (x0,y0) to (x1,y1). */
function chamferPoints(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  cut: number,
  small: number,
): Array<[number, number]> {
  return [
    [x0 + cut, y0],
    [x1 - small, y0],
    [x1, y0 + small],
    [x1, y1 - cut],
    [x1 - cut, y1],
    [x0 + small, y1],
    [x0, y1 - small],
    [x0, y0 + cut],
  ];
}

export function computePlate(
  width: number,
  height: number,
  options: PlateOptions = {},
): PlateGeometry | null {
  if (width <= 0 || height <= 0) return null;

  const { drop = 5, groove = 7, notch = true } = options;
  // Never let a chamfer eat more than a third of the shorter side.
  const limit = Math.min(width, height) / 3;
  const cut = Math.min(options.cut ?? 18, limit);
  const small = Math.max(0, Math.min(options.smallCut ?? 6, limit));

  const outline = chamferPoints(0, 0, width, height, cut, small);

  // Seam notch: a shallow trapezoid bitten out of the top edge, right of centre.
  const notchDepth = 5;
  const notchWidth = 44;
  const notchEnd = width - small - 18;
  const notchStart = notchEnd - notchWidth;
  const hasNotch = notch && notchStart > cut + 24;

  const platePoints: Array<[number, number]> = hasNotch
    ? [
        [cut, 0],
        [notchStart, 0],
        [notchStart + notchDepth, notchDepth],
        [notchEnd - notchDepth, notchDepth],
        [notchEnd, 0],
        ...outline.slice(1),
      ]
    : outline;

  const g = Math.min(groove, limit / 2);
  const groovePoints =
    g > 0 ? chamferPoints(g, g, width - g, height - g, innerCut(cut, g), innerCut(small, g)) : [];
  const grooveD = g > 0 ? poly(groovePoints) : "";

  // One quad per outline edge: outer edge → matching groove edge. Points run
  // clockwise in screen space, so an edge (dx, dy) has outward normal (dy, -dx).
  const bevel = groovePoints.flatMap((inner0, i) => {
    const j = (i + 1) % outline.length;
    const outer0 = outline[i] as [number, number];
    const outer1 = outline[j] as [number, number];
    const inner1 = groovePoints[j] as [number, number];
    const dx = outer1[0] - outer0[0];
    const dy = outer1[1] - outer0[1];
    const len = Math.hypot(dx, dy);
    // A square corner (zero-size chamfer) is a zero-length edge: no facet.
    if (len < 0.01) return [];
    const light = (dy / len) * LIGHT[0] + (-dx / len) * LIGHT[1];
    return [{ d: poly([outer0, outer1, inner1, inner0]), light: Math.round(light * 1000) / 1000 }];
  });

  const dropD = poly(outline.map(([x, y]): [number, number] => [x + drop, y + drop]));

  return {
    viewBox: `0 0 ${r(width)} ${r(height)}`,
    plateD: poly(platePoints),
    underD: poly(outline),
    dropD,
    grooveD,
    bevel,
    glowD: `M0 ${r(cut)} L${r(cut)} 0`,
    wireD: hasNotch ? `M${r(notchStart + 2)} 2.5 H${r(notchEnd - 2)}` : "",
  };
}
