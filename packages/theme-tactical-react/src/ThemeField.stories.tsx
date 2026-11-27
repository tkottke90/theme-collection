import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeField } from "./ThemeField.js";
import { ThemeInput } from "./ThemeInput.js";

const meta: Meta<typeof ThemeField> = {
  title: "Theme/Tactical React/Field",
  component: ThemeField,
  parameters: {
    intro: {
      tag: "ThemeField",
      title: "Field",
      description: [
        "A tracked-capitals label stacked over the control inside it. It links the label to the control natively with label for (using the control's id, or one it generates), so clicking the label focuses the control and the label is its accessible name.",
        "Wrapping several controls, such as a radio group, it renders a group named by the label.",
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
    label: "Priority",
    children: (
      <div style={{ display: "flex", gap: "1rem" }}>
        {["Routine", "Urgent"].map((option) => (
          <label
            key={option}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <ThemeInput type="radio" name="priority" value={option.toLowerCase()} />
            {option}
          </label>
        ))}
      </div>
    ),
  },
};
