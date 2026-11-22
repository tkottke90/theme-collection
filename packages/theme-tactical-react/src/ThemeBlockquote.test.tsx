import { render, screen } from "@testing-library/preact";
import { ThemeBlockquote, type ThemeBlockquoteType } from "./ThemeBlockquote.js";

const LABELS: Record<ThemeBlockquoteType, string> = {
  info: "Info",
  tip: "Tip",
  question: "Question",
  success: "Success",
  warning: "Warning",
  failure: "Failure",
  danger: "Danger",
  bug: "Bug",
  example: "Example",
  quote: "Quote",
};

describe("ThemeBlockquote", () => {
  it("renders the info label by default", () => {
    render(<ThemeBlockquote>Content</ThemeBlockquote>);
    expect(screen.getByText("Info")).toBeTruthy();
    expect(screen.getByText("Content")).toBeTruthy();
  });

  it("renders the matching label for every variant", () => {
    for (const [type, label] of Object.entries(LABELS) as [ThemeBlockquoteType, string][]) {
      const { unmount } = render(<ThemeBlockquote type={type}>Content</ThemeBlockquote>);
      expect(screen.getByText(label)).toBeTruthy();
      unmount();
    }
  });
});
