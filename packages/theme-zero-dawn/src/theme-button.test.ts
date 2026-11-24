import "./theme-button.js";
import type { ThemeButton } from "./theme-button.js";

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
});
