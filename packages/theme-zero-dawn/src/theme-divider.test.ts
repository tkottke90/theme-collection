import "./theme-divider.js";
import type { ThemeDivider } from "./theme-divider.js";

describe("theme-divider", () => {
  it("exposes a separator role", async () => {
    const el = document.createElement("theme-divider") as ThemeDivider;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('[role="separator"]')).not.toBeNull();

    el.remove();
  });

  it("gives each band's pattern a unique id", async () => {
    const el = document.createElement("theme-divider") as ThemeDivider;
    el.variant = "trim";
    document.body.appendChild(el);
    await el.updateComplete;

    const ids = Array.from(el.shadowRoot?.querySelectorAll("pattern") ?? []).map((p) => p.id);
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
    expect(el.getAttribute("variant")).toBe("trim");

    el.remove();
  });
});
