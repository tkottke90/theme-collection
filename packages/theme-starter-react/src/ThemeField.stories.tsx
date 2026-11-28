import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeField } from "./ThemeField.js";
import { ThemeInput } from "./ThemeInput.js";

const meta: Meta<typeof ThemeField> = {
  title: "Theme/Starter React/Field",
  component: ThemeField,
  parameters: {
    intro: {
      tag: "ThemeField",
      title: "Field",
      description: [
        "A label stacked above a form control. It links the label to the control natively with label for (using the control's id, or one it generates), so clicking the label focuses the control and screen readers announce it. Wrapping several controls, such as radios, it labels them as a group.",
        "When copying the starter, keep that behaviour and describe your label typography and the spacing between label and control.",
      ],
    },
  },
  args: {
    label: "Email address",
    children: <ThemeInput type="email" name="email" placeholder="you@example.com" />,
  },
};
export default meta;

type Story = StoryObj<typeof ThemeField>;

export const Default: Story = {};

export const Group: Story = {
  args: {
    label: "Contact me by",
    children: (
      <div style={{ display: "flex", gap: "1rem" }}>
        {["Email", "Phone"].map((option) => (
          <label
            key={option}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <ThemeInput type="radio" name="contact" value={option.toLowerCase()} />
            {option}
          </label>
        ))}
      </div>
    ),
  },
};
