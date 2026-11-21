import { render } from "@testing-library/preact";
import { ThemeSkeletonText } from "./ThemeSkeletonText.js";

describe("ThemeSkeletonText", () => {
  it("renders a placeholder block with the given width", () => {
    const { container } = render(<ThemeSkeletonText width="50%" />);
    const bar = container.firstElementChild as HTMLElement;
    expect(bar.style.width).toBe("50%");
  });
});
