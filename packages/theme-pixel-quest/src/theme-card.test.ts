import "./theme-card.js";
import type { ThemeCard } from "./theme-card.js";

describe("theme-card", () => {
  it("renders the heading when provided", async () => {
    const el = document.createElement("theme-card") as ThemeCard;
    el.heading = "Card title";
    document.body.appendChild(el);
    await el.updateComplete;

    const heading = el.shadowRoot?.querySelector("h2");
    expect(heading?.textContent?.trim()).toBe("Card title");

    el.remove();
  });

  it("omits the heading element when none is provided", async () => {
    const el = document.createElement("theme-card") as ThemeCard;
    document.body.appendChild(el);
    await el.updateComplete;

    const heading = el.shadowRoot?.querySelector("h2");
    expect(heading).toBeNull();

    el.remove();
  });

  it("renders slotted content", async () => {
    const el = document.createElement("theme-card") as ThemeCard;
    el.textContent = "Body copy";
    document.body.appendChild(el);
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector("slot");
    expect(slot).not.toBeNull();
    expect(el.textContent?.trim()).toBe("Body copy");

    el.remove();
  });
});
