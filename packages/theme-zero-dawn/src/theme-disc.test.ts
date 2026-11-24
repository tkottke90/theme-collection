import "./theme-disc.js";
import type { ThemeDisc } from "./theme-disc.js";
import { DISH_SIDES, PEAK_COUNT, SEGMENT_COUNT, discVariantStyles } from "./disc-variants.js";

describe("theme-disc", () => {
  it("is an indeterminate progressbar with no value", async () => {
    const el = document.createElement("theme-disc") as ThemeDisc;
    document.body.appendChild(el);
    await el.updateComplete;

    const root = el.shadowRoot?.querySelector('[role="progressbar"]');
    expect(root).not.toBeNull();
    expect(root?.hasAttribute("aria-valuenow")).toBe(false);
    // Only the light moves: the arc spins and the core pulses; the dish
    // (rim, panels, spokes) is outside every animated group.
    expect(el.shadowRoot?.querySelector(".arc-spin .arc")).not.toBeNull();
    expect(el.shadowRoot?.querySelector(".core-pulse")).not.toBeNull();
    expect(el.shadowRoot?.querySelector(".arc-spin .panel, .arc-spin .dish")).toBeNull();
    expect(el.shadowRoot?.querySelector(".dish")?.closest(".arc-spin, .core-pulse")).toBeNull();

    el.remove();
  });

  it("is a meter with a clamped percentage when given a value", async () => {
    const el = document.createElement("theme-disc") as ThemeDisc;
    el.value = 150;
    el.max = 200;
    document.body.appendChild(el);
    await el.updateComplete;

    const root = el.shadowRoot?.querySelector('[role="meter"]');
    expect(root?.getAttribute("aria-valuenow")).toBe("150");
    expect(root?.getAttribute("aria-valuemax")).toBe("200");
    expect(el.shadowRoot?.textContent).toContain("75%");

    el.remove();
  });

  it("segments: lights segments in proportion and shows the value in the core", async () => {
    const el = document.createElement("theme-disc") as ThemeDisc;
    el.variant = "segments";
    el.value = 50;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll(".segment")).toHaveLength(SEGMENT_COUNT);
    expect(el.shadowRoot?.querySelectorAll(".segment.on")).toHaveLength(SEGMENT_COUNT / 2);
    expect(el.shadowRoot?.querySelector(".readout")?.textContent?.trim()).toBe("50");
    expect(el.shadowRoot?.querySelector(".pulse")).toBeNull();

    el.remove();
  });

  it("segments: spinner pulses every segment, staggered round the ring", async () => {
    const el = document.createElement("theme-disc") as ThemeDisc;
    el.variant = "segments";
    document.body.appendChild(el);
    await el.updateComplete;

    const pulses = Array.from(el.shadowRoot?.querySelectorAll<SVGElement>(".pulse") ?? []);
    expect(pulses).toHaveLength(SEGMENT_COUNT);
    const delays = pulses.map((p) => parseFloat(p.style.animationDelay));
    expect(new Set(delays).size).toBe(SEGMENT_COUNT);
    expect(el.shadowRoot?.querySelector('[role="progressbar"]')).not.toBeNull();

    el.remove();
  });

  it("peaks: paints triangles in proportion; spinner adds the ticking runner", async () => {
    const el = document.createElement("theme-disc") as ThemeDisc;
    el.variant = "peaks";
    el.value = 25;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll(".peak")).toHaveLength(PEAK_COUNT);
    expect(el.shadowRoot?.querySelectorAll(".peak.on")).toHaveLength(PEAK_COUNT / 4);
    expect(el.shadowRoot?.querySelector(".peaks-spin")).toBeNull();

    el.value = undefined;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".peaks-spin")).not.toBeNull();
    expect(el.getAttribute("variant")).toBe("peaks");

    el.remove();
  });

  it("dish: faceted rim and raised panels, static as a gauge", async () => {
    const el = document.createElement("theme-disc") as ThemeDisc;
    el.value = 40;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll(".dish > .bevel .facet")).toHaveLength(DISH_SIDES);
    expect(el.shadowRoot?.querySelectorAll(".panel")).toHaveLength(5);
    expect(el.shadowRoot?.querySelectorAll(".panel .facet")).toHaveLength(20);
    expect(el.shadowRoot?.querySelector(".arc-spin, .core-pulse")).toBeNull();

    el.remove();
  });

  it("pulses the dish core in brightness and glow only, never scale", () => {
    const keyframes = discVariantStyles.cssText.match(/@keyframes zd-core-pulse[^@]*/)?.[0] ?? "";
    expect(keyframes).toContain("opacity");
    expect(keyframes).toContain("drop-shadow");
    expect(keyframes).not.toMatch(/transform|scale/);
  });
});
