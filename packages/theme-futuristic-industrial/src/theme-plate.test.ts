import "./theme-plate.js";
import type { ThemePlate } from "./theme-plate.js";

describe("theme-plate", () => {
  it("renders the label and value", async () => {
    const el = document.createElement("theme-plate") as ThemePlate;
    el.label = "Code";
    el.value = "13-V-2-44";
    document.body.appendChild(el);
    await el.updateComplete;

    const label = el.shadowRoot?.querySelector("p");
    expect(label?.textContent?.trim()).toBe("Code");
    expect(el.shadowRoot?.textContent).toContain("13-V-2-44");

    el.remove();
  });

  it("renders an empty value without throwing", async () => {
    const el = document.createElement("theme-plate") as ThemePlate;
    el.label = "Mod";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Mod");

    el.remove();
  });
});
