import "./theme-slots.js";
import type { ThemeSlots } from "./theme-slots.js";

describe("theme-slots", () => {
  it("renders `total` slots", async () => {
    const el = document.createElement("theme-slots") as ThemeSlots;
    el.total = 6;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll(".slots i").length).toBe(6);

    el.remove();
  });

  it("lights the leading `on` slots and the following `hot` slots", async () => {
    const el = document.createElement("theme-slots") as ThemeSlots;
    el.total = 6;
    el.on = 2;
    el.hot = 1;
    document.body.appendChild(el);
    await el.updateComplete;

    const slots = Array.from(el.shadowRoot?.querySelectorAll(".slots i") ?? []);
    expect(slots.map((s) => s.className)).toEqual(["on", "on", "hot", "", "", ""]);

    el.remove();
  });
});
