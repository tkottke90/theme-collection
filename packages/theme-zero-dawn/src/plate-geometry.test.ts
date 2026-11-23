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
});
