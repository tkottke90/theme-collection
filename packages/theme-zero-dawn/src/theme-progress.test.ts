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

  it("colours every lit part from --zd-progress-fill, falling back to the theme cyan", async () => {
    const css = (
      customElements.get("theme-progress") as unknown as { styles: { cssText: string }[] }
    ).styles
      .map((st) => st.cssText)
      .join("\n");
    expect(css).toContain("--zd-progress-light: var(--zd-progress-fill, var(--color-brand-500))");
    // Hue only: lightness and chroma are locked to the contrast-safe band.
    expect(css).toMatch(/@supports \(color: oklch\(from red 0\.72 0\.12 h\)\)/);
    expect(css).toMatch(
      /oklch\(\s*from var\(--zd-progress-fill, var\(--color-brand-500\)\) 0\.72 0\.12 h\s*\)/,
    );
    for (const part of [".fill", ".edge", ".spill"]) {
      expect(css).toMatch(new RegExp(`\\${part}\\s*\\{[^}]*--zd-progress-light`));
    }

    // The SVG parts carry no colour of their own, so the stylesheet decides.
    const el = await make({ variant: "recessed", value: 50 } as Partial<ThemeProgress>);
    for (const part of [".fill", ".edge", ".spill"]) {
      expect(el.shadowRoot?.querySelector(part)?.hasAttribute("fill")).toBe(false);
    }
    el.remove();
  });
});
