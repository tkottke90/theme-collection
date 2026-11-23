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

    // The pixel-frame wrapper is always a <div> (it's decorative chrome,
    // not the content tag), so check the content element itself rather
    // than asserting no <div> exists anywhere in the shadow root.
    const content = el.shadowRoot?.querySelector("ol");
    expect(content).not.toBeNull();
    expect(content?.tagName).toBe("OL");

    el.remove();
  });
});
