import "./theme-toolbar-button.js";
import type { ThemeToolbarButton } from "./theme-toolbar-button.js";

describe("theme-toolbar-button", () => {
  it("defaults to the graphite material", async () => {
    const el = document.createElement("theme-toolbar-button") as ThemeToolbarButton;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("material")).toBe("graphite");

    el.remove();
  });

  it("sets aria-label on the inner button", async () => {
    const el = document.createElement("theme-toolbar-button") as ThemeToolbarButton;
    el.label = "Upload";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("button")?.getAttribute("aria-label")).toBe("Upload");

    el.remove();
  });

  it("reflects aria-pressed only for the toggle material", async () => {
    const toggle = document.createElement("theme-toolbar-button") as ThemeToolbarButton;
    toggle.material = "toggle";
    toggle.pressed = true;
    document.body.appendChild(toggle);
    await toggle.updateComplete;
    expect(toggle.shadowRoot?.querySelector("button")?.getAttribute("aria-pressed")).toBe("true");
    toggle.remove();

    const graphite = document.createElement("theme-toolbar-button") as ThemeToolbarButton;
    document.body.appendChild(graphite);
    await graphite.updateComplete;
    expect(graphite.shadowRoot?.querySelector("button")?.hasAttribute("aria-pressed")).toBe(false);
    graphite.remove();
  });
});
