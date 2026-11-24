import "./theme-glyph.js";
import type { ThemeGlyph } from "./theme-glyph.js";
import { GLYPHS } from "./glyphs.js";

describe("theme-glyph", () => {
  it("renders the named glyph's strokes over a backing shape", async () => {
    const el = document.createElement("theme-glyph") as ThemeGlyph;
    el.name = "eye";
    document.body.appendChild(el);
    await el.updateComplete;

    const paths = Array.from(el.shadowRoot?.querySelectorAll("path") ?? []);
    expect(el.shadowRoot?.querySelector(".backing")).not.toBeNull();
    expect(paths.some((p) => p.getAttribute("d") === GLYPHS.eye)).toBe(true);

    el.remove();
  });

  it("omits the backing for shape=none", async () => {
    const el = document.createElement("theme-glyph") as ThemeGlyph;
    el.shape = "none";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".backing")).toBeNull();

    el.remove();
  });

  it("is decorative without a label and an image with one", async () => {
    const el = document.createElement("theme-glyph") as ThemeGlyph;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");

    el.label = "Hunters";
    await el.updateComplete;
    const svgEl = el.shadowRoot?.querySelector("svg");
    expect(svgEl?.getAttribute("role")).toBe("img");
    expect(svgEl?.getAttribute("aria-label")).toBe("Hunters");

    el.remove();
  });
});
