import "./theme-heading.js";
import type { ThemeHeading } from "./theme-heading.js";

describe("theme-heading", () => {
  it("defaults to rendering an h1", async () => {
    const el = document.createElement("theme-heading") as ThemeHeading;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h1")).not.toBeNull();

    el.remove();
  });

  it("renders the semantic tag matching the level property", async () => {
    const el = document.createElement("theme-heading") as ThemeHeading;
    el.level = 3;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h3")).not.toBeNull();
    expect(el.shadowRoot?.querySelector("h1")).toBeNull();

    el.remove();
  });

  it("gives each level its own size", async () => {
    const sizes = new Set<string>();
    for (const level of [1, 2, 3, 4] as const) {
      const el = document.createElement("theme-heading") as ThemeHeading;
      el.level = level;
      document.body.appendChild(el);
      await el.updateComplete;
      const cls = el.shadowRoot!.querySelector(`h${level}`)!.className;
      sizes.add(cls.match(/text-(3xl|2xl|lg|sm)/)![0]);
      el.remove();
    }
    expect(sizes.size).toBe(4);
  });

  it("falls back to h1 for an unsupported level", async () => {
    const el = document.createElement("theme-heading") as ThemeHeading;
    el.level = 9 as unknown as 1;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h1")).not.toBeNull();

    el.remove();
  });
});
