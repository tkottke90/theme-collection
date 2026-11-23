import "./theme-input.js";
import type { ThemeInput } from "./theme-input.js";

describe("theme-input", () => {
  it("defaults to a text input", async () => {
    const el = document.createElement("theme-input") as ThemeInput;
    document.body.appendChild(el);
    await el.updateComplete;

    const input = el.shadowRoot?.querySelector("input");
    expect(input?.type).toBe("text");

    el.remove();
  });

  it("reflects the type property onto the inner input", async () => {
    const el = document.createElement("theme-input") as ThemeInput;
    el.type = "email";
    document.body.appendChild(el);
    await el.updateComplete;

    const input = el.shadowRoot?.querySelector("input");
    expect(input?.type).toBe("email");

    el.remove();
  });

  it("draws an SVG mark for checkbox and radio types", async () => {
    const el = document.createElement("theme-input") as ThemeInput;
    el.type = "radio";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("input")?.type).toBe("radio");
    expect(el.shadowRoot?.querySelector("svg .mark-outer")?.getAttribute("d")).toContain("L19 10");

    el.remove();
  });
});
