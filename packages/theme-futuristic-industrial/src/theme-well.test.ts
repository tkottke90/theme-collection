import "./theme-well.js";
import type { ThemeWell } from "./theme-well.js";

describe("theme-well", () => {
  it("renders a decorative frame and slots its controls", async () => {
    const el = document.createElement("theme-well") as ThemeWell;
    el.innerHTML = "<button>Up</button>";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
    expect(el.shadowRoot!.querySelector("slot")).not.toBeNull();
    expect(el.querySelector("button")?.textContent).toBe("Up");

    el.remove();
  });
});
