import "./theme-blockquote.js";
import type { ThemeBlockquote } from "./theme-blockquote.js";

describe("theme-blockquote", () => {
  it("defaults to the info type and label", async () => {
    const el = document.createElement("theme-blockquote") as ThemeBlockquote;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("type")).toBe("info");
    expect(el.shadowRoot?.querySelector(".label")?.textContent).toBe("Info");

    el.remove();
  });

  it("reflects the type property and renders the matching label", async () => {
    const el = document.createElement("theme-blockquote") as ThemeBlockquote;
    el.type = "danger";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("type")).toBe("danger");
    expect(el.shadowRoot?.querySelector(".label")?.textContent).toBe("Danger");

    el.remove();
  });

  it("renders warning and danger as tags whose colors pass on the plate", async () => {
    for (const [type, plate, fg] of [
      ["warning", "bg-caution-500", "text-neutral-900"],
      ["danger", "bg-danger-500", "text-neutral-50"],
    ] as const) {
      const el = document.createElement("theme-blockquote") as ThemeBlockquote;
      el.type = type;
      document.body.appendChild(el);
      await el.updateComplete;

      const quote = el.shadowRoot!.querySelector("blockquote")!;
      expect(quote.className).toContain(plate);
      expect(quote.className).toContain(fg);
      expect(quote.className).not.toContain("border-l-4");
      expect(quote.getAttribute("style")).toContain("--theme-link:");

      el.remove();
    }
  });

  it("keeps the tinted, left-ruled treatment for the other variants", async () => {
    const el = document.createElement("theme-blockquote") as ThemeBlockquote;
    el.type = "tip";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("blockquote")!.className).toContain("border-l-4");

    el.remove();
  });
});
