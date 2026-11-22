import "./theme-stat.js";
import type { ThemeStat } from "./theme-stat.js";

describe("theme-stat", () => {
  it("renders the label and value", async () => {
    const el = document.createElement("theme-stat") as ThemeStat;
    el.label = "System Status";
    el.value = "1565";
    document.body.appendChild(el);
    await el.updateComplete;

    const label = el.shadowRoot?.querySelector("p");
    expect(label?.textContent?.trim()).toBe("System Status");
    expect(el.shadowRoot?.textContent).toContain("1565");

    el.remove();
  });

  it("renders the unit when provided", async () => {
    const el = document.createElement("theme-stat") as ThemeStat;
    el.value = "128";
    el.unit = "ft";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("ft");

    el.remove();
  });

  it("omits the unit span when none is provided", async () => {
    const el = document.createElement("theme-stat") as ThemeStat;
    el.value = "128";
    document.body.appendChild(el);
    await el.updateComplete;

    const spans = el.shadowRoot?.querySelectorAll("span");
    expect(spans?.length ?? 0).toBe(0);

    el.remove();
  });
});
