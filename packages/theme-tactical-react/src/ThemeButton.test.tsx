import { render, screen, fireEvent } from "@testing-library/preact";
import { ThemeButton } from "./ThemeButton.js";

describe("ThemeButton", () => {
  it("renders the label", () => {
    render(<ThemeButton label="Save" />);
    expect(screen.getByText("Save")).toBeTruthy();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<ThemeButton label="Go" onClick={onClick} />);
    fireEvent.click(screen.getByText("Go"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
