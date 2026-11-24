import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeDetail } from "./ThemeDetail.js";

const meta: Meta<typeof ThemeDetail> = {
  title: "Theme/Starter React/Detail",
  component: ThemeDetail,
  parameters: {
    intro: {
      tag: "ThemeDetail",
      title: "Detail",
      description: [
        "A collapsible section built on the native details and summary elements, so it is keyboard and screen-reader friendly with no script. The starter keeps the browser's disclosure marker.",
        "When copying the starter, describe your theme's disclosure marker, the open and closed states, and the surface it sits on.",
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
