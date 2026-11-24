import { render } from "lit";
import { computePlate } from "./plate-geometry.js";
import { renderPlateFrame } from "./plate-frame-svg.js";

function frame(tone: "light" | "steel") {
  const host = document.createElement("div");
  render(renderPlateFrame(computePlate(300, 160), tone), host);
  return host;
}

describe("renderPlateFrame", () => {
  it.each(["light", "steel"] as const)(
    "draws %s plates clean, with a faceted bevel clipped to the plate",
    (tone) => {
      const host = frame(tone);
      expect(host.querySelector("pattern")).toBeNull();
      expect(host.querySelector(".bevel")?.getAttribute("clip-path")).toBe("url(#zd-clip)");
      expect(host.querySelectorAll(".facet")).toHaveLength(8);
      // Top-left-facing facets are lit, bottom-right-facing ones shaded.
      expect(host.querySelectorAll(".facet.lit")).toHaveLength(3);
      expect(host.querySelectorAll(".facet.shade")).toHaveLength(5);
    },
  );

  it("gives the two tones different faces", () => {
    const stops = (tone: "light" | "steel") =>
      Array.from(frame(tone).querySelectorAll("#zd-fill stop")).map((s) => s.getAttribute("style"));
    expect(stops("light")).not.toEqual(stops("steel"));
  });
});
