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
});
