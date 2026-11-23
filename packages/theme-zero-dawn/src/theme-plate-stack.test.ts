import "./theme-plate-stack.js";
import type { ThemePlateStack } from "./theme-plate-stack.js";

describe("theme-plate-stack", () => {
  it("lights shards in proportion to value", async () => {
    const el = document.createElement("theme-plate-stack") as ThemePlateStack;
    el.value = 30;
    el.segments = 10;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll(".shard")).toHaveLength(10);
    expect(el.shadowRoot?.querySelectorAll(".shard.on")).toHaveLength(3);

    el.remove();
  });

  it("exposes progressbar semantics and clamps overflow", async () => {
    const el = document.createElement("theme-plate-stack") as ThemePlateStack;
    el.value = 500;
    el.segments = 4;
    el.label = "Armour";
    document.body.appendChild(el);
    await el.updateComplete;

    const bar = el.shadowRoot?.querySelector('[role="progressbar"]');
    expect(bar?.getAttribute("aria-label")).toBe("Armour");
    expect(el.shadowRoot?.querySelectorAll(".shard.on")).toHaveLength(4);

    el.remove();
  });
});
