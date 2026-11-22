import "./theme-journal-page.js";
import type { ThemeJournalPage } from "./theme-journal-page.js";

describe("theme-journal-page", () => {
  it("defaults to the left side", async () => {
    const el = document.createElement("theme-journal-page") as ThemeJournalPage;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("side")).toBe("left");
    const art = el.shadowRoot?.querySelector(".page-art");
    expect(art?.querySelector('rect[fill="url(#j-gutter-left)"]')).not.toBeNull();

    el.remove();
  });

  it("fans the page stack and gutter shadow the other way when side is right", async () => {
    const el = document.createElement("theme-journal-page") as ThemeJournalPage;
    el.side = "right";
    document.body.appendChild(el);
    await el.updateComplete;

    const art = el.shadowRoot?.querySelector(".page-art");
    expect(art?.querySelector('rect[fill="url(#j-gutter-right)"]')).not.toBeNull();

    el.remove();
  });

  it("renders four corner flourishes", async () => {
    const el = document.createElement("theme-journal-page") as ThemeJournalPage;
    document.body.appendChild(el);
    await el.updateComplete;

    // jsdom doesn't match a plain class selector against SVG elements'
    // `class` attribute (a real browser does) — use an attribute selector.
    expect(el.shadowRoot?.querySelectorAll("[class~='page-corner']").length).toBe(4);

    el.remove();
  });

  it("renders slotted content inside the padded .content wrapper, not on :host", async () => {
    const el = document.createElement("theme-journal-page") as ThemeJournalPage;
    el.textContent = "Page body";
    document.body.appendChild(el);
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector("slot");
    expect(slot).not.toBeNull();
    expect(slot?.parentElement?.classList.contains("content")).toBe(true);
    expect(el.textContent?.trim()).toBe("Page body");

    el.remove();
  });
});
