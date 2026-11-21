import { render, screen } from "@testing-library/preact";
import { ThemeCard } from "./ThemeCard.js";

describe("ThemeCard", () => {
  it("renders the heading and children", () => {
    render(<ThemeCard heading="Card title">Body copy</ThemeCard>);
    expect(screen.getByText("Card title")).toBeTruthy();
    expect(screen.getByText("Body copy")).toBeTruthy();
  });

  it("omits the heading element when none is given", () => {
    render(<ThemeCard>Body copy only</ThemeCard>);
    expect(screen.queryByRole("heading")).toBeNull();
  });
});
