import { computeStripeBand } from "./stripe-band-geometry.js";

describe("computeStripeBand", () => {
  it("returns null when there's nothing to measure yet", () => {
    expect(computeStripeBand(0, 24)).toBeNull();
    expect(computeStripeBand(400, 0)).toBeNull();
  });

  it("emits the solid block plus one subpath per stripe", () => {
    const g = computeStripeBand(400, 24)!;
    expect(g.stripes).toBeGreaterThan(0);
    expect(g.fillD.match(/M/g)!.length).toBe(1 + g.stripes);
  });

  it("trades stripes for block as the solid fraction grows", () => {
    const few = computeStripeBand(400, 24, 0.8)!.stripes;
    const many = computeStripeBand(400, 24, 0.1)!.stripes;
    expect(many).toBeGreaterThan(few);
  });

  it("draws no stripes when the block fills the band", () => {
    expect(computeStripeBand(400, 24, 1)!.stripes).toBe(0);
  });

  it("keeps the outline's slanted end inside the box", () => {
    expect(computeStripeBand(400, 24)!.outlineD).toBe(
      "M0.5,0.5 L399.5,0.5 L390.3,23.5 L0.5,23.5 Z",
    );
  });
});
