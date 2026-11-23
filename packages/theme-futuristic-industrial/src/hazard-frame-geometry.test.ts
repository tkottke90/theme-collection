import { computeHazardFrame } from "./hazard-frame-geometry.js";

const subpaths = (d: string) => d.match(/M/g)?.length ?? 0;

describe("computeHazardFrame", () => {
  it("returns null when there's nothing to measure yet", () => {
    expect(computeHazardFrame(0, 0)).toBeNull();
    expect(computeHazardFrame(300, 0)).toBeNull();
    expect(computeHazardFrame(0, 200)).toBeNull();
  });

  it("returns null when the band would leave no content window", () => {
    // Default thickness is 18, so anything 36px or under has no window.
    expect(computeHazardFrame(36, 200)).toBeNull();
    expect(computeHazardFrame(200, 30)).toBeNull();
  });

  it("produces a viewBox matching the measured size", () => {
    expect(computeHazardFrame(320, 180)?.viewBox).toBe("0 0 320 180");
  });

  it("builds the band and the stripe region as two closed subpaths each", () => {
    const geometry = computeHazardFrame(320, 180);
    expect(subpaths(geometry!.bandD)).toBe(2);
    expect(subpaths(geometry!.stripeD)).toBe(2);
    expect(geometry!.innerD.trim().endsWith("Z")).toBe(true);
  });

  it("keeps the source bar's stripe proportions at the default thickness", () => {
    // 18px band: pitch 78 × 18/67, stripe 40 × 18/67.
    const geometry = computeHazardFrame(320, 180);
    expect(geometry?.pitch).toBeCloseTo(20.96, 1);
    expect(geometry?.stripeWidth).toBeCloseTo(10.75, 1);
  });

  it("scales the stripe pattern with the thickness", () => {
    const thin = computeHazardFrame(320, 180, { thickness: 12 })!;
    const thick = computeHazardFrame(320, 180, { thickness: 24 })!;
    expect(thick.pitch).toBeCloseTo(thin.pitch * 2, 1);
    expect(thick.stripeWidth).toBeCloseTo(thin.stripeWidth * 2, 1);
  });

  it("chamfers the top-right and bottom-left corners by default", () => {
    // Outer outline, first subpath of bandD: square TL, cut TR, square BR, cut BL = 6 points.
    const outer = computeHazardFrame(320, 180)!.bandD.split("Z")[0]!;
    expect(outer.split("L")).toHaveLength(6);
  });

  it("accepts custom options", () => {
    const geometry = computeHazardFrame(320, 180, {
      thickness: 14,
      cut: 20,
      cutCorners: ["tl", "tr", "br", "bl"],
    });
    const outer = geometry!.bandD.split("Z")[0]!;
    expect(outer.split("L")).toHaveLength(8);
  });
});
