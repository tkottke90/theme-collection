import "./theme-counter.js";
import type { ThemeCounter } from "./theme-counter.js";

describe("theme-counter", () => {
  it("renders the configured value", async () => {
    const el = document.createElement("theme-counter") as ThemeCounter;
    el.value = "9";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".counter")?.textContent?.trim()).toBe("9");

    el.remove();
  });

  it("falls back to the value for its label when none is given", async () => {
    const el = document.createElement("theme-counter") as ThemeCounter;
    el.value = "9";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".counter")?.getAttribute("aria-label")).toBe("9");

    el.remove();
  });
});
