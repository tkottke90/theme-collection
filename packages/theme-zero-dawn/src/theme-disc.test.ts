import "./theme-disc.js";
import type { ThemeDisc } from "./theme-disc.js";

describe("theme-disc", () => {
  it("is an indeterminate progressbar with no value", async () => {
    const el = document.createElement("theme-disc") as ThemeDisc;
    document.body.appendChild(el);
    await el.updateComplete;

    const root = el.shadowRoot?.querySelector('[role="progressbar"]');
    expect(root).not.toBeNull();
    expect(root?.hasAttribute("aria-valuenow")).toBe(false);
    expect(el.shadowRoot?.querySelectorAll(".spin")).toHaveLength(2);

    el.remove();
  });

  it("is a meter with a clamped percentage when given a value", async () => {
    const el = document.createElement("theme-disc") as ThemeDisc;
    el.value = 150;
    el.max = 200;
    document.body.appendChild(el);
    await el.updateComplete;

    const root = el.shadowRoot?.querySelector('[role="meter"]');
    expect(root?.getAttribute("aria-valuenow")).toBe("150");
    expect(root?.getAttribute("aria-valuemax")).toBe("200");
    expect(el.shadowRoot?.textContent).toContain("75%");

    el.remove();
  });
});
