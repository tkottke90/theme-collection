import "./theme-taped.js";
import type { ThemeTaped } from "./theme-taped.js";

describe("theme-taped", () => {
  it("defaults to a left tilt", async () => {
    const el = document.createElement("theme-taped") as ThemeTaped;
    document.body.appendChild(el);
    await el.updateComplete;

    const figure = el.shadowRoot?.querySelector("figure");
    expect(figure?.classList.contains("tilt-l")).toBe(true);

    el.remove();
  });

  it("applies the requested tilt direction", async () => {
    const el = document.createElement("theme-taped") as ThemeTaped;
    el.tilt = "r";
    document.body.appendChild(el);
    await el.updateComplete;

    const figure = el.shadowRoot?.querySelector("figure");
    expect(figure?.classList.contains("tilt-r")).toBe(true);
    expect(figure?.classList.contains("tilt-l")).toBe(false);

    el.remove();
  });

  it("renders a figcaption only when a caption is set", async () => {
    const el = document.createElement("theme-taped") as ThemeTaped;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("figcaption")).toBeNull();

    el.caption = "Lakeside Bridge";
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector("figcaption")?.textContent).toBe("Lakeside Bridge");

    el.remove();
  });
});
