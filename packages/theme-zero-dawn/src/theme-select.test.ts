import "./theme-select.js";
import type { ThemeSelect } from "./theme-select.js";

describe("theme-select", () => {
  it("renders a select element in its shadow DOM", async () => {
    const el = document.createElement("theme-select") as ThemeSelect;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("select")).not.toBeNull();

    el.remove();
  });

  it("mirrors light-DOM options into the shadow select", async () => {
    const el = document.createElement("theme-select") as ThemeSelect;
    el.innerHTML = '<option value="one">One</option><option value="two" selected>Two</option>';
    document.body.appendChild(el);
    await el.updateComplete;

    const options = el.shadowRoot?.querySelectorAll("select option") ?? [];
    expect(options).toHaveLength(2);
    expect(options[0]?.textContent?.trim()).toBe("One");
    expect(el.value).toBe("two");

    el.remove();
  });

  it("picks up options added after connection", async () => {
    const el = document.createElement("theme-select") as ThemeSelect;
    document.body.appendChild(el);
    await el.updateComplete;

    el.innerHTML = '<option value="a">A</option>';
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll("select option")).toHaveLength(1);
    expect(el.value).toBe("a");

    el.remove();
  });
});
