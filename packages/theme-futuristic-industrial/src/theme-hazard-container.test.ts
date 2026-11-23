import "./theme-hazard-container.js";
import type { ThemeHazardContainer } from "./theme-hazard-container.js";

describe("theme-hazard-container", () => {
  it("defaults to rendering a div", async () => {
    const el = document.createElement("theme-hazard-container") as ThemeHazardContainer;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("div")).not.toBeNull();

    el.remove();
  });

  it("renders the semantic tag matching the as property", async () => {
    const el = document.createElement("theme-hazard-container") as ThemeHazardContainer;
    el.as = "ul";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("ul")).not.toBeNull();
    expect(el.shadowRoot?.querySelector("div")).toBeNull();

    el.remove();
  });

  it("defaults to the dark tape and reflects the variant", async () => {
    const el = document.createElement("theme-hazard-container") as ThemeHazardContainer;
    document.body.appendChild(el);
    await el.updateComplete;
    const stripeFill = () =>
      el.shadowRoot?.querySelector("pattern#hazard-stripes rect")?.getAttribute("fill");

    expect(el.getAttribute("variant")).toBe("dark");
    expect(stripeFill()).toBe("var(--color-neutral-900)");

    el.variant = "light";
    await el.updateComplete;
    expect(el.getAttribute("variant")).toBe("light");
    expect(stripeFill()).toBe("var(--color-brand-600)");

    el.remove();
  });

  it("renders the frame overlay and a slot for content", async () => {
    const el = document.createElement("theme-hazard-container") as ThemeHazardContainer;
    el.textContent = "Restricted";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("svg pattern#hazard-stripes")).not.toBeNull();
    expect(el.shadowRoot?.querySelector("slot")).not.toBeNull();

    el.remove();
  });
});
