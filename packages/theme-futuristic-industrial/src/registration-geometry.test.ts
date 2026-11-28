import { computeRegistration } from "./registration-geometry.js";

describe("computeRegistration", () => {
  it("returns null when there's nothing to measure yet", () => {
    expect(computeRegistration(0, 100)).toBeNull();
  });

  it("draws four corner brackets and eight ticks", () => {
    const g = computeRegistration(300, 200)!;
    expect(g.viewBox).toBe("0 0 300 200");
    expect(g.bracketsD.match(/M/g)).toHaveLength(4);
    expect(g.ticksD.match(/M/g)).toHaveLength(8);
  });

  it("leaves the same gap at the middle of every edge, sized from the shorter side", () => {
    // Top-left bracket ends short of the top edge's midpoint (x = 150).
    const topLeft = computeRegistration(300, 200)!.bracketsD.split(" M")[0]!;
    const endX = Number(topLeft.split(" L").at(-1)!.split(",")[0]);
    expect(endX).toBeLessThan(150);
    expect(endX).toBeCloseTo(150 - 0.11 * 200, 6);
  });

  it("still draws on a small frame without a negative chamfer", () => {
    const g = computeRegistration(30, 30)!;
    expect(g.bracketsD).not.toContain("NaN");
  });
});
