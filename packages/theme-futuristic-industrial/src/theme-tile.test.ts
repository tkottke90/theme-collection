import "./theme-tile.js";
import type { ThemeTile } from "./theme-tile.js";

describe("theme-tile", () => {
  it("is hatched unless plain", async () => {
    const el = document.createElement("theme-tile") as ThemeTile;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.hasAttribute("plain")).toBe(false);
    expect(el.shadowRoot!.querySelector('path[clip-path="url(#tile-body)"]')).not.toBeNull();

    el.remove();
  });

  it("drops the hatch when plain is set as an attribute", async () => {
    const el = document.createElement("theme-tile") as ThemeTile;
    el.setAttribute("plain", "");
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.plain).toBe(true);
    expect(el.shadowRoot!.querySelector('path[clip-path="url(#tile-body)"]')).toBeNull();
    expect(el.shadowRoot!.querySelector("slot")).not.toBeNull();

    el.remove();
  });
});
