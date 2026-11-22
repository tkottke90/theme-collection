import { render } from "@testing-library/preact";
import { ThemeSelect } from "./ThemeSelect.js";

describe("ThemeSelect", () => {
  it("renders its option children", () => {
    const { getByText } = render(
      <ThemeSelect>
        <option value="one">One</option>
        <option value="two">Two</option>
      </ThemeSelect>,
    );
    expect(getByText("One")).toBeTruthy();
    expect(getByText("Two")).toBeTruthy();
  });
});
