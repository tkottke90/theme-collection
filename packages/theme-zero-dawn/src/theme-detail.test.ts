import "./theme-detail.js";
import type { ThemeDetail } from "./theme-detail.js";

describe("theme-detail", () => {
  it("renders the summary text", async () => {
    const el = document.createElement("theme-detail") as ThemeDetail;
    el.summary = "Click to expand";
    document.body.appendChild(el);
    await el.updateComplete;

    const summary = el.shadowRoot?.querySelector("summary");
    expect(summary?.textContent?.trim()).toBe("Click to expand");

    el.remove();
  });
});
