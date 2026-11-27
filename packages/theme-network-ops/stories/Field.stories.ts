import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Theme/Network Ops/Field",
  parameters: {
    intro: {
      tag: ".theme-field, .theme-field-label",
      title: "Field",
      description: [
        "A field stacks a label over its control: use label for and a matching id. As a fieldset with a legend it groups checkboxes or radios that share a name, each in a theme-field-label row, and fieldset disabled turns off every control inside it, greying the legend and the labels.",
        "Hints and errors are plain small text linked with aria-describedby. An invalid control turns its border rose; the message under it says what to fix.",
      ],
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div class="theme-field">
      <label for="field-hostname">Hostname</label>
      <input class="theme-input" type="text" id="field-hostname" name="hostname" placeholder="edge-gw-04.ops.local" />
    </div>
  `,
};

export const WithHint: Story = {
  render: () => `
    <div class="theme-field">
      <label for="field-region">Region</label>
      <input class="theme-input" type="text" id="field-region" name="region" aria-describedby="field-region-hint" />
      <small id="field-region-hint">Use the datacenter code, such as us-east-2.</small>
    </div>
  `,
};

export const Invalid: Story = {
  render: () => `
    <div class="theme-field">
      <label for="field-invalid">Contact email</label>
      <input class="theme-input" type="email" id="field-invalid" name="email" value="not-an-email" aria-invalid="true" aria-describedby="field-invalid-error" />
      <small id="field-invalid-error">Enter an address like oncall@network-ops.io.</small>
    </div>
  `,
};

export const CheckboxGroup: Story = {
  render: () => `
    <fieldset class="theme-field">
      <legend>Notify me about</legend>
      <label class="theme-field-label">
        <input class="theme-checkbox" type="checkbox" name="topics" value="alerts" checked />
        Alerts
      </label>
      <label class="theme-field-label">
        <input class="theme-checkbox" type="checkbox" name="topics" value="failover" />
        Failover events
      </label>
    </fieldset>
  `,
};

export const RadioGroup: Story = {
  render: () => `
    <fieldset class="theme-field">
      <legend>Scan mode</legend>
      <label class="theme-field-label">
        <input class="theme-radio" type="radio" name="scan" value="passive" checked />
        Passive
      </label>
      <label class="theme-field-label">
        <input class="theme-radio" type="radio" name="scan" value="active" />
        Active
      </label>
    </fieldset>
  `,
};

export const DisabledFieldset: Story = {
  render: () => `
    <fieldset class="theme-field" disabled>
      <legend>Failover (unavailable)</legend>
      <label class="theme-field-label">
        <input class="theme-radio" type="radio" name="failover" value="auto" checked />
        Automatic
      </label>
      <label class="theme-field-label">
        <input class="theme-radio" type="radio" name="failover" value="manual" />
        Manual
      </label>
    </fieldset>
  `,
};
