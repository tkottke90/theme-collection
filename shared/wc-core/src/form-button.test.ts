import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormButtonElement } from "./form-button.js";

@customElement("test-button")
class TestButton extends FormButtonElement {
  render() {
    return html`<button aria-label=${ifDefined(this.accessibleName)} ?disabled=${this.isDisabled}>
      <slot></slot>
    </button>`;
  }
}

interface FakeInternals {
  setFormValue: jest.Mock;
  form: HTMLFormElement | null;
  labels: HTMLLabelElement[];
}

/** jsdom has no ElementInternals; this fake supplies the form the button belongs to. */
@customElement("test-button-internals")
class TestButtonWithInternals extends TestButton {
  static lastInternals: FakeInternals;

  attachInternals(): ElementInternals {
    const fake: FakeInternals = { setFormValue: jest.fn(), form: null, labels: [] };
    TestButtonWithInternals.lastInternals = fake;
    return fake as unknown as ElementInternals;
  }
}

async function mount(attrs = "") {
  const form = document.createElement("form");
  form.requestSubmit = jest.fn();
  form.reset = jest.fn();
  form.innerHTML = `<test-button-internals ${attrs}>Go</test-button-internals>`;
  document.body.appendChild(form);
  const el = form.firstElementChild as TestButtonWithInternals;
  TestButtonWithInternals.lastInternals.form = form;
  await el.updateComplete;
  return { el, form };
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("FormButtonElement", () => {
  it("is form-associated and defaults to type button", () => {
    expect(TestButton.formAssociated).toBe(true);
    expect(new TestButton().type).toBe("button");
  });

  it("submits the form on click when type is submit", async () => {
    const { el, form } = await mount('type="submit"');
    el.click();
    expect(form.requestSubmit).toHaveBeenCalledTimes(1);
    expect(form.reset).not.toHaveBeenCalled();
  });

  it("resets the form on click when type is reset", async () => {
    const { el, form } = await mount('type="reset"');
    el.click();
    expect(form.reset).toHaveBeenCalledTimes(1);
    expect(form.requestSubmit).not.toHaveBeenCalled();
  });

  it.each(["", 'type="button"', 'type="bogus"'])("does nothing for %s", async (attrs) => {
    const { el, form } = await mount(attrs);
    el.click();
    expect(form.requestSubmit).not.toHaveBeenCalled();
    expect(form.reset).not.toHaveBeenCalled();
  });

  it("does nothing outside a form", async () => {
    const el = document.createElement("test-button") as TestButton;
    el.type = "submit";
    document.body.appendChild(el);
    await el.updateComplete;
    expect(() => el.click()).not.toThrow();
  });

  it("does nothing while disabled, by attribute or by fieldset", async () => {
    const { el, form } = await mount('type="submit" disabled');
    el.click();
    el.removeAttribute("disabled");
    el.formDisabledCallback(true);
    await el.updateComplete;
    el.click();
    expect(form.requestSubmit).not.toHaveBeenCalled();

    el.formDisabledCallback(false);
    await el.updateComplete;
    el.click();
    expect(form.requestSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables the inner button for a fieldset, then re-enables it", async () => {
    const { el } = await mount();
    const inner = el.shadowRoot!.querySelector("button")!;
    el.formDisabledCallback(true);
    await el.updateComplete;
    expect(inner.disabled).toBe(true);
    el.formDisabledCallback(false);
    await el.updateComplete;
    expect(inner.disabled).toBe(false);
  });

  it("names the inner button from the host's aria-label", async () => {
    const { el } = await mount('aria-label="Play"');
    expect(el.shadowRoot!.querySelector("button")!.getAttribute("aria-label")).toBe("Play");
  });

  it("submits no form value", async () => {
    await mount('type="submit"');
    expect(TestButtonWithInternals.lastInternals.setFormValue).toHaveBeenLastCalledWith(null);
  });
});
