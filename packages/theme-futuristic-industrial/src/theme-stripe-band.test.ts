import "./theme-stripe-band.js";
import type { ThemeStripeBand } from "./theme-stripe-band.js";

describe("theme-stripe-band", () => {
  it("renders a decorative svg at the configured height", async () => {
    const el = document.createElement("theme-stripe-band") as ThemeStripeBand;
    el.size = 32;
    document.body.appendChild(el);
    await el.updateComplete;

    const svgEl = el.shadowRoot!.querySelector("svg")!;
    expect(svgEl.getAttribute("aria-hidden")).toBe("true");
    expect(svgEl.getAttribute("style")).toContain("height:32px");

    el.remove();
  });
});
