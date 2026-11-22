import "./theme-progress.js";
import type { ThemeProgress } from "./theme-progress.js";

describe("theme-progress", () => {
  it("sets the progressbar ARIA attributes from value/max", async () => {
    const el = document.createElement("theme-progress") as ThemeProgress;
    el.value = 42;
    el.max = 100;
    document.body.appendChild(el);
    await el.updateComplete;

    const bar = el.shadowRoot?.querySelector('[role="progressbar"]');
    expect(bar?.getAttribute("aria-valuenow")).toBe("42");
    expect(bar?.getAttribute("aria-valuemax")).toBe("100");

    el.remove();
  });

  it("clamps the fill width to 100% when value exceeds max", async () => {
    const el = document.createElement("theme-progress") as ThemeProgress;
    el.value = 150;
    el.max = 100;
    document.body.appendChild(el);
    await el.updateComplete;

    const fill = el.shadowRoot?.querySelector(".fill") as HTMLElement;
    expect(fill.style.width).toBe("100%");

    el.remove();
  });

  it("omits the label span when no label is set", async () => {
    const el = document.createElement("theme-progress") as ThemeProgress;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.textContent?.trim()).not.toBe("");
    el.label = "Overall progress";
    await el.updateComplete;
    expect(el.shadowRoot?.textContent).toContain("Overall progress");

    el.remove();
  });
});
