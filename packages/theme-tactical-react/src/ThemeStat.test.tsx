import { render, screen } from "@testing-library/preact";
import { ThemeStat } from "./ThemeStat.js";

describe("ThemeStat", () => {
  it("renders the label and value", () => {
    render(<ThemeStat label="System Status" value="1565" />);
    expect(screen.getByText("System Status")).toBeTruthy();
    expect(screen.getByText("1565")).toBeTruthy();
  });

  it("renders the unit when provided", () => {
    render(<ThemeStat label="Altitude" value="128" unit="ft" />);
    expect(screen.getByText("ft")).toBeTruthy();
  });

  it("renders a numeric value", () => {
    render(<ThemeStat label="Count" value={42} />);
    expect(screen.getByText("42")).toBeTruthy();
  });
});
