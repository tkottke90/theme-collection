import { computeWell } from "./well-geometry.js";

describe("computeWell", () => {
  it("returns null when there's nothing to measure, or no room for the double rule", () => {
    expect(computeWell(0, 40)).toBeNull();
    expect(computeWell(10, 40)).toBeNull();
  });

  it("draws two chamfered rules, all four corners cut", () => {
    const g = computeWell(80, 48)!;
    expect(g.viewBox).toBe("0 0 80 48");
    // Four cut corners = eight outline points.
    expect(g.outerD.split("L")).toHaveLength(8);
    expect(g.innerD.split("L")).toHaveLength(8);
  });

  it("shrinks the chamfer on a small well", () => {
    // min(10, 18 / 3) = 6: the outer rule's first point sits at y = 6 + inset.
    const g = computeWell(40, 18)!;
    expect(g.outerD.startsWith("M0.75,6.")).toBe(true);
  });
});
