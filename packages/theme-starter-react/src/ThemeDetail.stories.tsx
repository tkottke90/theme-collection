import type { Meta, StoryObj } from "@storybook/preact";
import { ThemeDetail } from "./ThemeDetail.js";

const meta: Meta<typeof ThemeDetail> = {
  title: "Theme/Starter React/Detail",
  component: ThemeDetail,
  args: {
    summary: "What's included?",
    children: "Everything you need to get started.",
  },
};
export default meta;

type Story = StoryObj<typeof ThemeDetail>;

export const Default: Story = {};
