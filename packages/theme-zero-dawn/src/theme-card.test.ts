import "./theme-card.js";
import type { ThemeCard } from "./theme-card.js";

describe("theme-card", () => {
  it("renders the heading when provided", async () => {
    const el = document.createElement("theme-card") as ThemeCard;
    el.heading = "Field notes";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h2")?.textContent?.trim()).toBe("Field notes");

    el.remove();
  });

  it("omits the heading element when none is provided", async () => {
    const el = document.createElement("theme-card") as ThemeCard;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h2")).toBeNull();

    el.remove();
  });

  it("renders the plate frame overlay and a slot", async () => {
    const el = document.createElement("theme-card") as ThemeCard;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('svg[part="frame"]')).not.toBeNull();
    expect(el.shadowRoot?.querySelector("slot")).not.toBeNull();

    el.remove();
  });
});
