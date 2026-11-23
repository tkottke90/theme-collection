import "./theme-field.js";
import "./theme-input.js";
import "./theme-select.js";
import type { ThemeField } from "./theme-field.js";
import type { ThemeInput } from "./theme-input.js";

/** Lets the slot's slotchange fire and the control re-render. */
const settle = async (el: ThemeField) => {
  await el.updateComplete;
  await new Promise((r) => setTimeout(r));
  for (const child of el.querySelectorAll("*")) {
    await (child as Partial<ThemeInput>).updateComplete;
  }
};

const mount = (html: string, label = "Email address") => {
  const el = document.createElement("theme-field") as ThemeField;
  el.label = label;
  el.innerHTML = html;
  document.body.appendChild(el);
  return el;
};

describe("theme-field", () => {
  it("renders the label text", async () => {
    const el = mount('<theme-input type="email"></theme-input>');
    await settle(el);

    expect(el.shadowRoot?.querySelector("label")?.textContent?.trim()).toBe("Email address");

    el.remove();
  });

  it("names the slotted theme control with the label", async () => {
    const el = mount('<theme-input type="email"></theme-input>');
    await settle(el);

    const input = el.querySelector("theme-input")!;
    expect(input.accessibleLabel).toBe("Email address");
    expect(input.shadowRoot!.querySelector("input")!.getAttribute("aria-label")).toBe(
      "Email address",
    );

    el.remove();
  });

  it("names a theme-select too", async () => {
    const el = mount('<theme-select><option value="1">One</option></theme-select>', "Clearance");
    await settle(el);

    const select = el.querySelector("theme-select")!;
    expect(select.shadowRoot!.querySelector("select")!.getAttribute("aria-label")).toBe(
      "Clearance",
    );

    el.remove();
  });

  it("gives a bare native input an aria-label, but keeps one it already has", async () => {
    const bare = mount("<input />");
    await settle(bare);
    expect(bare.querySelector("input")!.getAttribute("aria-label")).toBe("Email address");
    bare.remove();

    const named = mount('<input aria-label="Work email" />');
    await settle(named);
    expect(named.querySelector("input")!.getAttribute("aria-label")).toBe("Work email");
    named.remove();
  });

  it("picks the control named by for when there are several", async () => {
    const el = mount(
      '<theme-input id="first"></theme-input><theme-input id="second"></theme-input>',
    );
    el.for = "second";
    await settle(el);

    const [first, second] = [...el.querySelectorAll("theme-input")];
    expect(second!.accessibleLabel).toBe("Email address");
    expect(first!.accessibleLabel).toBeUndefined();

    el.remove();
  });

  it("updates the control's name when the label changes", async () => {
    const el = mount("<theme-input></theme-input>");
    await settle(el);

    el.label = "Contact email";
    await settle(el);

    expect(el.querySelector("theme-input")!.accessibleLabel).toBe("Contact email");

    el.remove();
  });

  it("focuses the control when the label is clicked", async () => {
    const el = mount("<theme-input></theme-input>");
    await settle(el);
    const input = el.querySelector("theme-input")!;
    const focus = jest.spyOn(input, "focus");

    el.shadowRoot!.querySelector("label")!.click();

    expect(focus).toHaveBeenCalled();

    el.remove();
  });
});
