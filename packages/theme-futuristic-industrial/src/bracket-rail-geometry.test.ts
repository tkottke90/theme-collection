import { computeBracketRail } from "./bracket-rail-geometry.js";

describe("computeBracketRail", () => {
  it("returns null when there's nothing to measure yet", () => {
    expect(computeBracketRail(0, 200)).toBeNull();
    expect(computeBracketRail(300, 0)).toBeNull();
  });

  it("draws the bar with a rising foot on a tall rail", () => {
    const g = computeBracketRail(300, 200)!;
    expect(g.d.split("L")).toHaveLength(7);
    // The arm reaches past the bar but stays inside the 40px content gutter.
    expect(g.reach).toBeGreaterThan(11);
    expect(g.reach).toBeLessThan(40);
  });

  it("falls back to a plain bar when the rail is too short for the foot", () => {
    const g = computeBracketRail(300, 30)!;
    expect(g.d.split("L")).toHaveLength(4);
    expect(g.reach).toBe(11);
  });
});
