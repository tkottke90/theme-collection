import "./theme-field.js";
import "./theme-input.js";
import type { ThemeField } from "./theme-field.js";
import type { ThemeInput } from "./theme-input.js";

async function mount(inner: string, label = "Email address"): Promise<ThemeField> {
  const el = document.createElement("theme-field") as ThemeField;
  el.label = label;
  el.innerHTML = inner;
  document.body.appendChild(el);
  await el.updateComplete;
  // slotchange fires asynchronously
  await new Promise((r) => setTimeout(r));
  return el;
}

describe("theme-field", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders the label", async () => {
    const el = await mount("<theme-input></theme-input>");
    expect(el.shadowRoot?.querySelector("label")?.textContent?.trim()).toBe("Email address");
  });

  it("names a slotted theme control through accessibleLabel", async () => {
    const el = await mount("<theme-input></theme-input>");
    const input = el.querySelector("theme-input") as ThemeInput;
    await input.updateComplete;
    expect(input.accessibleLabel).toBe("Email address");
    expect(input.shadowRoot?.querySelector("input")?.getAttribute("aria-label")).toBe(
      "Email address",
    );
  });

  it("names a bare native control with aria-label and follows label changes", async () => {
    const el = await mount("<input />");
    const input = el.querySelector("input")!;
    expect(input.getAttribute("aria-label")).toBe("Email address");

    el.label = "Work email";
    await el.updateComplete;
    expect(input.getAttribute("aria-label")).toBe("Work email");
  });

  it("leaves a name the consumer set alone", async () => {
    const el = await mount('<input aria-label="Mine" />');
    expect(el.querySelector("input")?.getAttribute("aria-label")).toBe("Mine");
  });

  it("labels the control matching `for` when there are several", async () => {
    const el = document.createElement("theme-field") as ThemeField;
    el.label = "Second";
    el.for = "b";
    el.innerHTML = '<div><input id="a" /><input id="b" /></div>';
    document.body.appendChild(el);
    await el.updateComplete;
    await new Promise((r) => setTimeout(r));
    expect(el.labelledControl?.id).toBe("b");
    expect(el.querySelector("#a")?.hasAttribute("aria-label")).toBe(false);
  });

  it("removes its name when the control is taken out", async () => {
    const el = await mount("<input />");
    const input = el.querySelector("input")!;
    input.remove();
    await new Promise((r) => setTimeout(r));
    expect(input.hasAttribute("aria-label")).toBe(false);
  });

  it("focuses the control when the label is clicked", async () => {
    const el = await mount("<input />");
    el.shadowRoot?.querySelector("label")?.click();
    expect(document.activeElement).toBe(el.querySelector("input"));
  });
});
