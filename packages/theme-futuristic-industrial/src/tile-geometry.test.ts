import { computeTile } from "./tile-geometry.js";

describe("computeTile", () => {
  it("returns null when there's nothing to measure yet", () => {
    expect(computeTile(0, 80)).toBeNull();
  });

  it("draws a rounded body and three hatch stripes", () => {
    const g = computeTile(120, 96)!;
    expect(g.viewBox).toBe("0 0 120 96");
    expect(g.bodyD.trim().endsWith("Z")).toBe(true);
    expect(g.hatchD.match(/M/g)).toHaveLength(3);
  });

  it("keeps the hatch inside the 24px content padding's clear corner", () => {
    // The padded content box's corner sits 24·√2 ≈ 33.9px from the tile corner.
    expect(computeTile(120, 96)!.hatchReach).toBeLessThan(24 * Math.SQRT2);
  });
});
