import { FC } from "react";
import { StopwatchOption, useStopwatch } from "../hooks/useStopwatch";

export interface StopwatchComponentProps {
  render: FC<{ field: Interval; operation: Operations }>;
}

export type StopwatchProps = StopwatchComponentProps & StopwatchOption;

export const Stopwatch: FC<StopwatchProps> = ({
  autoStart = false,
  option = { mode: "state" },
  render: Render,
}) => {
  const { interval, operations } = useStopwatch({ autoStart, option });
  return <Render field={interval} operation={operations} />;
};
