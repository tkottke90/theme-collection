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

  it("stacks the ornament under the text in a centred column for levels 1-2", async () => {
    const el = document.createElement("theme-heading") as ThemeHeading;
    el.level = 2;
    document.body.appendChild(el);
    await el.updateComplete;

    const ornament = el.shadowRoot?.querySelector(".ornament");
    const column = ornament?.parentElement;
    expect(column?.classList.contains("items-center")).toBe(true);
    expect(column?.querySelector(".text slot")).not.toBeNull();

    el.level = 3;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".ornament")).toBeNull();

    el.remove();
  });
});
