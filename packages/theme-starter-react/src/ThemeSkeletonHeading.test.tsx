import { render } from "@testing-library/preact";
import { ThemeSkeletonHeading } from "./ThemeSkeletonHeading.js";

describe("ThemeSkeletonHeading", () => {
  it("renders a placeholder block with the given width", () => {
    const { container } = render(<ThemeSkeletonHeading width="40%" />);
    const bar = container.firstElementChild as HTMLElement;
    expect(bar.style.width).toBe("40%");
  });
});
