import { clockwise, closed, inset, roundedRect, signedArea } from "./path-utils.js";

describe("path-utils", () => {
  it("insets a clockwise square evenly", () => {
    const square = [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
    ] as const;
    expect(inset([...square], 2)).toEqual([
      [2, 2],
      [8, 2],
      [8, 8],
      [2, 8],
    ]);
  });

  it("detects winding and reorders counter-clockwise points", () => {
    const ccw = [
      [0, 0],
      [0, 10],
      [10, 10],
      [10, 0],
    ] as const;
    expect(signedArea([...ccw])).toBeLessThan(0);
    expect(signedArea(clockwise([...ccw]))).toBeGreaterThan(0);
  });

  it("formats a closed path", () => {
    expect(
      closed([
        [0, 0],
        [1.234, 5],
      ]),
    ).toBe("M0,0 L1.23,5 Z");
  });

  it("clamps the rounded-rect radius to the box", () => {
    const d = roundedRect(0, 0, 10, 4, 50);
    expect(d).toContain("A2,2");
    expect(d.trim().endsWith("Z")).toBe(true);
  });
});
