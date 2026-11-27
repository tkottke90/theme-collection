import { render, screen, fireEvent } from "@testing-library/preact";
import { ThemeButton } from "./ThemeButton.js";

describe("ThemeButton", () => {
  it("renders the label", () => {
    render(<ThemeButton label="Save" />);
    expect(screen.getByText("Save")).toBeTruthy();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<ThemeButton label="Go" onClick={onClick} />);
    fireEvent.click(screen.getByText("Go"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("ThemeButton in a form", () => {
  it("defaults to type=button, and passes submit and reset through", () => {
    const { rerender } = render(<ThemeButton label="A" />);
    expect((screen.getByText("A") as HTMLButtonElement).type).toBe("button");
    rerender(<ThemeButton label="A" type="submit" />);
    expect((screen.getByText("A") as HTMLButtonElement).type).toBe("submit");
    rerender(<ThemeButton label="A" type="reset" />);
    expect((screen.getByText("A") as HTMLButtonElement).type).toBe("reset");
  });

  it("submits and resets its form", () => {
    const onSubmit = jest.fn((e: Event) => e.preventDefault());
    render(
      <form onSubmit={onSubmit} data-testid="form">
        <input name="a" defaultValue="1" aria-label="a" />
        <ThemeButton label="Send" type="submit" />
        <ThemeButton label="Clear" type="reset" />
      </form>,
    );
    const a = screen.getByLabelText("a") as HTMLInputElement;
    fireEvent.input(a, { target: { value: "2" } });
    fireEvent.click(screen.getByText("Send"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText("Clear"));
    expect(a.value).toBe("1");
  });
});
