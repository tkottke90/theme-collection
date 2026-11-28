import { computeConduit } from "./conduit-geometry.js";

describe("computeConduit", () => {
  it("returns null when there's nothing to measure yet", () => {
    expect(computeConduit(0, 0)).toBeNull();
    expect(computeConduit(300, 0)).toBeNull();
  });

  it("produces closed outer and inner rules", () => {
    const g = computeConduit(360, 200)!;
    expect(g.viewBox).toBe("0 0 360 200");
    expect(g.outerD.trim().endsWith("Z")).toBe(true);
    expect(g.innerD.trim().endsWith("Z")).toBe(true);
  });

  it("cuts the channel between the inner rule's top and right edges", () => {
    // Far edge from (w-48, 6) to (w-6, 48); near edge from (w-24, 6) to (w-6, 24).
    expect(computeConduit(360, 200)!.channelD).toBe("M312,6 L336,6 L354,24 L354,48 Z");
  });

  it("drops the channel on a panel too small for it", () => {
    expect(computeConduit(120, 200)!.channelD).toBeNull();
    expect(computeConduit(360, 80)!.channelD).toBeNull();
  });

  it("puts screw holes at the two bottom corners", () => {
    expect(computeConduit(360, 200)!.screws).toEqual([
      { cx: 18, cy: 182 },
      { cx: 342, cy: 182 },
    ]);
  });
});
