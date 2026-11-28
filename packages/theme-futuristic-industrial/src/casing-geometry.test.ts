import { computeCasing } from "./casing-geometry.js";

describe("computeCasing", () => {
  it("returns null when there's nothing to measure yet", () => {
    expect(computeCasing(0, 0)).toBeNull();
    expect(computeCasing(200, 0)).toBeNull();
  });

  it("produces a viewBox, body and rule matching the measured size", () => {
    const g = computeCasing(320, 180)!;
    expect(g.viewBox).toBe("0 0 320 180");
    expect(g.bodyD.trim().endsWith("Z")).toBe(true);
    expect(g.ruleD.trim().endsWith("Z")).toBe(true);
  });

  it("places a rivet in each corner", () => {
    expect(computeCasing(320, 180)!.rivets).toEqual([
      { cx: 14, cy: 14 },
      { cx: 306, cy: 14 },
      { cx: 306, cy: 166 },
      { cx: 14, cy: 166 },
    ]);
  });

  it("sets the hazard strip into the bottom edge, clear of the rivets", () => {
    const strip = computeCasing(320, 180)!.strip!;
    expect(strip.x).toBeGreaterThan(14);
    expect(strip.x + strip.width).toBeLessThan(306);
    expect(strip.y + strip.height).toBe(168);
  });

  it("drops the strip on a panel too narrow or short for it", () => {
    expect(computeCasing(80, 180)!.strip).toBeNull();
    expect(computeCasing(320, 30)!.strip).toBeNull();
  });

  it("omits the strip when stripHeight is 0", () => {
    expect(computeCasing(320, 180, { stripHeight: 0 })!.strip).toBeNull();
  });
});
