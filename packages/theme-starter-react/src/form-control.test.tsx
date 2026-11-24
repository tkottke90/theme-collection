import { fireEvent, render, screen } from "@testing-library/preact";
import { useState } from "preact/hooks";
import { ThemeField } from "./ThemeField.js";
import { ThemeInput } from "./ThemeInput.js";
import { ThemeSelect } from "./ThemeSelect.js";
import { ThemeTextarea } from "./ThemeTextarea.js";

/** The form-ready contract: native controls in the light DOM, driven by a real <form>. */

function Sighting() {
  return (
    <form data-testid="form">
      <ThemeField label="Machine">
        <ThemeInput name="machine" defaultValue="Ridgestrider" />
      </ThemeField>
      <ThemeField label="Class">
        <ThemeSelect name="class" defaultValue="relay">
          <option value="grazer">Grazer</option>
          <option value="relay">Relay</option>
          <option value="hunter">Hunter</option>
        </ThemeSelect>
      </ThemeField>
      <ThemeField label="Notes">
        <ThemeTextarea name="notes" defaultValue="Plates loose" />
      </ThemeField>
      <label>
        <ThemeInput type="checkbox" name="core" value="yes" /> Core exposed
      </label>
      <ThemeField label="Threat">
        <div>
          <label>
            <ThemeInput type="radio" name="threat" value="low" /> Low
          </label>
          <label>
            <ThemeInput type="radio" name="threat" value="high" defaultChecked /> High
          </label>
        </div>
      </ThemeField>
    </form>
  );
}

const formOf = () => screen.getByTestId("form") as HTMLFormElement;
const entries = (form: HTMLFormElement) => Object.fromEntries(new FormData(form));

describe("form controls", () => {
  it("submit their values under their names", () => {
    render(<Sighting />);
    expect(entries(formOf())).toEqual({
      machine: "Ridgestrider",
      class: "relay",
      notes: "Plates loose",
      threat: "high",
    });

    fireEvent.click(screen.getByLabelText("Core exposed"));
    expect(new FormData(formOf()).get("core")).toBe("yes");
  });

  it("track user edits and return to their defaults on form.reset()", () => {
    render(<Sighting />);
    const machine = screen.getByLabelText("Machine") as HTMLInputElement;
    const kind = screen.getByLabelText("Class") as HTMLSelectElement;
    const notes = screen.getByLabelText("Notes") as HTMLTextAreaElement;
    const core = screen.getByLabelText("Core exposed") as HTMLInputElement;
    const low = screen.getByLabelText("Low") as HTMLInputElement;

    fireEvent.input(machine, { target: { value: "Shardback" } });
    fireEvent.change(kind, { target: { value: "hunter" } });
    fireEvent.input(notes, { target: { value: "Core under the jaw" } });
    fireEvent.click(core);
    fireEvent.click(low);
    expect(entries(formOf())).toEqual({
      machine: "Shardback",
      class: "hunter",
      notes: "Core under the jaw",
      core: "yes",
      threat: "low",
    });

    formOf().reset();
    expect(entries(formOf())).toEqual({
      machine: "Ridgestrider",
      class: "relay",
      notes: "Plates loose",
      threat: "high",
    });
  });

  it("are disabled by <fieldset disabled> and then left out of the submission", () => {
    render(
      <form data-testid="form">
        <fieldset disabled>
          <ThemeInput name="a" defaultValue="1" aria-label="A" />
          <ThemeSelect name="b" aria-label="B">
            <option value="x">X</option>
          </ThemeSelect>
          <ThemeTextarea name="c" defaultValue="3" aria-label="C" />
        </fieldset>
      </form>,
    );
    for (const name of ["A", "B", "C"]) {
      expect(screen.getByLabelText(name).matches(":disabled")).toBe(true);
    }
    expect(entries(formOf())).toEqual({});
  });

  it("are named by their ThemeField label, which points at them natively", () => {
    render(<Sighting />);
    for (const [label, tag] of [
      ["Machine", "INPUT"],
      ["Class", "SELECT"],
      ["Notes", "TEXTAREA"],
    ] as const) {
      const control = screen.getByLabelText(label);
      expect(control.tagName).toBe(tag);
      expect(screen.getByText(label).getAttribute("for")).toBe(control.id);
    }
    // Two fields get distinct generated ids.
    expect(screen.getByLabelText("Machine").id).not.toBe(screen.getByLabelText("Class").id);
  });

  it("forward change and input handlers, and work controlled", () => {
    const onChange = jest.fn();
    function Controlled() {
      const [value, setValue] = useState("Ada");
      return (
        <ThemeField label="Name">
          <ThemeInput
            value={value}
            onInput={(e) => setValue((e.currentTarget as HTMLInputElement).value)}
            onChange={onChange}
          />
        </ThemeField>
      );
    }
    render(<Controlled />);
    const input = screen.getByLabelText("Name") as HTMLInputElement;
    expect(input.value).toBe("Ada");
    fireEvent.input(input, { target: { value: "Aloy" } });
    expect(input.value).toBe("Aloy");
    fireEvent.change(input);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("forward required, id and other native attributes", () => {
    render(
      <ThemeField label="Email" htmlFor="ignored-when-child-has-id">
        <ThemeInput type="email" id="email" required autoComplete="email" />
      </ThemeField>,
    );
    const input = screen.getByLabelText("Email") as HTMLInputElement;
    expect(input.id).toBe("email");
    expect(input.required).toBe(true);
    expect(input.getAttribute("autocomplete")).toBe("email");
  });
});

describe("ThemeField", () => {
  it("names a group of controls when it wraps more than one", () => {
    render(<Sighting />);
    expect(screen.getByRole("group", { name: "Threat" })).toBeTruthy();
  });
});
