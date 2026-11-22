import "./theme-viewfinder.js";
import type { ThemeViewfinder } from "./theme-viewfinder.js";

describe("theme-viewfinder", () => {
  it("renders the heading when provided", async () => {
    const el = document.createElement("theme-viewfinder") as ThemeViewfinder;
    el.heading = "Target lock";
    document.body.appendChild(el);
    await el.updateComplete;

    const heading = el.shadowRoot?.querySelector("h2");
    expect(heading?.textContent?.trim()).toBe("Target lock");

    el.remove();
  });

  it("omits the heading element when none is provided", async () => {
    const el = document.createElement("theme-viewfinder") as ThemeViewfinder;
    document.body.appendChild(el);
    await el.updateComplete;

    const heading = el.shadowRoot?.querySelector("h2");
    expect(heading).toBeNull();

    el.remove();
  });

  it("renders slotted content", async () => {
    const el = document.createElement("theme-viewfinder") as ThemeViewfinder;
    el.textContent = "Body copy";
    document.body.appendChild(el);
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector("slot");
    expect(slot).not.toBeNull();
    expect(el.textContent?.trim()).toBe("Body copy");

    el.remove();
  });
});
