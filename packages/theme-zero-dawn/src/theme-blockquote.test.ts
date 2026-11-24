import "./theme-blockquote.js";
import type { ThemeBlockquote } from "./theme-blockquote.js";

describe("theme-blockquote", () => {
  it("defaults to the info type and label", async () => {
    const el = document.createElement("theme-blockquote") as ThemeBlockquote;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("type")).toBe("info");
    expect(el.shadowRoot?.querySelector(".label")?.textContent?.trim()).toBe("Info");

    el.remove();
  });

  it("reflects the type property and renders the matching label", async () => {
    const el = document.createElement("theme-blockquote") as ThemeBlockquote;
    el.type = "danger";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("type")).toBe("danger");
    expect(el.shadowRoot?.querySelector(".label")?.textContent?.trim()).toBe("Danger");

    el.remove();
  });
});
