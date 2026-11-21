import { render, fireEvent } from "@testing-library/preact";
import { ThemeInput } from "./ThemeInput.js";

describe("ThemeInput", () => {
  it("renders with the given type and placeholder", () => {
    const { container } = render(<ThemeInput type="email" placeholder="you@example.com" />);
    const input = container.querySelector("input");
    expect(input?.getAttribute("type")).toBe("email");
    expect(input?.getAttribute("placeholder")).toBe("you@example.com");
  });

  it("calls onChange when the value changes", () => {
    const onChange = jest.fn();
    const { container } = render(<ThemeInput onChange={onChange} />);
    const input = container.querySelector("input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "hello" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
