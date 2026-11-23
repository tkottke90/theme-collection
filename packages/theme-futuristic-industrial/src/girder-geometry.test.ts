import { computeGirder, openingPolygons } from "./girder-geometry.js";

describe("computeGirder", () => {
  it("returns null when there's nothing to measure, or no room for openings", () => {
    expect(computeGirder(0, 0)).toBeNull();
    expect(computeGirder(400, 0)).toBeNull();
    expect(computeGirder(15, 36)).toBeNull();
  });

  it("adds diagonals as the band gets wider, always an odd number of openings", () => {
    const counts = [120, 240, 400, 800].map((w) => computeGirder(w, 36)!.openings);
    expect(counts).toEqual([...counts].sort((a, b) => a - b));
    counts.forEach((c) => expect(c % 2).toBe(1));
    expect(counts.at(-1)!).toBeGreaterThan(counts[0]!);
  });

  it("falls back to one plain opening on a short band", () => {
    expect(computeGirder(60, 36)!.openings).toBe(1);
  });

  it("emits the bar plus one subpath per opening", () => {
    const g = computeGirder(400, 36)!;
    expect(g.d.match(/M/g)!.length).toBe(1 + g.openings);
  });
});

describe("openingPolygons", () => {
  it("fills the interior exactly, with mirrored end openings", () => {
    const polys = openingPolygons(0, 0, 400, 30, 12);
    const first = polys[0]!;
    const last = polys.at(-1)!;
    expect(first[0]![0]).toBe(0);
    expect(last[1]![0]).toBe(400);
    const topWidth = (p: (typeof polys)[number]) => p[1]![0] - p[0]![0];
    expect(topWidth(first)).toBeCloseTo(topWidth(last), 6);
  });

  it("keeps every flat joint the same width", () => {
    const polys = openingPolygons(0, 0, 400, 30, 12);
    // Inner openings alternate a flat bottom and a flat top.
    const flats = polys
      .slice(1, -1)
      .map((p, i) => (i % 2 === 0 ? p[2]![0] - p[3]![0] : p[1]![0] - p[0]![0]));
    flats.forEach((f) => expect(f).toBeCloseTo(flats[0]!, 6));
    expect(flats[0]!).toBeCloseTo(polys[0]![1]![0] - polys[0]![0]![0], 6);
  });
});
