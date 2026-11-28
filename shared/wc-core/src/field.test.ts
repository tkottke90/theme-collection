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

  describe("radios", () => {
    const GROUP = `<test-field label="Threat"><div>
      <label><input type="radio" name="t" value="low" />Low</label>
      <label><input type="radio" name="t" value="high" checked />High</label>
    </div></test-field>`;

    it("labels the radios' wrapper as a radiogroup, never a radio", async () => {
      const { field, wrap } = await mount(GROUP);
      const group = wrap.querySelector("div")!;
      expect(field.labelledControl).toBe(group);
      expect(group.getAttribute("role")).toBe("radiogroup");
      expect(group.getAttribute("aria-label")).toBe("Threat");
      for (const radio of wrap.querySelectorAll("input")) {
        expect(radio.hasAttribute("aria-label")).toBe(false);
      }
    });

    it("finds theme-input radios too", async () => {
      const { wrap } = await mount(
        '<test-field label="Plan"><div><theme-input type="radio" name="p"></theme-input></div></test-field>',
      );
      expect(wrap.querySelector("div")!.getAttribute("role")).toBe("radiogroup");
      expect(wrap.querySelector("theme-input")!.hasAttribute("aria-label")).toBe(false);
    });

    it("keeps a role the consumer set, and removes only what it added", async () => {
      const { field, wrap } = await mount(
        '<test-field label="A"><div role="group"><input type="radio" /></div></test-field>',
      );
      const group = wrap.querySelector("div")!;
      expect(group.getAttribute("role")).toBe("group");
      field.remove();
      expect(group.getAttribute("role")).toBe("group");
      expect(group.hasAttribute("aria-label")).toBe(false);

      const other = await mount(GROUP);
      const div = other.wrap.querySelector("div")!;
      other.field.label = "";
      await other.field.updateComplete;
      expect(div.hasAttribute("role")).toBe(false);
      expect(div.hasAttribute("aria-label")).toBe(false);
    });

    it("names nothing when radios have no wrapper to stand for the group", async () => {
      for (const markup of [
        '<test-field label="A"><input type="radio" /><input type="radio" /></test-field>',
        '<test-field label="A"><label><input type="radio" />One</label></test-field>',
      ]) {
        const { field, wrap } = await mount(markup);
        expect(field.labelledControl).toBeNull();
        expect(wrap.querySelector("[aria-label]")).toBeNull();
      }
    });

    it("focuses the checked radio on label click without changing the selection", async () => {
      const { field, wrap } = await mount(GROUP);
      field.shadowRoot!.querySelector("label")!.click();
      const [low, high] = wrap.querySelectorAll("input");
      expect(document.activeElement).toBe(high);
      expect(low!.checked).toBe(false);
      expect(high!.checked).toBe(true);
    });

    it("still names a single radio picked out with `for`", async () => {
      const { wrap } = await mount(
        '<test-field label="Only" for="r"><input id="r" type="radio" /></test-field>',
      );
      expect(wrap.querySelector("#r")!.getAttribute("aria-label")).toBe("Only");
    });
  });
});
