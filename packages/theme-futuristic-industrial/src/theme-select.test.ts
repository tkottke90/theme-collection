import "./theme-select.js";
import type { ThemeSelect } from "./theme-select.js";

const shadowOptions = (el: ThemeSelect) =>
  [...el.shadowRoot!.querySelectorAll("option")].map((o) => o.textContent?.trim());

describe("theme-select", () => {
  it("renders a select element in its shadow DOM", async () => {
    const el = document.createElement("theme-select") as ThemeSelect;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector("select")).not.toBeNull();

    el.remove();
  });

  it("mirrors light-DOM options into the shadow select", async () => {
    const el = document.createElement("theme-select") as ThemeSelect;
    el.innerHTML = '<option value="one">One</option><option value="two">Two</option>';
    document.body.appendChild(el);
    await el.updateComplete;

    expect(shadowOptions(el)).toEqual(["One", "Two"]);

    el.remove();
  });

  it("starts on the option marked selected, else the first", async () => {
    const el = document.createElement("theme-select") as ThemeSelect;
    el.innerHTML = '<option value="one">One</option><option value="two" selected>Two</option>';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.value).toBe("two");
    el.remove();

    const plain = document.createElement("theme-select") as ThemeSelect;
    plain.innerHTML = '<option value="one">One</option><option value="two">Two</option>';
    document.body.appendChild(plain);
    await plain.updateComplete;
    expect(plain.value).toBe("one");
    plain.remove();
  });

  it("picks up options added later", async () => {
    const el = document.createElement("theme-select") as ThemeSelect;
    document.body.appendChild(el);
    await el.updateComplete;

    el.innerHTML = '<option value="late">Late</option>';
    await new Promise((r) => setTimeout(r));
    await el.updateComplete;

    expect(shadowOptions(el)).toEqual(["Late"]);
    expect(el.value).toBe("late");

    el.remove();
  });

  it("updates value and fires a composed change event on selection", async () => {
    const el = document.createElement("theme-select") as ThemeSelect;
    el.innerHTML = '<option value="one">One</option><option value="two">Two</option>';
    document.body.appendChild(el);
    await el.updateComplete;
    const onChange = jest.fn();
    document.body.addEventListener("change", onChange);

    const select = el.shadowRoot!.querySelector("select")!;
    select.value = "two";
    select.dispatchEvent(new Event("change"));

    expect(el.value).toBe("two");
    expect(onChange).toHaveBeenCalledTimes(1);

    document.body.removeEventListener("change", onChange);
    el.remove();
  });
});
