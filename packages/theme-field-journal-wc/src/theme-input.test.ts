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
});
