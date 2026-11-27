import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeDetail } from "./ThemeDetail.js";

const meta: Meta<typeof ThemeDetail> = {
  title: "Theme/Tactical React/Detail",
  component: ThemeDetail,
  parameters: {
    intro: {
      tag: "ThemeDetail",
      title: "Detail",
      description: [
        "A disclosure built on the native details element, in the same bordered surface as the container. The summary is set in the cyan accent and the body stays in the standard ink.",
        "It works without JavaScript and is keyboard operable.",
      ],
    },
  },
  args: {
    summary: "What's included?",
    children: "Everything you need to get started.",
  },
};
export default meta;

type Story = StoryObj<typeof ThemeDetail>;

export const Default: Story = {};
