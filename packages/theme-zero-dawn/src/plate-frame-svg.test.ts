import { render } from "lit";
import { computePlate } from "./plate-geometry.js";
import { renderPlateFrame } from "./plate-frame-svg.js";

function frame(tone: "light" | "steel") {
  const host = document.createElement("div");
  render(renderPlateFrame(computePlate(300, 160), tone), host);
  return host;
}

describe("renderPlateFrame", () => {
  it("draws light plates clean, with a faceted bevel clipped to the plate", () => {
    const host = frame("light");
    expect(host.querySelector(".grid")).toBeNull();
    expect(host.querySelector("filter#zd-inset")).toBeNull();
    expect(host.querySelector(".bevel")?.getAttribute("clip-path")).toBe("url(#zd-clip)");
    expect(host.querySelectorAll(".facet")).toHaveLength(8);
    // Top-left-facing facets are lit, bottom-right-facing ones shaded.
    expect(host.querySelectorAll(".facet.lit")).toHaveLength(3);
    expect(host.querySelectorAll(".facet.shade")).toHaveLength(5);
  });

  it("keeps the triangle lattice and no bevel shading on steel plates", () => {
    const host = frame("steel");
    expect(host.querySelector(".grid")?.getAttribute("fill")).toBe("url(#zd-grid)");
    expect(host.querySelector(".bevel")).toBeNull();
  });
});
