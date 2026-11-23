import "./theme-item.js";
import type { ThemeItem } from "./theme-item.js";

describe("theme-item", () => {
  it("defaults to rendering a li", async () => {
    const el = document.createElement("theme-item") as ThemeItem;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("li")).not.toBeNull();

    el.remove();
  });

  it("renders a div when as is set to div", async () => {
    const el = document.createElement("theme-item") as ThemeItem;
    el.as = "div";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("div")).not.toBeNull();
    expect(el.shadowRoot?.querySelector("li")).toBeNull();

    el.remove();
  });
});
