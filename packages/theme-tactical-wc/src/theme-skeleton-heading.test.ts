import "./theme-skeleton-heading.js";
import type { ThemeSkeletonHeading } from "./theme-skeleton-heading.js";

describe("theme-skeleton-heading", () => {
  it("renders a placeholder bar", async () => {
    const el = document.createElement("theme-skeleton-heading") as ThemeSkeletonHeading;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".bar")).not.toBeNull();

    el.remove();
  });
});
