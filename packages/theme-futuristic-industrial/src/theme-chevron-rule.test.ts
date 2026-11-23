import "./theme-chevron-rule.js";
import type { ThemeChevronRule } from "./theme-chevron-rule.js";

describe("theme-chevron-rule", () => {
  it("is a horizontal separator pointing right by default", async () => {
    const el = document.createElement("theme-chevron-rule") as ThemeChevronRule;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("role")).toBe("separator");
    expect(el.getAttribute("direction")).toBe("right");
    expect(el.getAttribute("aria-orientation")).toBe("horizontal");

    el.remove();
  });

  it("reports a vertical orientation when pointing down", async () => {
    const el = document.createElement("theme-chevron-rule") as ThemeChevronRule;
    el.direction = "down";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("aria-orientation")).toBe("vertical");

    el.remove();
  });
});
