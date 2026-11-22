import "./theme-skeleton-text.js";
import type { ThemeSkeletonText } from "./theme-skeleton-text.js";

describe("theme-skeleton-text", () => {
  it("renders a placeholder bar", async () => {
    const el = document.createElement("theme-skeleton-text") as ThemeSkeletonText;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".bar")).not.toBeNull();

    el.remove();
  });
});
