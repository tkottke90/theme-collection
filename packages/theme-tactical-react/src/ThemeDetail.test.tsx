import { render, screen } from "@testing-library/preact";
import { ThemeDetail } from "./ThemeDetail.js";

describe("ThemeDetail", () => {
  it("renders the summary and projected children", () => {
    render(<ThemeDetail summary="More info">Extra details</ThemeDetail>);
    expect(screen.getByText("More info").tagName).toBe("SUMMARY");
    expect(screen.getByText("Extra details")).toBeTruthy();
  });
});
