import "./theme-hex-socket.js";
import type { ThemeHexSocket } from "./theme-hex-socket.js";

describe("theme-hex-socket", () => {
  it("positions itself from the q/r properties", async () => {
    const el = document.createElement("theme-hex-socket") as ThemeHexSocket;
    el.q = 2;
    el.r = 1;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.style.getPropertyValue("--q")).toBe("2");
    expect(el.style.getPropertyValue("--r")).toBe("1");

    el.remove();
  });

  it("renders a + for an add socket and nothing for an empty one", async () => {
    const addEl = document.createElement("theme-hex-socket") as ThemeHexSocket;
    addEl.add = true;
    document.body.appendChild(addEl);
    await addEl.updateComplete;
    expect(addEl.shadowRoot?.querySelector(".hex.add")?.textContent?.trim()).toBe("+");
    addEl.remove();

    const emptyEl = document.createElement("theme-hex-socket") as ThemeHexSocket;
    emptyEl.empty = true;
    document.body.appendChild(emptyEl);
    await emptyEl.updateComplete;
    expect(emptyEl.shadowRoot?.querySelector(".hex.empty")).not.toBeNull();
    emptyEl.remove();
  });

  it("renders the step number when provided", async () => {
    const el = document.createElement("theme-hex-socket") as ThemeHexSocket;
    el.step = "7";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector(".num")?.textContent).toBe("7");

    el.remove();
  });

  it("forwards the host's aria-label to the inner button", async () => {
    const el = document.createElement("theme-hex-socket") as ThemeHexSocket;
    el.setAttribute("aria-label", "Lift, step 3");
    document.body.appendChild(el);
    await el.updateComplete;
    const button = el.shadowRoot!.querySelector("button")!;
    expect(button.getAttribute("aria-label")).toBe("Lift, step 3");

    el.removeAttribute("aria-label");
    await el.updateComplete;
    expect(button.hasAttribute("aria-label")).toBe(false);
    el.remove();
  });
});
