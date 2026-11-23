import "./theme-divider.js";
import type { ThemeDivider } from "./theme-divider.js";

describe("theme-divider", () => {
  it("renders a single decorative, hidden svg", async () => {
    const el = document.createElement("theme-divider") as ThemeDivider;
    document.body.appendChild(el);
    await el.updateComplete;

    const svg = el.shadowRoot?.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("aria-hidden")).toBe("true");

    el.remove();
  });
});
