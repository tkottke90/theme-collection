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
    // Each bracket is its own "M...L...L" subpath; four brackets means four "M"s.
    expect(geometry?.bracketsD.match(/M/g)?.length).toBe(4);
  });

  it("produces a closed outer path and a closed inner path", () => {
    const geometry = computeViewfinderFrame(400, 240);
    expect(geometry?.outerD.trim().endsWith("Z")).toBe(true);
    expect(geometry?.innerD.trim().endsWith("Z")).toBe(true);
  });

  it("degrades without throwing on a very small panel", () => {
    const geometry = computeViewfinderFrame(40, 40);
    expect(geometry).not.toBeNull();
    expect(geometry?.outerD).toContain("M");
    expect(geometry?.bracketsD.match(/M/g)?.length).toBe(4);
  });

  it("clamps the inner rect to non-negative size on a tiny panel", () => {
    // di = step + 7 = 13 by default, so anything under ~26px in either
    // dimension would otherwise go negative.
    const geometry = computeViewfinderFrame(20, 20);
    expect(geometry).not.toBeNull();
    expect(geometry?.innerD).not.toMatch(/-\d/);
  });

  it("accepts custom options", () => {
    const geometry = computeViewfinderFrame(400, 240, {
      radius: 4,
      step: 4,
      bracketInset: 12,
    });
    expect(geometry).not.toBeNull();
  });
});
