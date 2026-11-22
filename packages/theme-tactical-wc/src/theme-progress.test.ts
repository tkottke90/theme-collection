import "./theme-progress.js";
import type { ThemeProgress } from "./theme-progress.js";

describe("theme-progress", () => {
  it("sets the fill width from value/max", async () => {
    const el = document.createElement("theme-progress") as ThemeProgress;
    el.value = 50;
    el.max = 100;
    document.body.appendChild(el);
    await el.updateComplete;

    const fill = el.shadowRoot?.querySelector('[role="progressbar"] > div') as HTMLElement | null;
    expect(fill?.style.width).toBe("50%");

    el.remove();
  });

  it("clamps the fill width to 100% when value exceeds max", async () => {
    const el = document.createElement("theme-progress") as ThemeProgress;
    el.value = 150;
    el.max = 100;
    document.body.appendChild(el);
    await el.updateComplete;

    const fill = el.shadowRoot?.querySelector('[role="progressbar"] > div') as HTMLElement | null;
    expect(fill?.style.width).toBe("100%");

    el.remove();
  });

  it("sets ARIA attributes on the progressbar role", async () => {
    const el = document.createElement("theme-progress") as ThemeProgress;
    el.value = 30;
    el.max = 100;
    document.body.appendChild(el);
    await el.updateComplete;

    const bar = el.shadowRoot?.querySelector('[role="progressbar"]');
    expect(bar?.getAttribute("aria-valuenow")).toBe("30");
    expect(bar?.getAttribute("aria-valuemax")).toBe("100");

    el.remove();
  });

  it("omits the label element when none is provided", async () => {
    const el = document.createElement("theme-progress") as ThemeProgress;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("p")).toBeNull();

    el.remove();
  });
});
