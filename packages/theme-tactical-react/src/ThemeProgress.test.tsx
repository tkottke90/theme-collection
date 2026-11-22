import { render, screen } from "@testing-library/preact";
import { ThemeProgress } from "./ThemeProgress.js";

describe("ThemeProgress", () => {
  it("sets the fill width from value/max", () => {
    render(<ThemeProgress value={50} max={100} />);
    const bar = screen.getByRole("progressbar");
    const fill = bar.firstElementChild as HTMLElement;
    expect(fill.style.width).toBe("50%");
  });

  it("clamps the fill width to 100% when value exceeds max", () => {
    render(<ThemeProgress value={150} max={100} />);
    const bar = screen.getByRole("progressbar");
    const fill = bar.firstElementChild as HTMLElement;
    expect(fill.style.width).toBe("100%");
  });

  it("sets ARIA attributes on the progressbar role", () => {
    render(<ThemeProgress value={30} max={100} />);
    const bar = screen.getByRole("progressbar");
    expect(bar.getAttribute("aria-valuenow")).toBe("30");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
  });

  it("omits the label element when none is provided", () => {
    render(<ThemeProgress value={10} />);
    expect(screen.queryByText(/./, { selector: "p" })).toBeNull();
  });
});
