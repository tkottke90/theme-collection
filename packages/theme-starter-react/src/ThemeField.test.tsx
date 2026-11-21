import { render, screen } from "@testing-library/preact";
import { ThemeField } from "./ThemeField.js";

describe("ThemeField", () => {
  it("renders the label bound to the given id and projects children", () => {
    render(
      <ThemeField label="Email" htmlFor="email-field">
        <input id="email-field" />
      </ThemeField>,
    );
    const label = screen.getByText("Email") as HTMLLabelElement;
    expect(label.getAttribute("for")).toBe("email-field");
  });
});
