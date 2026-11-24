import "./theme-circuit.js";
import type { ThemeCircuit } from "./theme-circuit.js";

describe("theme-circuit", () => {
  it("draws a mirrored pair of trace halves behind a slot", async () => {
    const el = document.createElement("theme-circuit") as ThemeCircuit;
    document.body.appendChild(el);
    await el.updateComplete;

    const halves = el.shadowRoot?.querySelectorAll(".half") ?? [];
    expect(halves).toHaveLength(2);
    expect(halves[1]?.getAttribute("transform")).toContain("scale(-1 1)");
    expect(el.shadowRoot?.querySelector("slot")).not.toBeNull();

    el.remove();
  });

  it("reflects glow", async () => {
    const el = document.createElement("theme-circuit") as ThemeCircuit;
    el.glow = true;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.hasAttribute("glow")).toBe(true);

    el.remove();
  });
});
