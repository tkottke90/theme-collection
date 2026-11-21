import { render } from "@testing-library/preact";
import { ThemeHeading } from "./ThemeHeading.js";

describe("ThemeHeading", () => {
  it("renders the semantic tag matching the level", () => {
    const { container } = render(<ThemeHeading level={3}>Title</ThemeHeading>);
    expect(container.querySelector("h3")?.textContent).toBe("Title");
  });

  it("defaults to level 1", () => {
    const { container } = render(<ThemeHeading>Title</ThemeHeading>);
    expect(container.querySelector("h1")).toBeTruthy();
  });
});
