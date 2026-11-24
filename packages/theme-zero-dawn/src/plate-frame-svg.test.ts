import { render } from "lit";
import { computePlate } from "./plate-geometry.js";
import { renderPlateFrame } from "./plate-frame-svg.js";

function frame(tone: "light" | "steel") {
  const host = document.createElement("div");
  render(renderPlateFrame(computePlate(300, 160), tone), host);
  return host;
}

describe("renderPlateFrame", () => {
  it("draws light plates clean, with a recessed inset panel", () => {
    const host = frame("light");
    expect(host.querySelector("#zd-grid")).toBeNull();
    expect(host.querySelector(".grid")).toBeNull();
    expect(host.querySelector("#zd-inset")).not.toBeNull();
    expect(host.querySelector(".inset")?.getAttribute("filter")).toBe("url(#zd-inset)");
  });

  it("keeps the triangle lattice and no inset on steel plates", () => {
    const host = frame("steel");
    expect(host.querySelector(".grid")?.getAttribute("fill")).toBe("url(#zd-grid)");
    expect(host.querySelector("#zd-inset")).toBeNull();
  });
});
