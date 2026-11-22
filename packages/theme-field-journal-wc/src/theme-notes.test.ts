import "./theme-notes.js";
import type { ThemeNotes } from "./theme-notes.js";

describe("theme-notes", () => {
  it("renders the heading when provided", async () => {
    const el = document.createElement("theme-notes") as ThemeNotes;
    el.heading = "Local notes";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h4")?.textContent?.trim()).toBe("Local notes");

    el.remove();
  });

  it("omits the heading element when none is provided", async () => {
    const el = document.createElement("theme-notes") as ThemeNotes;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("h4")).toBeNull();

    el.remove();
  });

  it("renders slotted content inside the ruled paragraph", async () => {
    const el = document.createElement("theme-notes") as ThemeNotes;
    el.textContent = "The lake shimmers at dawn.";
    document.body.appendChild(el);
    await el.updateComplete;

    const slot = el.shadowRoot?.querySelector("p slot");
    expect(slot).not.toBeNull();

    el.remove();
  });
});
