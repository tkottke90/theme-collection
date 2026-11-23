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

  it("wraps the heading in a pixel-frame badge when banner is set", async () => {
    const el = document.createElement("theme-heading") as ThemeHeading;
    el.banner = true;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".pixel-frame.badge")).not.toBeNull();
    expect(el.shadowRoot?.querySelector("h1")).not.toBeNull();

    el.remove();
  });

  it("renders no frame when banner is false", async () => {
    const el = document.createElement("theme-heading") as ThemeHeading;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".pixel-frame")).toBeNull();

    el.remove();
  });
});
