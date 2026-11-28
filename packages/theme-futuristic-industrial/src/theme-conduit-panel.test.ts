import "./theme-conduit-panel.js";
import type { ThemeConduitPanel } from "./theme-conduit-panel.js";

describe("theme-conduit-panel", () => {
  it("renders the heading when provided", async () => {
    const el = document.createElement("theme-conduit-panel") as ThemeConduitPanel;
    el.heading = "Lift controls";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h2")?.textContent?.trim()).toBe("Lift controls");

    el.remove();
  });

  it("renders the frame and a slot, with no heading element by default", async () => {
    const el = document.createElement("theme-conduit-panel") as ThemeConduitPanel;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("svg pattern#conduit-hazard")).not.toBeNull();
    expect(el.shadowRoot?.querySelector("slot")).not.toBeNull();
    expect(el.shadowRoot?.querySelector("h2")).toBeNull();

    el.remove();
  });
});
