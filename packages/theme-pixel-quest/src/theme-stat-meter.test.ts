import "./theme-stat-meter.js";
import type { ThemeStatMeter } from "./theme-stat-meter.js";

describe("theme-stat-meter", () => {
  it("renders the label, sublabel, and value/max readout", async () => {
    const el = document.createElement("theme-stat-meter") as ThemeStatMeter;
    el.label = "Energy";
    el.sublabel = "How much you can do";
    el.value = 6;
    el.max = 10;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain("Energy");
    expect(el.shadowRoot?.textContent).toContain("How much you can do");
    expect(el.shadowRoot?.textContent).toContain("6/10");

    el.remove();
  });

  it("sizes the bar fill from value and max", async () => {
    const el = document.createElement("theme-stat-meter") as ThemeStatMeter;
    el.value = 5;
    el.max = 10;
    document.body.appendChild(el);
    await el.updateComplete;

    const fill = el.shadowRoot?.querySelector<HTMLElement>(".bar-fill");
    expect(fill?.style.width).toBe("50%");

    el.remove();
  });

  it("clamps the fill width to 100% when value exceeds max", async () => {
    const el = document.createElement("theme-stat-meter") as ThemeStatMeter;
    el.value = 15;
    el.max = 10;
    document.body.appendChild(el);
    await el.updateComplete;

    const fill = el.shadowRoot?.querySelector<HTMLElement>(".bar-fill");
    expect(fill?.style.width).toBe("100%");

    el.remove();
  });

  it("exposes the bar as a labelled meter", async () => {
    const el = document.createElement("theme-stat-meter") as ThemeStatMeter;
    el.label = "Strength";
    el.value = 7;
    el.max = 10;
    document.body.appendChild(el);
    await el.updateComplete;

    const meter = el.shadowRoot?.querySelector('[role="meter"]');
    expect(meter?.getAttribute("aria-label")).toBe("Strength");
    expect(meter?.getAttribute("aria-valuenow")).toBe("7");
    expect(meter?.getAttribute("aria-valuemax")).toBe("10");
    expect(meter?.getAttribute("aria-valuetext")).toBe("7 of 10");

    el.remove();
  });
});
