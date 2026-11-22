import "./theme-gauge.js";
import type { ThemeGauge } from "./theme-gauge.js";

describe("theme-gauge", () => {
  it("renders the rounded value in the center label", async () => {
    const el = document.createElement("theme-gauge") as ThemeGauge;
    el.value = 72.4;
    document.body.appendChild(el);
    await el.updateComplete;

    const span = el.shadowRoot?.querySelector("span");
    expect(span?.textContent?.trim()).toBe("72");

    el.remove();
  });

  it("sets the dashoffset on the value arc relative to value/max", async () => {
    const el = document.createElement("theme-gauge") as ThemeGauge;
    el.value = 100;
    el.max = 100;
    document.body.appendChild(el);
    await el.updateComplete;

    const circles = el.shadowRoot?.querySelectorAll("circle");
    const valueArc = circles?.[1];
    expect(valueArc?.getAttribute("stroke-dashoffset")).toBe("0");

    el.remove();
  });

  it("sets meter ARIA attributes", async () => {
    const el = document.createElement("theme-gauge") as ThemeGauge;
    el.value = 40;
    el.label = "Power";
    document.body.appendChild(el);
    await el.updateComplete;

    const meter = el.shadowRoot?.querySelector('[role="meter"]');
    expect(meter?.getAttribute("aria-valuenow")).toBe("40");
    expect(meter?.getAttribute("aria-label")).toBe("Power");

    el.remove();
  });
});
