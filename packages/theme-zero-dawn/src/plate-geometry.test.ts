import { computePlate } from "./plate-geometry.js";

describe("computePlate", () => {
  it("returns null for an unmeasured host", () => {
    expect(computePlate(0, 100)).toBeNull();
    expect(computePlate(100, 0)).toBeNull();
  });

  it("sizes the viewBox to the host and chamfers the top-left corner", () => {
    const g = computePlate(300, 120, { cut: 18 });
    expect(g?.viewBox).toBe("0 0 300 120");
    expect(g?.underD.startsWith("M18 0")).toBe(true);
    expect(g?.glowD).toBe("M0 18 L18 0");
  });

  it("offsets the core drop by the drop distance", () => {
    const g = computePlate(300, 120, { cut: 18, drop: 5 });
    expect(g?.dropD.startsWith("M23 5")).toBe(true);
  });

  it("cuts a seam notch with a wire only when there's room", () => {
    const wide = computePlate(300, 120);
    expect(wide?.wireD).not.toBe("");
    expect(wide?.plateD).not.toBe(wide?.underD);

    const narrow = computePlate(80, 120);
    expect(narrow?.wireD).toBe("");
    expect(narrow?.plateD).toBe(narrow?.underD);

    const off = computePlate(300, 120, { notch: false });
    expect(off?.wireD).toBe("");
  });

  it("clamps chamfers to a third of the shorter side", () => {
    const g = computePlate(300, 30, { cut: 40 });
    expect(g?.glowD).toBe("M0 10 L10 0");
  });

  it("builds one bevel facet per edge, lit toward the top-left", () => {
    const g = computePlate(300, 120);
    const light = g?.bevel.map((f) => f.light) ?? [];
    expect(light).toHaveLength(8);
    // Order: top, top-right chamfer, right, bottom-right chamfer, bottom,
    // bottom-left chamfer, left, top-left chamfer.
    expect(light[0]).toBeCloseTo(Math.SQRT1_2);
    expect(light[1]).toBeCloseTo(0);
    expect(light[2]).toBeCloseTo(-Math.SQRT1_2);
    expect(light[3]).toBeCloseTo(-1);
    expect(light[7]).toBeCloseTo(1);
  });

  it("keeps square corners square and skips their zero-length facets", () => {
    const g = computePlate(120, 40, { cut: 10, smallCut: 0, groove: 3, notch: false });
    // 8 outline edges minus the two zero-length square-corner "chamfers".
    expect(g?.bevel).toHaveLength(6);
    // Inner top-right corner sits exactly 3px in from the outer one.
    expect(g?.grooveD).toContain("L117 3 L117 3");
  });
});
