import "./theme-textarea.js";
import type { ThemeTextarea } from "./theme-textarea.js";

describe("theme-textarea", () => {
  it("renders a textarea with the configured rows", async () => {
    const el = document.createElement("theme-textarea") as ThemeTextarea;
    el.rows = 6;
    document.body.appendChild(el);
    await el.updateComplete;

    const textarea = el.shadowRoot?.querySelector("textarea");
    expect(textarea?.rows).toBe(6);

    el.remove();
  });
});
