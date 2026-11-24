import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { FieldElement } from "./field.js";

@customElement("test-field")
class TestField extends FieldElement {
  render() {
    return html`<label @click=${this.onLabelClick}>${this.label}</label
      ><slot @slotchange=${this.link}></slot>`;
  }
}

async function mount(markup: string) {
  const wrap = document.createElement("div");
  wrap.innerHTML = markup;
  document.body.appendChild(wrap);
  const field = wrap.querySelector("test-field") as TestField;
  await field.updateComplete;
  // slotchange is async; let it run.
  await new Promise((r) => setTimeout(r, 0));
  await field.updateComplete;
  return { field, wrap };
}

const tick = () => new Promise((r) => setTimeout(r, 0));

afterEach(() => {
  document.body.innerHTML = "";
});

describe("FieldElement", () => {
  it("names the first slotted control with its label", async () => {
    const { field, wrap } = await mount('<test-field label="Email"><input /></test-field>');
    const input = wrap.querySelector("input")!;
    expect(field.labelledControl).toBe(input);
    expect(input.getAttribute("aria-label")).toBe("Email");
  });

  it("names a theme control by its aria-label, even before it upgrades", async () => {
    const { wrap } = await mount(
      '<test-field label="Class"><theme-select></theme-select></test-field>',
    );
    expect(wrap.querySelector("theme-select")!.getAttribute("aria-label")).toBe("Class");
  });

  it("finds a control inside a slotted wrapper", async () => {
    const { wrap } = await mount(
      '<test-field label="Notes"><div><textarea></textarea></div></test-field>',
    );
    expect(wrap.querySelector("textarea")!.getAttribute("aria-label")).toBe("Notes");
  });

  it("uses the control named by `for`", async () => {
    const { wrap } = await mount(
      '<test-field label="Second" for="two"><input id="one" /><input id="two" /></test-field>',
    );
    expect(wrap.querySelector("#two")!.getAttribute("aria-label")).toBe("Second");
    expect(wrap.querySelector("#one")!.hasAttribute("aria-label")).toBe(false);
  });

  it("never overrides a name the consumer gave", async () => {
    const { wrap } = await mount(`
      <test-field label="Field"><input aria-label="Mine" /></test-field>
      <test-field label="Field"><input aria-labelledby="x" /></test-field>`);
    const [a, b] = Array.from(wrap.querySelectorAll("input"));
    expect(a!.getAttribute("aria-label")).toBe("Mine");
    expect(b!.hasAttribute("aria-label")).toBe(false);
  });

  it("follows label changes and removes its name when the label is cleared", async () => {
    const { field, wrap } = await mount('<test-field label="Old"><input /></test-field>');
    const input = wrap.querySelector("input")!;
    field.label = "New";
    await field.updateComplete;
    expect(input.getAttribute("aria-label")).toBe("New");
    field.label = "  ";
    await field.updateComplete;
    expect(input.hasAttribute("aria-label")).toBe(false);
  });

  it("removes its name when the control leaves, or the field disconnects", async () => {
    const { wrap } = await mount('<test-field label="A"><input /></test-field>');
    const input = wrap.querySelector("input")!;
    document.body.appendChild(input);
    await tick();
    expect(input.hasAttribute("aria-label")).toBe(false);

    const second = await mount('<test-field label="B"><input /></test-field>');
    const inner = second.wrap.querySelector("input")!;
    second.field.remove();
    expect(inner.hasAttribute("aria-label")).toBe(false);
  });

  it("focuses the control on label click, and toggles a checkbox", async () => {
    const text = await mount('<test-field label="Name"><input /></test-field>');
    text.field.shadowRoot!.querySelector("label")!.click();
    expect(document.activeElement).toBe(text.wrap.querySelector("input"));

    const box = await mount('<test-field label="Core"><input type="checkbox" /></test-field>');
    box.field.shadowRoot!.querySelector("label")!.click();
    expect(box.wrap.querySelector("input")!.checked).toBe(true);
  });
});
