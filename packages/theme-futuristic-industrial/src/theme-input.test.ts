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

describe("theme-input radio grouping", () => {
  it("unchecks same-named radios when one is chosen", async () => {
    const a = document.createElement("theme-input") as ThemeInput;
    const b = document.createElement("theme-input") as ThemeInput;
    for (const el of [a, b]) {
      el.type = "radio";
      el.name = "plan";
      document.body.appendChild(el);
    }
    b.checked = true;
    await Promise.all([a.updateComplete, b.updateComplete]);

    a.shadowRoot?.querySelector("input")?.click();
    await Promise.all([a.updateComplete, b.updateComplete]);

    expect(a.checked).toBe(true);
    expect(b.checked).toBe(false);

    a.remove();
    b.remove();
  });
});
