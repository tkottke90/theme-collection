import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Forest Isle/Field",
  parameters: {
    intro: {
      tag: ".theme-field",
      title: "Field",
      description: [
        "Pairs a label with its control in a vertical stack. Labels are small, semibold and muted so the control, not the caption, is the focus. A field can also be a fieldset with a legend, which groups checkboxes or radios that share a name.",
        "Wrap a checkbox or radio in .theme-field__option to put it inline with its text. A disabled fieldset greys every label inside it.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="field-example">Email address</label>
      <input class="theme-input" type="email" id="field-example" name="email" placeholder="you@example.com" />
    </div>
  `,
};

export const WithHint: Story = {
  render: () => `
    <div class="theme-field">
      <label for="field-hint">Island name</label>
      <input class="theme-input" type="text" id="field-hint" name="island" aria-describedby="field-hint-text" />
      <p class="theme-text theme-text--caption" id="field-hint-text">Shown on the sign above the sidebar.</p>
    </div>
  `,
};

export const CheckboxGroup: Story = {
  render: () => `
    <fieldset class="theme-field">
      <legend>Notify me about</legend>
      <label class="theme-field__option">
        <input class="theme-input" type="checkbox" name="topics" value="harvest" checked />
        Harvest
      </label>
      <label class="theme-field__option">
        <input class="theme-input" type="checkbox" name="topics" value="visitors" />
        Visitors
      </label>
    </fieldset>
  `,
};

export const DisabledGroup: Story = {
  render: () => `
    <fieldset class="theme-field" disabled>
      <legend>Visibility</legend>
      <label class="theme-field__option">
        <input class="theme-input" type="radio" name="visibility" value="private" checked />
        Private
      </label>
      <label class="theme-field__option">
        <input class="theme-input" type="radio" name="visibility" value="public" />
        Public
      </label>
    </fieldset>
  `,
};
