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

  it("shows numbers on an ol, and no markers on a ul or div", () => {
    const style = (as: "ol" | "ul" | "div") => {
      const { container, unmount } = render(<ThemeContainer as={as}>Content</ThemeContainer>);
      const classes = (container.firstElementChild as HTMLElement).className;
      unmount();
      return classes;
    };
    expect(style("ol")).toContain("list-decimal");
    expect(style("ol")).not.toContain("list-none");
    expect(style("ul")).toContain("list-none");
    expect(style("div")).toContain("list-none");
  });
});
