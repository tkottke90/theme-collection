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
    input.value = "Aloy";
    input.dispatchEvent(new Event("input"));
    await el.updateComplete;
    expect(el.value).toBe("Aloy");
    expect(asForm(el).formValue()).toBe("Aloy");

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
    ta.value = "Seams";
    ta.dispatchEvent(new Event("input"));
    await el.updateComplete;
    expect(asForm(el).formValue()).toBe("Seams");
    asForm(el).formResetCallback();
    await el.updateComplete;
    expect(el.value).toBe("");
    wrap.remove();
  });
});
