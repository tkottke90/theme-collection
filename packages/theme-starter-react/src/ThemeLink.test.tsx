import { render, screen, fireEvent } from "@testing-library/preact";
import { ThemeLink } from "./ThemeLink.js";

describe("ThemeLink", () => {
  it("renders an anchor with the given href", () => {
    render(<ThemeLink href="/docs">Docs</ThemeLink>);
    const link = screen.getByText("Docs") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("/docs");
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<ThemeLink onClick={onClick}>Click</ThemeLink>);
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
