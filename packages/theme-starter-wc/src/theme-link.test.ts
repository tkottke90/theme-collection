import "./theme-link.js";
import type { ThemeLink } from "./theme-link.js";

describe("theme-link", () => {
  it("reflects the href property onto the inner anchor", async () => {
    const el = document.createElement("theme-link") as ThemeLink;
    el.href = "https://example.com";
    document.body.appendChild(el);
    await el.updateComplete;

    const anchor = el.shadowRoot?.querySelector("a");
    expect(anchor?.getAttribute("href")).toBe("https://example.com");

    el.remove();
  });
});
