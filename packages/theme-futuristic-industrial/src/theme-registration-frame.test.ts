import "./theme-registration-frame.js";
import type { ThemeRegistrationFrame } from "./theme-registration-frame.js";

describe("theme-registration-frame", () => {
  it("renders the frame overlay and a slot for content", async () => {
    const el = document.createElement("theme-registration-frame") as ThemeRegistrationFrame;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
    expect(el.shadowRoot!.querySelector("slot")).not.toBeNull();

    el.remove();
  });
});
