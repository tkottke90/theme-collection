import { render } from "@testing-library/preact";
import { ThemeItem } from "./ThemeItem.js";

describe("ThemeItem", () => {
  it("renders an li by default", () => {
    const { container } = render(<ThemeItem>Row</ThemeItem>);
    expect(container.querySelector("li")?.textContent).toBe("Row");
  });

  it("renders the requested tag", () => {
    const { container } = render(<ThemeItem as="div">Row</ThemeItem>);
    expect(container.querySelector("div")).toBeTruthy();
  });
});
