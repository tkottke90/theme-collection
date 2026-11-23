import { computePlateFrame } from "./plate-geometry.js";

describe("computePlateFrame", () => {
  it("returns null when there's nothing to measure yet", () => {
    expect(computePlateFrame(0, 0)).toBeNull();
    expect(computePlateFrame(100, 0)).toBeNull();
    expect(computePlateFrame(0, 100)).toBeNull();
  });

  it("produces a viewBox matching the measured size", () => {
    const geometry = computePlateFrame(300, 160);
    expect(geometry?.viewBox).toBe("0 0 300 160");
  });

  it("produces a closed outer path and a closed inner path", () => {
    const geometry = computePlateFrame(300, 160);
    expect(geometry?.outerD.trim().endsWith("Z")).toBe(true);
    expect(geometry?.innerD.trim().endsWith("Z")).toBe(true);
  });

  it("draws a rivet at each square (non-chamfered) corner by default", () => {
    // Default cutCorners = ["tl", "br"], so "tr" and "bl" stay square.
    const geometry = computePlateFrame(300, 160);
    expect(geometry?.rivets).toHaveLength(2);
  });

  it("omits rivets when rivets: false", () => {
    const geometry = computePlateFrame(300, 160, { rivets: false });
    expect(geometry?.rivets).toHaveLength(0);
  });

  it("draws no rivets when every corner is chamfered", () => {
    const geometry = computePlateFrame(300, 160, { cutCorners: ["tl", "tr", "br", "bl"] });
    expect(geometry?.rivets).toHaveLength(0);
  });

  it("draws a hazard-stripe band along the first chamfered corner by default", () => {
    const geometry = computePlateFrame(300, 160);
    expect(geometry?.stripeD).not.toBeNull();
    expect(geometry?.stripeD?.trim().endsWith("Z")).toBe(true);
  });

  it("omits the stripe when stripeCorner is null", () => {
    const geometry = computePlateFrame(300, 160, { stripeCorner: null });
    expect(geometry?.stripeD).toBeNull();
  });

  it("omits the stripe when cutCorners is empty", () => {
    const geometry = computePlateFrame(300, 160, { cutCorners: [] });
    expect(geometry?.stripeD).toBeNull();
    expect(geometry?.rivets).toHaveLength(4);
  });

  it("degrades without throwing on a very small panel", () => {
    const geometry = computePlateFrame(30, 30);
    expect(geometry).not.toBeNull();
    expect(geometry?.outerD).toContain("M");
  });

  it("accepts custom options", () => {
    const geometry = computePlateFrame(300, 160, {
      cut: 10,
      cutCorners: ["tr", "bl"],
      stripeCorner: "bl",
      stripeWidth: 6,
      rivetMargin: 10,
      rivetRadius: 2,
    });
    expect(geometry).not.toBeNull();
    expect(geometry?.rivets).toHaveLength(2);
    expect(geometry?.stripeD).not.toBeNull();
  });
});
