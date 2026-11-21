import { render } from "@testing-library/preact";
import { ThemeContainer } from "./ThemeContainer.js";

describe("ThemeContainer", () => {
  it("renders a div by default", () => {
    const { container } = render(<ThemeContainer>Content</ThemeContainer>);
    expect(container.querySelector("div")?.textContent).toBe("Content");
  });

  it("renders the requested tag", () => {
    const { container } = render(<ThemeContainer as="ul">Content</ThemeContainer>);
    expect(container.querySelector("ul")).toBeTruthy();
  });
});
