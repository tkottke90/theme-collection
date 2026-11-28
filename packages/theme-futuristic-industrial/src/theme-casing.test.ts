import "./theme-casing.js";
import type { ThemeCasing } from "./theme-casing.js";

describe("theme-casing", () => {
  it("renders the heading when provided", async () => {
    const el = document.createElement("theme-casing") as ThemeCasing;
    el.heading = "Reactor control";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h2")?.textContent?.trim()).toBe("Reactor control");

    el.remove();
  });

  it("omits the heading element when none is provided", async () => {
    const el = document.createElement("theme-casing") as ThemeCasing;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h2")).toBeNull();

    el.remove();
  });

  it("renders the frame overlay and a slot for content", async () => {
    const el = document.createElement("theme-casing") as ThemeCasing;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("svg pattern#casing-hazard")).not.toBeNull();
    expect(el.shadowRoot?.querySelector("slot")).not.toBeNull();

    el.remove();
  });
});
