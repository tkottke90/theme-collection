import "./theme-progress.js";
import type { ThemeProgress } from "./theme-progress.js";

async function make(props: Partial<ThemeProgress> & { variant?: string } = {}) {
  const el = document.createElement("theme-progress") as ThemeProgress;
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

function fillRatio(el: ThemeProgress, channelSelector: string) {
  const channel = Number(el.shadowRoot?.querySelector(channelSelector)?.getAttribute("width"));
  const fill = Number(el.shadowRoot?.querySelector(".fill")?.getAttribute("width"));
  return fill / channel;
}

describe("theme-progress", () => {
  it("defaults to the raised channel", async () => {
    const el = await make({ value: 30 });
    expect(el.getAttribute("variant")).toBe("raised");
    expect(el.shadowRoot?.querySelector(".plate")).not.toBeNull();
    expect(el.shadowRoot?.querySelector(".drop")).not.toBeNull();
    el.remove();
  });

  it("raised: fills the channel in proportion and ticks it into segments", async () => {
    const el = await make({ value: 25, segments: 4 });
    expect(fillRatio(el, ".channel")).toBeCloseTo(0.25);
    expect(el.shadowRoot?.querySelectorAll(".tick")).toHaveLength(3);
    el.remove();
  });

  it("recessed: a slot with inward-lit walls, no plate or drop, filled in proportion", async () => {
    const el = await make({
      variant: "recessed",
      value: 40,
      segments: 5,
    } as Partial<ThemeProgress>);
    const root = el.shadowRoot;
    expect(root?.querySelector(".plate")).toBeNull();
    expect(root?.querySelector(".drop")).toBeNull();
    expect(root?.querySelector(".slot")).not.toBeNull();
    expect(root?.querySelectorAll(".tick")).toHaveLength(4);

    // Walls face inward: the top wall (lit on a raised edge) is shaded here,
    // the bottom wall (shaded on a raised edge) is lit.
    const walls = Array.from(root?.querySelectorAll(".walls .facet") ?? []);
    expect(walls[0]?.classList.contains("shade")).toBe(true);
    expect(walls.some((f) => f.classList.contains("lit"))).toBe(true);

    const spill = Number(root?.querySelector(".spill")?.getAttribute("width"));
    const fill = Number(root?.querySelector(".fill")?.getAttribute("width"));
    expect(spill).toBeCloseTo(fill);
    el.remove();
  });

  it("clamps the value and keeps progressbar semantics", async () => {
    const el = await make({ value: 500, label: "Armour" });
    const bar = el.shadowRoot?.querySelector('[role="progressbar"]');
    expect(bar?.getAttribute("aria-label")).toBe("Armour");
    expect(bar?.getAttribute("aria-valuenow")).toBe("500");
    expect(fillRatio(el, ".channel")).toBeCloseTo(1);
    expect(el.shadowRoot?.textContent).toContain("100%");
    el.remove();
  });
});
