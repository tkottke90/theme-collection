import { LitElement, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";

/** A label's text, skipping anything inside `control` (e.g. a wrapped select's options). */
function textOutside(label: Node, control: Node): string {
  let text = "";
  const walker = document.createTreeWalker(label, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!control.contains(node)) text += node.textContent ?? "";
  }
  return text.replace(/\s+/g, " ").trim();
}

/**
 * Base for every theme's form controls (Input, Select, Textarea).
 *
 * Shared by all Web Component packages: each one's build copies this file
 * into its own `src/generated/core/` (see `scripts/wc-core.mjs`), so it's
 * bundled into the package, never a runtime dependency.
 *
 * Each control wraps a native element inside its shadow root, which a
 * surrounding `<form>` can't see. Making the host a form-associated custom
 * element fixes that: it submits under its `name`, takes part in form reset
 * and `<fieldset disabled>`, and is labelable, so `<label for>` and wrapping
 * `<label>`s work.
 *
 * Labels attach to the host, but assistive technology reads the native
 * element inside the shadow root, which a label can't reach. So each control
 * resolves its accessible name (see `accessibleName`) and puts it on that
 * inner element.
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

  /**
   * The host's `aria-label`. Read here and forwarded to the inner element
   * (`theme-field` also sets it to name the control it wraps).
   */
  @property({ attribute: "aria-label" }) accessibleLabel: string | null = null;

  protected readonly internals: ElementInternals | null;

  /**
   * The name assistive technology should announce: the host's `aria-label`,
   * else the text of the `<label>` elements associated with the host (via
   * `for` or by wrapping it), excluding text inside the control itself so a
   * wrapped select doesn't read out its own options.
   */
  protected get accessibleName(): string | undefined {
    const own = this.accessibleLabel?.trim();
    if (own) return own;
    const labels = this.internals?.labels;
    if (!labels?.length) return undefined;
    const text = Array.from(labels)
      .map((label) => textOutside(label, this))
      .filter(Boolean)
      .join(" ");
    return text || undefined;
  }

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
