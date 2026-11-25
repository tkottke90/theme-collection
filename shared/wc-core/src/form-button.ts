import { property } from "lit/decorators.js";
import { FormControlElement } from "./form-control.js";

export type ButtonType = "button" | "submit" | "reset";

/**
 * Base for every theme's `theme-button`.
 *
 * The native `<button>` lives inside the shadow root, so a surrounding
 * `<form>` can't see it. Like the other controls (see `FormControlElement`)
 * the host is form-associated instead, and it does what a native button
 * does: `type="submit"` submits the owning form (through `requestSubmit()`,
 * so validation and `submit` listeners run), `type="reset"` resets it, and
 * `"button"` (the default) does neither. It follows `<fieldset disabled>`
 * and is named by the host's `aria-label` or associated `<label>`s.
 *
 * Subclasses only render: put `this.accessibleName` on the inner `<button>`
 * as `aria-label` and `this.isDisabled` on its `disabled`.
 *
 * Unlike a native button, calling `preventDefault()` on the click doesn't
 * stop the submit/reset: the host's own listener runs first.
 */
export abstract class FormButtonElement extends FormControlElement {
  @property({ type: String, reflect: true }) type: ButtonType = "button";

  constructor() {
    super();
    this.addEventListener("click", this.handleClick);
  }

  /** A button submits no value of its own. */
  protected formValue(): string | null {
    return null;
  }

  /** Nothing to restore: a button has no value. */
  protected restoreDefault(): void {}

  private readonly handleClick = (): void => {
    if (this.isDisabled) return;
    const form = this.form;
    if (!form) return;
    if (this.type === "submit") form.requestSubmit();
    else if (this.type === "reset") form.reset();
  };
}
