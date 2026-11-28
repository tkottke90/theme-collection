import "./theme-bracket-tag.js";
import { flaredRules, type ThemeBracketTag } from "./theme-bracket-tag.js";

describe("flaredRules", () => {
  it("returns null when there's nothing to measure, or no room for the flares", () => {
    expect(flaredRules(0, 30)).toBeNull();
    expect(flaredRules(12, 30)).toBeNull();
  });

  it("draws a top and a bottom rule, each flaring out at both ends", () => {
    const g = flaredRules(120, 32)!;
    expect(g.viewBox).toBe("0 0 120 32");
    expect(g.d).toBe("M0,1 L8,9 L112,9 L120,1 M0,31 L8,23 L112,23 L120,31");
  });
});

describe("theme-bracket-tag", () => {
  it("defaults to square brackets around the slotted text", async () => {
    const el = document.createElement("theme-bracket-tag") as ThemeBracketTag;
    el.textContent = "MT-22467R";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("variant")).toBe("square");
    expect(el.shadowRoot!.querySelectorAll('[aria-hidden="true"]').length).toBe(2);
    expect(el.shadowRoot!.querySelector("svg")).toBeNull();

    el.remove();
  });

  it("draws the flared frame as an svg overlay", async () => {
    const el = document.createElement("theme-bracket-tag") as ThemeBracketTag;
    el.variant = "flared";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("svg")).not.toBeNull();

    el.remove();
  });
});
