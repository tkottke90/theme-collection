import { render } from "@testing-library/preact";
import { ThemeTextarea } from "./ThemeTextarea.js";

describe("ThemeTextarea", () => {
  it("renders with the given rows and placeholder", () => {
    const { container } = render(<ThemeTextarea rows={6} placeholder="Notes" />);
    const textarea = container.querySelector("textarea");
    expect(textarea?.getAttribute("rows")).toBe("6");
    expect(textarea?.getAttribute("placeholder")).toBe("Notes");
  });
});
