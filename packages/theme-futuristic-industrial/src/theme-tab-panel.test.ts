import "./theme-tab-panel.js";
import type { ThemeTabPanel } from "./theme-tab-panel.js";

describe("theme-tab-panel", () => {
  it("renders the heading in the tab", async () => {
    const el = document.createElement("theme-tab-panel") as ThemeTabPanel;
    el.heading = "Sector map";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h2.tab-label")?.textContent?.trim()).toBe("Sector map");

    el.remove();
  });

  it("omits the heading element when none is provided", async () => {
    const el = document.createElement("theme-tab-panel") as ThemeTabPanel;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h2")).toBeNull();
    expect(el.shadowRoot?.querySelector("slot")).not.toBeNull();

    el.remove();
  });
});
