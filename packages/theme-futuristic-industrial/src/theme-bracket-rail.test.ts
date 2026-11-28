import "./theme-bracket-rail.js";
import type { ThemeBracketRail } from "./theme-bracket-rail.js";

describe("theme-bracket-rail", () => {
  it("renders a decorative rail and slots its content", async () => {
    const el = document.createElement("theme-bracket-rail") as ThemeBracketRail;
    el.textContent = "Deck 3";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
    expect(el.shadowRoot!.querySelector("slot")).not.toBeNull();

    el.remove();
  });
});
