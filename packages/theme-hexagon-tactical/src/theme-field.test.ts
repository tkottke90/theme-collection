import "./theme-field.js";
import type { ThemeField } from "./theme-field.js";

describe("theme-field", () => {
  it("renders the label and binds it to the for attribute", async () => {
    const el = document.createElement("theme-field") as ThemeField;
    el.label = "Email address";
    el.for = "email-input";
    document.body.appendChild(el);
    await el.updateComplete;

    const label = el.shadowRoot?.querySelector("label");
    expect(label?.textContent?.trim()).toBe("Email address");
    expect(label?.getAttribute("for")).toBe("email-input");

    el.remove();
  });
});
