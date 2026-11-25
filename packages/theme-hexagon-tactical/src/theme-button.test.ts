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

  it("names the inner button from the host aria-label", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    el.setAttribute("aria-label", "Play");
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

  it("ignores the retired accessible-label attribute", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    el.setAttribute("accessible-label", "Play");
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("button")?.hasAttribute("aria-label")).toBe(false);

    el.remove();
  });

  it("defaults to type button and reflects type", async () => {
    const el = document.createElement("theme-button") as ThemeButton;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.type).toBe("button");

    el.type = "submit";
    await el.updateComplete;
    expect(el.getAttribute("type")).toBe("submit");

    el.remove();
  });
});
