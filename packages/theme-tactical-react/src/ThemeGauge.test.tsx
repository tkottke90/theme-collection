import { render, screen } from "@testing-library/preact";
import { ThemeGauge } from "./ThemeGauge.js";

describe("ThemeGauge", () => {
  it("renders the rounded value in the center label", () => {
    render(<ThemeGauge value={72.4} />);
    expect(screen.getByText("72")).toBeTruthy();
  });

  it("sets the dashoffset on the value arc relative to value/max", () => {
    render(<ThemeGauge value={100} max={100} />);
    const circles = document.querySelectorAll("circle");
    const valueArc = circles[1];
    expect(valueArc.getAttribute("stroke-dashoffset")).toBe("0");
  });

  it("sets meter ARIA attributes", () => {
    render(<ThemeGauge value={40} label="Power" />);
    const meter = screen.getByRole("meter");
    expect(meter.getAttribute("aria-valuenow")).toBe("40");
    expect(meter.getAttribute("aria-label")).toBe("Power");
  });
});
