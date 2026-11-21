import { render } from "@testing-library/preact";
import { ThemeText } from "./ThemeText.js";

describe("ThemeText", () => {
  it("renders body variant as a paragraph", () => {
    const { container } = render(<ThemeText>Body copy</ThemeText>);
    expect(container.querySelector("p")?.textContent).toBe("Body copy");
  });

  it("renders caption variant as small", () => {
    const { container } = render(<ThemeText variant="caption">Caption</ThemeText>);
    expect(container.querySelector("small")?.textContent).toBe("Caption");
  });
});
