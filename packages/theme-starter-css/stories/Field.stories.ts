import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Starter CSS/Field",
  parameters: {
    intro: {
      tag: ".theme-field",
      title: "Field",
      description: [
        "A field stacks a label over its control: use label for and a matching id. As a fieldset with a legend it groups checkboxes or radios that share a name, each wrapped in a theme-field__option label, and fieldset disabled turns off every control inside it.",
        "When you copy the starter, describe your label style, how hints and errors are shown, and how grouped options are laid out.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="field-email">Email address</label>
      <input class="theme-input" type="email" id="field-email" name="email" placeholder="you@example.com" />
    </div>
  `,
};

export const WithHint: Story = {
  render: () => `
    <div class="theme-field">
      <label for="field-username">Username</label>
      <input class="theme-input" type="text" id="field-username" name="username" aria-describedby="field-username-hint" />
      <p class="theme-text theme-text--caption" id="field-username-hint">Letters and numbers only.</p>
    </div>
  `,
};

export const Invalid: Story = {
  render: () => `
    <div class="theme-field">
      <label for="field-invalid">Email address</label>
      <input class="theme-input" type="email" id="field-invalid" name="email" value="not-an-email" aria-invalid="true" aria-describedby="field-invalid-error" />
      <p class="theme-text theme-text--caption" id="field-invalid-error">Enter an email address like you@example.com.</p>
    </div>
  `,
};

export const CheckboxGroup: Story = {
  render: () => `
    <fieldset class="theme-field">
      <legend>Notify me about</legend>
      <label class="theme-field__option">
        <input class="theme-input" type="checkbox" name="topics" value="releases" checked />
        Releases
      </label>
      <label class="theme-field__option">
        <input class="theme-input" type="checkbox" name="topics" value="security" />
        Security advisories
      </label>
    </fieldset>
  `,
};

export const RadioGroup: Story = {
  render: () => `
    <fieldset class="theme-field">
      <legend>Plan</legend>
      <label class="theme-field__option">
        <input class="theme-input" type="radio" name="plan" value="free" checked />
        Free
      </label>
      <label class="theme-field__option">
        <input class="theme-input" type="radio" name="plan" value="pro" />
        Pro
      </label>
    </fieldset>
  `,
};

export const DisabledFieldset: Story = {
  render: () => `
    <fieldset class="theme-field" disabled>
      <legend>Delivery (unavailable)</legend>
      <label class="theme-field__option">
        <input class="theme-input" type="radio" name="delivery" value="standard" checked />
        Standard
      </label>
      <label class="theme-field__option">
        <input class="theme-input" type="radio" name="delivery" value="express" />
        Express
      </label>
    </fieldset>
  `,
};
