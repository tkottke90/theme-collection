import "./theme-girder.js";
import type { ThemeGirder } from "./theme-girder.js";

describe("theme-girder", () => {
  it("renders a decorative svg hidden from assistive tech", async () => {
    const el = document.createElement("theme-girder") as ThemeGirder;
    document.body.appendChild(el);
    await el.updateComplete;

    const svgEl = el.shadowRoot?.querySelector("svg");
    expect(svgEl).not.toBeNull();
    expect(svgEl?.getAttribute("aria-hidden")).toBe("true");

    el.remove();
  });
});
