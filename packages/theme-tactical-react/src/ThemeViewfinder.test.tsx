import { render, screen } from "@testing-library/preact";
import { ThemeViewfinder } from "./ThemeViewfinder.js";

describe("ThemeViewfinder", () => {
  it("renders the heading and children", () => {
    render(<ThemeViewfinder heading="Target lock">Body copy</ThemeViewfinder>);
    expect(screen.getByText("Target lock")).toBeTruthy();
    expect(screen.getByText("Body copy")).toBeTruthy();
  });

  it("omits the heading element when none is given", () => {
    render(<ThemeViewfinder>Body copy only</ThemeViewfinder>);
    expect(screen.queryByRole("heading")).toBeNull();
  });
});
