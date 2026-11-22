import "./theme-text.js";
import type { ThemeText } from "./theme-text.js";

describe("theme-text", () => {
  it("defaults to rendering a paragraph", async () => {
    const el = document.createElement("theme-text") as ThemeText;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("p")).not.toBeNull();

    el.remove();
  });

  it("renders a small element for the caption variant", async () => {
    const el = document.createElement("theme-text") as ThemeText;
    el.variant = "caption";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("small")).not.toBeNull();
    expect(el.shadowRoot?.querySelector("p")).toBeNull();

    el.remove();
  });
});
