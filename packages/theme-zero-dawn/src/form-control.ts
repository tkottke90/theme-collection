import { LitElement, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";

/**
 * Base for the theme's form controls (Input, Select, Textarea).
 *
 * Each control wraps a native element inside its shadow root, which a
 * surrounding `<form>` can't see. Making the host a form-associated custom
 * element fixes that: it submits under its `name`, takes part in form reset
 * and `<fieldset disabled>`, and is labelable, so `<label for>` and wrapping
 * `<label>`s work.
 *
 * `ElementInternals` is missing in some environments (e.g. jsdom); there the
 * control still renders and tracks its value, it just can't join a form.
 */
export abstract class FormControlElement extends LitElement {
  static formAssociated = true;

  /** Focusing the host (e.g. from a label) focuses the inner control. */
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: String, reflect: true }) name = "";
  /** The control's own disabled state (the `disabled` attribute). */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * The disabled state the browser reports through `formDisabledCallback`:
   * the control's own attribute or a `<fieldset disabled>` ancestor. Kept
   * apart from `disabled`: copying it onto the attribute would make the
   * control disable itself, and the browser would then never report the
   * fieldset re-enabling.
   */
  @state() private inheritedDisabled = false;

  /** Whether the control is disabled for any reason; render from this. */
  protected get isDisabled(): boolean {
    return this.disabled || this.inheritedDisabled;
  }

  protected readonly internals: ElementInternals | null;

  constructor() {
    super();
    this.internals = typeof this.attachInternals === "function" ? this.attachInternals() : null;
  }

  /** The form this control belongs to, if any. */
  get form(): HTMLFormElement | null {
    return this.internals?.form ?? null;
  }

  /** Value to submit, or `null` to submit nothing (e.g. an unchecked box). */
  protected abstract formValue(): string | null;

  /** Restore the value the control started with (form reset). */
  protected abstract restoreDefault(): void;

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    this.internals?.setFormValue(this.formValue());
  }

  formResetCallback(): void {
    this.restoreDefault();
  }

  formDisabledCallback(disabled: boolean): void {
    this.inheritedDisabled = disabled;
    this.toggleAttribute("data-disabled", disabled);
  }

  /**
   * Re-fire `change` from the host: the native event isn't composed, so it
   * never crosses the shadow boundary on its own.
   */
  protected emitChange(): void {
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }
}
