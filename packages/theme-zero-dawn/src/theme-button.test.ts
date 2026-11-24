import "./theme-button.js";
import type { ThemeButton } from "./theme-button.js";
import { BUTTON_PLATE, pressDistance } from "./theme-button.js";

describe("theme-button", () => {
  it("renders a button with the default label", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    document.body.appendChild(el);
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.textContent?.trim()).toBe("Click me");

    el.remove();
  });

  it("reflects the label property", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    el.label = "Submit";
    document.body.appendChild(el);
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.textContent?.trim()).toBe("Submit");

    el.remove();
  });

  it("reflects the variant property as a host attribute", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    el.variant = "secondary";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("variant")).toBe("secondary");

    el.remove();
  });

  it("disables the inner button when disabled is set", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    el.disabled = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const button = el.shadowRoot?.querySelector("button");
    expect(button?.disabled).toBe(true);

    el.remove();
  });

  it("draws a bevel and core drop only for raised (primary/secondary) buttons", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    document.body.appendChild(el);
    // jsdom has no layout, so feed the frame a size directly.
    const frame = (el as unknown as { frame: { geometry: unknown } }).frame;
    const { computePlate } = await import("./plate-geometry.js");
    frame.geometry = computePlate(120, 40, {
      cut: 10,
      smallCut: 0,
      groove: 3,
      drop: 3,
      notch: false,
    });
    el.requestUpdate();
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".bevel")).not.toBeNull();
    expect(el.shadowRoot?.querySelector(".drop")).not.toBeNull();

    el.variant = "ghost";
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".bevel")).toBeNull();
    expect(el.shadowRoot?.querySelector(".drop")).toBeNull();

    el.variant = "secondary";
    el.disabled = true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector(".bevel")).toBeNull();

    el.remove();
  });

  it("presses raised buttons exactly onto their drop shadow, ghosts a nudge, disabled not at all", () => {
    expect(pressDistance(true, false)).toBe(BUTTON_PLATE.drop);
    expect(pressDistance(false, false)).toBe(1);
    expect(pressDistance(true, true)).toBe(0);
  });

  it("moves the plate and label together, leaving the drop shadow in place", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    document.body.appendChild(el);
    const frame = (el as unknown as { frame: { geometry: unknown } }).frame;
    const { computePlate } = await import("./plate-geometry.js");
    frame.geometry = computePlate(120, 40, BUTTON_PLATE);
    el.requestUpdate();
    await el.updateComplete;

    const root = el.shadowRoot;
    expect(root?.querySelector(".plate .face")).not.toBeNull();
    expect(root?.querySelector(".plate .bevel")).not.toBeNull();
    expect(root?.querySelector(".drop")?.closest(".plate")).toBeNull();
    expect(root?.querySelector(".label slot")).not.toBeNull();
    expect(root?.querySelector("button")?.getAttribute("style")).toContain(
      `--zd-press: ${BUTTON_PLATE.drop}px`,
    );

    el.disabled = true;
    await el.updateComplete;
    expect(root?.querySelector("button")?.getAttribute("style")).toContain("--zd-press: 0px");

    el.remove();
  });

  it("forwards accessible-label to the inner button", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    el.setAttribute("accessible-label", "Play");
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("button")?.getAttribute("aria-label")).toBe("Play");

    el.remove();
  });

  it("sets no aria-label on the inner button by default", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("button")?.hasAttribute("aria-label")).toBe(false);

    el.remove();
  });
});
