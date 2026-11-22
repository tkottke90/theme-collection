import "./theme-ribbon.js";
import type { ThemeRibbon } from "./theme-ribbon.js";

describe("theme-ribbon", () => {
  it("renders slotted content inside an h2", async () => {
    const el = document.createElement("theme-ribbon") as ThemeRibbon;
    el.textContent = "Active Quests";
    document.body.appendChild(el);
    await el.updateComplete;

    const heading = el.shadowRoot?.querySelector("h2");
    expect(heading).not.toBeNull();
    expect(el.textContent?.trim()).toBe("Active Quests");

    el.remove();
  });

  it("defaults to the red category color", async () => {
    const el = document.createElement("theme-ribbon") as ThemeRibbon;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.color).toBe("red");

    el.remove();
  });
});
