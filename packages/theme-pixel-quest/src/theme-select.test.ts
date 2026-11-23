import "./theme-select.js";
import type { ThemeSelect } from "./theme-select.js";

describe("theme-select", () => {
  it("renders a select element in its shadow DOM", async () => {
    const el = document.createElement("theme-select") as ThemeSelect;
    document.body.appendChild(el);
    await el.updateComplete;

    const select = el.shadowRoot?.querySelector("select");
    expect(select).not.toBeNull();

    el.remove();
  });

  it("projects slotted options as light-DOM children", async () => {
    const el = document.createElement("theme-select") as ThemeSelect;
    el.innerHTML = '<option value="one">One</option>';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.querySelector("option")?.textContent).toBe("One");

    el.remove();
  });
});
