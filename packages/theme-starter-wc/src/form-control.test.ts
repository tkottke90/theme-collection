import "./theme-input.js";
import "./theme-select.js";
import "./theme-textarea.js";
import type { ThemeInput } from "./theme-input.js";
import type { ThemeSelect } from "./theme-select.js";
import type { ThemeTextarea } from "./theme-textarea.js";

/** jsdom has no ElementInternals, so read the value a form would receive directly. */
type FormLike = {
  formValue(): string | null;
  formResetCallback(): void;
  formDisabledCallback(d: boolean): void;
};
const asForm = (el: HTMLElement) => el as unknown as FormLike;

async function mount<T extends HTMLElement & { updateComplete: Promise<unknown> }>(html: string) {
  const wrap = document.createElement("div");
  wrap.innerHTML = html;
  document.body.appendChild(wrap);
  const el = wrap.firstElementChild as T;
  await el.updateComplete;
  return { el, wrap };
}

describe("form-associated controls", () => {
  it("declare themselves form-associated", () => {
    for (const tag of ["theme-input", "theme-select", "theme-textarea"]) {
      const ctor = customElements.get(tag) as unknown as { formAssociated?: boolean };
      expect(ctor.formAssociated).toBe(true);
    }
  });

  it("text input: tracks typing, submits its value, resets to the markup value", async () => {
    const { el, wrap } = await mount<ThemeInput>(
      '<theme-input name="n" value="Ada"></theme-input>',
    );
    const input = el.shadowRoot!.querySelector("input")!;
    input.value = "Grace";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;
    expect(el.value).toBe("Grace");
    expect(asForm(el).formValue()).toBe("Grace");

    asForm(el).formResetCallback();
    await el.updateComplete;
    expect(el.value).toBe("Ada");
    wrap.remove();
  });

  it("checkbox: submits value only when checked, re-fires change, resets", async () => {
    const { el, wrap } = await mount<ThemeInput>(
      '<theme-input type="checkbox" name="c" value="yes"></theme-input>',
    );
    const changes = jest.fn();
    el.addEventListener("change", changes);
    expect(asForm(el).formValue()).toBeNull();

    el.shadowRoot!.querySelector("input")!.click();
    await el.updateComplete;
    expect(el.checked).toBe(true);
    expect(asForm(el).formValue()).toBe("yes");
    expect(changes).toHaveBeenCalledTimes(1);

    asForm(el).formResetCallback();
    await el.updateComplete;
    expect(el.checked).toBe(false);
    wrap.remove();
  });

  it("checkbox: a label click on the host toggles it; a click on the box isn't doubled", async () => {
    const { el, wrap } = await mount<ThemeInput>('<theme-input type="checkbox"></theme-input>');
    el.click(); // what a <label> does to its control
    await el.updateComplete;
    expect(el.checked).toBe(true);

    el.shadowRoot!.querySelector("input")!.click(); // click on the box itself
    await el.updateComplete;
    expect(el.checked).toBe(false);
    wrap.remove();
  });

  it("disabled by a fieldset without taking on its own disabled attribute", async () => {
    const { el, wrap } = await mount<ThemeInput>('<theme-input name="n"></theme-input>');
    asForm(el).formDisabledCallback(true);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("input")!.disabled).toBe(true);
    expect(el.hasAttribute("disabled")).toBe(false);

    asForm(el).formDisabledCallback(false);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("input")!.disabled).toBe(false);
    wrap.remove();
  });

  it("disabled attribute disables each control's inner element", async () => {
    for (const html of [
      "<theme-input disabled></theme-input>",
      "<theme-select disabled><option>A</option></theme-select>",
      "<theme-textarea disabled></theme-textarea>",
    ]) {
      const { el, wrap } = await mount<ThemeInput>(html);
      const inner = el.shadowRoot!.querySelector<HTMLInputElement>("input, select, textarea")!;
      expect(inner.disabled).toBe(true);
      wrap.remove();
    }
  });

  it("text input and textarea re-fire change from the host", async () => {
    for (const html of ["<theme-input></theme-input>", "<theme-textarea></theme-textarea>"]) {
      const { el, wrap } = await mount<ThemeInput>(html);
      const onChange = jest.fn((e: Event) => e.composed && e.bubbles);
      el.addEventListener("change", onChange);
      el.shadowRoot!.querySelector("input, textarea")!.dispatchEvent(new Event("change"));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.results[0]!.value).toBe(true);
      wrap.remove();
    }
  });

  it("select: submits the chosen option and resets to the markup default", async () => {
    const { el, wrap } = await mount<ThemeSelect>(
      '<theme-select name="s"><option value="a">A</option><option value="b" selected>B</option></theme-select>',
    );
    expect(asForm(el).formValue()).toBe("b");
    const select = el.shadowRoot!.querySelector("select")!;
    select.value = "a";
    select.dispatchEvent(new Event("change"));
    await el.updateComplete;
    expect(asForm(el).formValue()).toBe("a");

    asForm(el).formResetCallback();
    await el.updateComplete;
    expect(el.value).toBe("b");
    wrap.remove();
  });

  it("textarea: tracks typing and resets", async () => {
    const { el, wrap } = await mount<ThemeTextarea>('<theme-textarea name="t"></theme-textarea>');
    const ta = el.shadowRoot!.querySelector("textarea")!;
    ta.value = "Hello";
    ta.dispatchEvent(new Event("input"));
    await el.updateComplete;
    expect(asForm(el).formValue()).toBe("Hello");
    asForm(el).formResetCallback();
    await el.updateComplete;
    expect(el.value).toBe("");
    wrap.remove();
  });
});

describe("accessible names", () => {
  it("forward the host's aria-label to the inner native element", async () => {
    for (const html of [
      '<theme-input aria-label="Name"></theme-input>',
      '<theme-input type="checkbox" aria-label="Subscribe"></theme-input>',
      '<theme-select aria-label="Plan"><option>A</option></theme-select>',
      '<theme-textarea aria-label="Notes"></theme-textarea>',
    ]) {
      const { el, wrap } = await mount<ThemeInput>(html);
      const inner = el.shadowRoot!.querySelector("input, select, textarea")!;
      expect(inner.getAttribute("aria-label")).toBe(el.getAttribute("aria-label"));
      wrap.remove();
    }
  });

  it("follow aria-label changes and leave the inner element unnamed without one", async () => {
    const { el, wrap } = await mount<ThemeInput>("<theme-input></theme-input>");
    const inner = el.shadowRoot!.querySelector("input")!;
    expect(inner.hasAttribute("aria-label")).toBe(false);
    el.setAttribute("aria-label", "Renamed");
    await el.updateComplete;
    expect(inner.getAttribute("aria-label")).toBe("Renamed");
    wrap.remove();
  });
});
