import "./theme-segmented-rule.js";
import type { ThemeSegmentedRule } from "./theme-segmented-rule.js";

const segments = (el: ThemeSegmentedRule) =>
  el.shadowRoot!.querySelectorAll("div > span:nth-child(2) > span").length;

describe("theme-segmented-rule", () => {
  it("is a horizontal separator with five segments by default", async () => {
    const el = document.createElement("theme-segmented-rule") as ThemeSegmentedRule;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("role")).toBe("separator");
    expect(el.getAttribute("aria-orientation")).toBe("horizontal");
    expect(segments(el)).toBe(5);

    el.remove();
  });

  it("renders the requested segment count and orientation", async () => {
    const el = document.createElement("theme-segmented-rule") as ThemeSegmentedRule;
    el.segments = 3;
    el.orientation = "vertical";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(segments(el)).toBe(3);
    expect(el.getAttribute("orientation")).toBe("vertical");
    expect(el.getAttribute("aria-orientation")).toBe("vertical");

    el.remove();
  });

  it("scales the bar thickness from size", async () => {
    const el = document.createElement("theme-segmented-rule") as ThemeSegmentedRule;
    el.size = 16;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("div")!.getAttribute("style")).toContain("height:16px");

    el.remove();
  });
});
