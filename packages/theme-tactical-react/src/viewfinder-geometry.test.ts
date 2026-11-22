import { computeViewfinderFrame } from "./viewfinder-geometry.js";

describe("computeViewfinderFrame", () => {
  it("returns null when there's nothing to measure yet", () => {
    expect(computeViewfinderFrame(0, 0)).toBeNull();
    expect(computeViewfinderFrame(100, 0)).toBeNull();
    expect(computeViewfinderFrame(0, 100)).toBeNull();
  });

  it("produces a viewBox matching the measured size", () => {
    const geometry = computeViewfinderFrame(400, 240);
    expect(geometry?.viewBox).toBe("0 0 400 240");
  });

  it("produces four bracket path segments at normal sizes", () => {
    const geometry = computeViewfinderFrame(400, 240);
    // Each bracket is its own "M...L...L..." subpath; four brackets means four "M"s.
    expect(geometry?.bracketsD.match(/M/g)?.length).toBe(4);
  });

  it("degrades without crossing geometry on a very small panel", () => {
    const geometry = computeViewfinderFrame(40, 40);
    expect(geometry).not.toBeNull();
    expect(geometry?.outerD).toContain("M");
    expect(geometry?.bracketsD.match(/M/g)?.length).toBe(4);
  });

  it("drops the tab notch when there's no room for it", () => {
    const geometry = computeViewfinderFrame(18, 18);
    // With radii eating nearly the whole width, the notch (which steps to a
    // negative y to poke above the panel) should be skipped entirely rather
    // than collide with the corner arcs.
    expect(geometry?.outerD).not.toMatch(/-\d/);
  });

  it("accepts custom options", () => {
    const geometry = computeViewfinderFrame(400, 240, {
      radius: { tl: 4, tr: 4, br: 4, bl: 4 },
      bracketArm: 10,
      bracketMargin: 8,
    });
    expect(geometry).not.toBeNull();
  });
});
