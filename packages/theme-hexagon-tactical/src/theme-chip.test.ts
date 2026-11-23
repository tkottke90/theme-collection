import "./theme-chip.js";
import type { ThemeChip } from "./theme-chip.js";

describe("theme-chip", () => {
  it("defaults to the default variant", async () => {
    const el = document.createElement("theme-chip") as ThemeChip;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("variant")).toBe("default");
    expect(el.shadowRoot?.querySelector(".chip")).not.toBeNull();

    el.remove();
  });

  it("reflects the variant property as a host attribute", async () => {
    const el = document.createElement("theme-chip") as ThemeChip;
    el.variant = "blue";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("variant")).toBe("blue");
    expect(el.shadowRoot?.querySelector(".chip.blue")).not.toBeNull();

    el.remove();
  });

  it("applies the charge level as a CSS custom property on the charge variant", async () => {
    const el = document.createElement("theme-chip") as ThemeChip;
    el.variant = "charge";
    el.charge = 0.6;
    document.body.appendChild(el);
    await el.updateComplete;

    const chip = el.shadowRoot?.querySelector(".chip") as HTMLElement | null;
    expect(chip?.style.getPropertyValue("--charge")).toBe("0.6");

    el.remove();
  });

  it("renders a direction nub when requested", async () => {
    const el = document.createElement("theme-chip") as ThemeChip;
    el.nub = true;
    el.rotation = 120;
    document.body.appendChild(el);
    await el.updateComplete;

    const nub = el.shadowRoot?.querySelector(".nub") as HTMLElement | null;
    expect(nub).not.toBeNull();
    expect(nub?.style.getPropertyValue("--dir")).toBe("120deg");

    el.remove();
  });
});
