import "./theme-page-frame.js";
import type { ThemePageFrame } from "./theme-page-frame.js";

describe("theme-page-frame", () => {
  it("renders slotted content inside the frame", async () => {
    const el = document.createElement("theme-page-frame") as ThemePageFrame;
    el.innerHTML = "<p>Page content</p>";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.querySelector("p")?.textContent).toBe("Page content");

    el.remove();
  });

  it("renders the bordered frame around the slotted content", async () => {
    const el = document.createElement("theme-page-frame") as ThemePageFrame;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".frame-border")).not.toBeNull();
    expect(el.shadowRoot?.querySelector(".frame-pinstripe")).not.toBeNull();
    expect(el.shadowRoot?.querySelector(".frame-fill")).not.toBeNull();

    el.remove();
  });
});
