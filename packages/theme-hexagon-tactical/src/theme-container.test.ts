import "./theme-container.js";
import type { ThemeContainer } from "./theme-container.js";

describe("theme-container", () => {
  it("defaults to rendering a div", async () => {
    const el = document.createElement("theme-container") as ThemeContainer;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("div")).not.toBeNull();

    el.remove();
  });

  it("renders the semantic tag matching the as property", async () => {
    const el = document.createElement("theme-container") as ThemeContainer;
    el.as = "ol";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("ol")).not.toBeNull();
    expect(el.shadowRoot?.querySelector("div")).toBeNull();

    el.remove();
  });
});
