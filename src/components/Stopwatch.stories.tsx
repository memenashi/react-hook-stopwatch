import { Meta, StoryFn } from "@storybook/react";
import { RenderDemo } from "../demo/RenderDemo";
import { Stopwatch, StopwatchProps } from "./Stopwatch";

export default {
  component: Stopwatch,
} as Meta<typeof Stopwatch>;

const Template: StoryFn<StopwatchProps> = (args) => <Stopwatch {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  render: RenderDemo,
};

export const LocalStorageMode = Template.bind({});
LocalStorageMode.args = {
  render: RenderDemo,
  option: { mode: "local", key: "stopwatch" },
};
