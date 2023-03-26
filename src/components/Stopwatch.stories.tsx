import { Meta, StoryFn } from "@storybook/react";
import { Stopwatch, StopwatchProps } from "./Stopwatch";

export default {
  component: Stopwatch,
} as Meta<typeof Stopwatch>;

const Template: StoryFn<StopwatchProps> = (args) => <Stopwatch {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  render: ({ field: { hours, minutes, seconds } }) => (
    <span>{`${hours}:${minutes}:${seconds}`}</span>
  ),
};

export const AutoStart = Template.bind({});
AutoStart.args = {
  autoStart: true,
  render: ({ field: { hours, minutes, seconds } }) => (
    <span>{`${hours}:${minutes}:${seconds}`}</span>
  ),
};
