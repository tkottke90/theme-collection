import "./theme-hex-board.js";
import "./theme-hex-socket.js";
import type { ThemeHexBoard } from "./theme-hex-board.js";

describe("theme-hex-board", () => {
  it("sets --w/--cols/--rows as inherited custom properties", async () => {
    const el = document.createElement("theme-hex-board") as ThemeHexBoard;
    el.cols = 3;
    el.rows = 4;
    el.w = 72;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.style.getPropertyValue("--w")).toBe("72px");
    expect(el.style.getPropertyValue("--cols")).toBe("3");
    expect(el.style.getPropertyValue("--rows")).toBe("4");

    el.remove();
  });

  it("renders slotted hex sockets", async () => {
    const el = document.createElement("theme-hex-board") as ThemeHexBoard;
    el.innerHTML = '<theme-hex-socket q="0" r="0"></theme-hex-socket>';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.querySelector("theme-hex-socket")).not.toBeNull();

    el.remove();
  });
});
