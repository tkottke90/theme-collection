import "./theme-tile.js";
import type { ThemeTile } from "./theme-tile.js";

describe("theme-tile", () => {
  it("is hatched by default", async () => {
    const el = document.createElement("theme-tile") as ThemeTile;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.hasAttribute("hatched")).toBe(true);
    expect(el.shadowRoot!.querySelector('path[clip-path="url(#tile-body)"]')).not.toBeNull();

    el.remove();
  });

  it("drops the hatch when hatched is false", async () => {
    const el = document.createElement("theme-tile") as ThemeTile;
    el.hatched = false;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.hasAttribute("hatched")).toBe(false);
    expect(el.shadowRoot!.querySelector('path[clip-path="url(#tile-body)"]')).toBeNull();
    expect(el.shadowRoot!.querySelector("slot")).not.toBeNull();

    el.remove();
  });
});
