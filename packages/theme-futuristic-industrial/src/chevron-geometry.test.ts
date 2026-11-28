import { chevronsAlong, computeChevrons } from "./chevron-geometry.js";

describe("chevronsAlong", () => {
  it("fits whole chevrons only, centred in the length", () => {
    const shapes = chevronsAlong(200, 20);
    const first = shapes[0]!;
    const last = shapes.at(-1)!;
    const leftGap = first[0]![0];
    const rightGap = 200 - last[2]![0]; // the last chevron's tip
    expect(leftGap).toBeCloseTo(rightGap, 6);
    expect(leftGap).toBeGreaterThanOrEqual(0);
  });

  it("returns nothing when the length can't hold one chevron", () => {
    expect(chevronsAlong(5, 20)).toEqual([]);
  });

  it("adds chevrons as the rule gets longer", () => {
    expect(chevronsAlong(400, 20).length).toBeGreaterThan(chevronsAlong(200, 20).length);
  });
});

describe("computeChevrons", () => {
  it("returns null when there's nothing to measure yet", () => {
    expect(computeChevrons(0, 20)).toBeNull();
  });

  it("points right by default and left when mirrored", () => {
    const right = computeChevrons(200, 20, "right")!;
    const left = computeChevrons(200, 20, "left")!;
    expect(right.count).toBe(left.count);
    // The first chevron's tip: right of its base when pointing right, left when pointing left.
    const tipX = (d: string) => Number(d.split(" L")[2]!.split(",")[0]);
    const baseX = (d: string) => Number(d.slice(1).split(",")[0]);
    expect(tipX(right.d)).toBeGreaterThan(baseX(right.d));
    expect(tipX(left.d)).toBeLessThan(baseX(left.d));
  });

  it("runs along the height when pointing down", () => {
    const down = computeChevrons(20, 200, "down")!;
    expect(down.count).toBe(computeChevrons(200, 20, "right")!.count);
  });
});
