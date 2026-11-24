import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { FormControlElement } from "./form-control.js";

/** A minimal control: one native input, submitting its value (nothing when empty). */
@customElement("test-control")
class TestControl extends FormControlElement {
  @property({ type: String }) value = "";
  private defaultValue = "";

  connectedCallback(): void {
    super.connectedCallback();
    this.defaultValue = this.getAttribute("value") ?? "";
  }

  formValue(): string | null {
    return this.value || null;
  }

  protected restoreDefault(): void {
    this.value = this.defaultValue;
  }

  get name_(): string | undefined {
    return this.accessibleName;
  }

  get disabled_(): boolean {
    return this.isDisabled;
  }

  fireChange(): void {
    this.emitChange();
  }

  render() {
    return html`<input
      .value=${this.value}
      ?disabled=${this.isDisabled}
      aria-label=${ifDefined(this.accessibleName)}
    />`;
  }
}

/** jsdom has no ElementInternals; this fake records what a form would see. */
interface FakeInternals {
  setFormValue: jest.Mock;
  form: HTMLFormElement | null;
  labels: HTMLLabelElement[];
}

/** The same control, with a fake `attachInternals` so the form path runs. */
@customElement("test-control-internals")
class TestControlWithInternals extends TestControl {
  static lastInternals: FakeInternals;

  attachInternals(): ElementInternals {
    const fake: FakeInternals = { setFormValue: jest.fn(), form: null, labels: [] };
    TestControlWithInternals.lastInternals = fake;
    return fake as unknown as ElementInternals;
  }
}

async function mount<T extends TestControl>(markup: string) {
  const wrap = document.createElement("div");
  wrap.innerHTML = markup;
  document.body.appendChild(wrap);
  const el = wrap.querySelector("test-control, test-control-internals") as T;
  await el.updateComplete;
  return { el, wrap };
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("FormControlElement", () => {
  it("is form-associated and delegates focus", () => {
    expect(TestControl.formAssociated).toBe(true);
    expect(TestControl.shadowRootOptions.delegatesFocus).toBe(true);
  });

  it("renders without ElementInternals and reports no form", async () => {
    const { el } = await mount<TestControl>('<test-control value="a"></test-control>');
    expect(el.form).toBeNull();
    expect(el.shadowRoot!.querySelector("input")!.value).toBe("a");
  });

  it("pushes its value to the form after every update", async () => {
    const { el } = await mount<TestControl>(
      '<test-control-internals value="a"></test-control-internals>',
    );
    const internals = TestControlWithInternals.lastInternals;
    expect(internals.setFormValue).toHaveBeenLastCalledWith("a");
    el.value = "";
    await el.updateComplete;
    expect(internals.setFormValue).toHaveBeenLastCalledWith(null);
  });

  it("restores its default on form reset", async () => {
    const { el } = await mount<TestControl>('<test-control value="start"></test-control>');
    el.value = "changed";
    el.formResetCallback();
    await el.updateComplete;
    expect(el.value).toBe("start");
  });

  it("is disabled by its own attribute", async () => {
    const { el } = await mount<TestControl>("<test-control disabled></test-control>");
    expect(el.disabled_).toBe(true);
    expect(el.shadowRoot!.querySelector("input")!.disabled).toBe(true);
  });

  it("is disabled by a fieldset without taking on the disabled attribute", async () => {
    const { el } = await mount<TestControl>("<test-control></test-control>");
    el.formDisabledCallback(true);
    await el.updateComplete;
    expect(el.disabled_).toBe(true);
    expect(el.hasAttribute("disabled")).toBe(false);
    expect(el.hasAttribute("data-disabled")).toBe(true);

    el.formDisabledCallback(false);
    await el.updateComplete;
    expect(el.disabled_).toBe(false);
    expect(el.hasAttribute("data-disabled")).toBe(false);
  });

  it("re-fires change from the host, across the shadow boundary", async () => {
    const { el, wrap } = await mount<TestControl>("<test-control></test-control>");
    const seen = jest.fn();
    wrap.addEventListener("change", seen);
    el.fireChange();
    expect(seen).toHaveBeenCalledTimes(1);
    const event = seen.mock.calls[0][0] as Event;
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });
});

describe("FormControlElement accessible name", () => {
  it("uses the host's aria-label, trimmed, and forwards it inward", async () => {
    const { el } = await mount<TestControl>('<test-control aria-label="  Name  "></test-control>');
    expect(el.name_).toBe("Name");
    expect(el.shadowRoot!.querySelector("input")!.getAttribute("aria-label")).toBe("Name");
  });

  it("follows aria-label changes", async () => {
    const { el } = await mount<TestControl>("<test-control></test-control>");
    expect(el.shadowRoot!.querySelector("input")!.hasAttribute("aria-label")).toBe(false);
    el.setAttribute("aria-label", "Later");
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("input")!.getAttribute("aria-label")).toBe("Later");
  });

  it("falls back to associated labels, skipping text inside the control", async () => {
    const { el, wrap } = await mount<TestControl>(
      "<label>Pick <test-control-internals>ignored</test-control-internals> one</label><label>Also</label>",
    );
    TestControlWithInternals.lastInternals.labels = Array.from(wrap.querySelectorAll("label"));
    expect(el.name_).toBe("Pick one Also");
  });

  it("prefers aria-label over labels, and has no name with neither", async () => {
    const { el, wrap } = await mount<TestControl>(
      "<label>Label <test-control-internals></test-control-internals></label>",
    );
    expect(el.name_).toBeUndefined();
    TestControlWithInternals.lastInternals.labels = Array.from(wrap.querySelectorAll("label"));
    expect(el.name_).toBe("Label");
    el.setAttribute("aria-label", "Own");
    await el.updateComplete;
    expect(el.name_).toBe("Own");
  });
});
