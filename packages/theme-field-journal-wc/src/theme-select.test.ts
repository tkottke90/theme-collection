import "./theme-select.js";
import type { ThemeSelect } from "./theme-select.js";

async function mount(options: string): Promise<ThemeSelect> {
  const el = document.createElement("theme-select") as ThemeSelect;
  el.innerHTML = options;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const inner = (el: ThemeSelect) => el.shadowRoot!.querySelector("select")!;

describe("theme-select", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("mirrors light-DOM options into the shadow select", async () => {
    const el = await mount('<option value="one">One</option><option value="two">Two</option>');
    const options = [...inner(el).options].map((o) => [o.value, o.textContent?.trim()]);
    expect(options).toEqual([
      ["one", "One"],
      ["two", "Two"],
    ]);
  });

  it("defaults value to the selected option, else the first", async () => {
    expect((await mount('<option value="a">A</option><option value="b">B</option>')).value).toBe(
      "a",
    );
    const el = await mount('<option value="a">A</option><option value="b" selected>B</option>');
    expect(el.value).toBe("b");
    expect(inner(el).value).toBe("b");
  });

  it("keeps the mirror in sync when options change", async () => {
    const el = await mount('<option value="a">A</option>');
    el.insertAdjacentHTML("beforeend", '<option value="b">B</option>');
    await new Promise((r) => setTimeout(r));
    await el.updateComplete;
    expect(inner(el).options).toHaveLength(2);
  });

  it("updates value and fires a composed change event on selection", async () => {
    const el = await mount('<option value="a">A</option><option value="b">B</option>');
    const onChange = jest.fn((e: Event) => e.composed);
    el.addEventListener("change", onChange);
    inner(el).value = "b";
    inner(el).dispatchEvent(new Event("change"));
    expect(el.value).toBe("b");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.results[0]!.value).toBe(true);
  });

  it("forwards the host's aria-label to the inner select", async () => {
    const el = await mount('<option value="a">A</option>');
    el.setAttribute("aria-label", "Squad");
    await el.updateComplete;
    expect(inner(el).getAttribute("aria-label")).toBe("Squad");
  });
});
