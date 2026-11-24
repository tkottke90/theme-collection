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

describe("theme-plate-stack variants", () => {
  async function make(variant: string, value: number, segments = 10) {
    const el = document.createElement("theme-plate-stack") as ThemePlateStack;
    el.setAttribute("variant", variant);
    el.value = value;
    el.segments = segments;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  it("channel: fills the channel in proportion and ticks it into segments", async () => {
    const el = await make("channel", 25, 4);
    const channel = Number(el.shadowRoot?.querySelector(".channel")?.getAttribute("width"));
    const fill = Number(el.shadowRoot?.querySelector(".fill")?.getAttribute("width"));
    expect(fill).toBeCloseTo(channel * 0.25);
    expect(el.shadowRoot?.querySelectorAll(".tick")).toHaveLength(3);
    expect(el.shadowRoot?.querySelector(".bevel")).not.toBeNull();
    el.remove();
  });

  it("cells: one bevelled block per segment, lit in proportion", async () => {
    const el = await make("cells", 30, 10);
    expect(el.shadowRoot?.querySelectorAll(".cell")).toHaveLength(10);
    expect(el.shadowRoot?.querySelectorAll(".cell.on")).toHaveLength(3);
    expect(el.shadowRoot?.querySelectorAll(".cell .bevel")).toHaveLength(10);
    // Each cell clips its bevel to its own outline.
    const ids = Array.from(el.shadowRoot?.querySelectorAll('[id^="zd-cell-clip-"]') ?? []).map(
      (c) => c.id,
    );
    expect(new Set(ids).size).toBe(10);
    el.remove();
  });

  it("peaks: paints teeth up to the value and carries a marker", async () => {
    const el = await make("peaks", 50);
    const teeth = el.shadowRoot?.querySelectorAll(".tooth") ?? [];
    const on = el.shadowRoot?.querySelectorAll(".tooth.on") ?? [];
    expect(teeth.length).toBeGreaterThan(4);
    expect(on.length).toBe(teeth.length / 2);
    expect(el.shadowRoot?.querySelector(".marker")).not.toBeNull();
    el.remove();
  });

  it("keeps progressbar semantics on every variant", async () => {
    for (const v of ["shards", "channel", "cells", "peaks"]) {
      const el = await make(v, 40);
      const bar = el.shadowRoot?.querySelector('[role="progressbar"]');
      expect(bar?.getAttribute("aria-valuenow")).toBe("40");
      el.remove();
    }
  });
});
