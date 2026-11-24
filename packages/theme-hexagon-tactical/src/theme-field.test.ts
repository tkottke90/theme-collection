import "./theme-field.js";
import "./theme-input.js";
import type { ThemeField } from "./theme-field.js";
import type { ThemeInput } from "./theme-input.js";

async function mount(html: string) {
  const wrap = document.createElement("div");
  wrap.innerHTML = html;
  document.body.appendChild(wrap);
  const field = wrap.querySelector("theme-field") as ThemeField;
  await field.updateComplete;
  // slotchange is async; let it run.
  await new Promise((r) => setTimeout(r, 0));
  await field.updateComplete;
  return { field, wrap };
}

describe("theme-field", () => {
  it("renders the label text", async () => {
    const { field, wrap } = await mount('<theme-field label="Email address"></theme-field>');
    expect(field.shadowRoot?.querySelector("label")?.textContent?.trim()).toBe("Email address");
    wrap.remove();
  });

  it("names the slotted theme control with its label, and the control forwards it inward", async () => {
    const { field, wrap } = await mount(
      '<theme-field label="Email"><theme-input id="m"></theme-input></theme-field>',
    );
    const input = wrap.querySelector("theme-input") as ThemeInput;
    await input.updateComplete;
    expect(field.labelledControl).toBe(input);
    expect(input.getAttribute("aria-label")).toBe("Email");
    expect(input.shadowRoot?.querySelector("input")?.getAttribute("aria-label")).toBe("Email");
    wrap.remove();
  });

  it("names a native control, including one inside a slotted wrapper", async () => {
    const { wrap } = await mount(
      '<theme-field label="Notes"><div><textarea></textarea></div></theme-field>',
    );
    expect(wrap.querySelector("textarea")?.getAttribute("aria-label")).toBe("Notes");
    wrap.remove();
  });

  it("uses the control named by `for` when given", async () => {
    const { wrap } = await mount(`
      <theme-field label="Second" for="two"><input id="one" /><input id="two" /></theme-field>`);
    expect(wrap.querySelector("#two")?.getAttribute("aria-label")).toBe("Second");
    expect(wrap.querySelector("#one")?.hasAttribute("aria-label")).toBe(false);
    wrap.remove();
  });

  it("never overrides a name the consumer gave the control", async () => {
    const { wrap } = await mount(
      '<theme-field label="Field"><input aria-label="Mine" /></theme-field>',
    );
    expect(wrap.querySelector("input")?.getAttribute("aria-label")).toBe("Mine");
    wrap.remove();
  });

  it("keeps the name in step with the label, and removes it when the control leaves", async () => {
    const { field, wrap } = await mount('<theme-field label="Old"><input /></theme-field>');
    const input = wrap.querySelector("input")!;
    field.label = "New";
    await field.updateComplete;
    expect(input.getAttribute("aria-label")).toBe("New");

    document.body.appendChild(input);
    await new Promise((r) => setTimeout(r, 0));
    expect(input.hasAttribute("aria-label")).toBe(false);
    input.remove();
    wrap.remove();
  });

  it("focuses the control when the label is clicked, and toggles a checkbox", async () => {
    const { field, wrap } = await mount('<theme-field label="Name"><input id="n" /></theme-field>');
    field.shadowRoot!.querySelector("label")!.click();
    expect(document.activeElement).toBe(wrap.querySelector("#n"));
    wrap.remove();

    const box = await mount(
      '<theme-field label="Subscribe"><input type="checkbox" /></theme-field>',
    );
    box.field.shadowRoot!.querySelector("label")!.click();
    expect((box.wrap.querySelector("input") as HTMLInputElement).checked).toBe(true);
    box.wrap.remove();
  });
});
