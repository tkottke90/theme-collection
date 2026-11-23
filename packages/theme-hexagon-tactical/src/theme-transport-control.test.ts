import "./theme-transport-control.js";
import type { ThemeTransportControl } from "./theme-transport-control.js";

describe("theme-transport-control", () => {
  it("defaults to unpressed", async () => {
    const el = document.createElement("theme-transport-control") as ThemeTransportControl;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("button")?.getAttribute("aria-pressed")).toBe("false");

    el.remove();
  });

  it("reflects the pressed property", async () => {
    const el = document.createElement("theme-transport-control") as ThemeTransportControl;
    el.pressed = true;
    el.label = "Play";
    document.body.appendChild(el);
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.getAttribute("aria-pressed")).toBe("true");
    expect(button?.getAttribute("aria-label")).toBe("Play");

    el.remove();
  });
});
