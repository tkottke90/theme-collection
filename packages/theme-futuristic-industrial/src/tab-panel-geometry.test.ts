import { computeTabPanel, outlinePoints } from "./tab-panel-geometry.js";
import { signedArea } from "./path-utils.js";

describe("computeTabPanel", () => {
  it("returns null when there's nothing to measure, or no room for the shape", () => {
    expect(computeTabPanel(0, 0)).toBeNull();
    expect(computeTabPanel(320, 40)).toBeNull();
    expect(computeTabPanel(60, 200)).toBeNull();
  });

  it("produces closed outer and inner paths", () => {
    const g = computeTabPanel(360, 200)!;
    expect(g.viewBox).toBe("0 0 360 200");
    expect(g.outerD.trim().endsWith("Z")).toBe(true);
    expect(g.innerD.trim().endsWith("Z")).toBe(true);
  });

  it("uses the requested tab width when it fits", () => {
    expect(computeTabPanel(360, 200, { tabWidth: 140 })!.tabWidth).toBe(140);
  });

  it("clamps a tab too wide for the panel so the shoulder clears the chamfer", () => {
    // 360 - cut 16 - tab height 26 - 24 = 294
    expect(computeTabPanel(360, 200, { tabWidth: 1000 })!.tabWidth).toBe(294);
  });

  it("builds a clockwise outline, so the inner rule insets inward", () => {
    expect(signedArea(outlinePoints(360, 200, 120, 26, 16, 10))).toBeGreaterThan(0);
  });
});
