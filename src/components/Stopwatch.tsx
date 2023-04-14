import { FC } from "react";
import { useStopwatch } from "../hooks/useStopwatch";

export interface StopwatchRenderProps {
  startAt: NullableDate;
  field: StopWatchDuration;
  operation: StopWatchOperations;
}

export interface StopwatchComponentProps {
  render: FC<StopwatchRenderProps>;
}

export type StopwatchProps = StopwatchComponentProps & StopwatchOption;

export const Stopwatch: FC<StopwatchProps> = ({ option = { mode: "state" }, render: Render }) => {
  const { startAt, interval, operations } = useStopwatch({ option });
  return <Render startAt={startAt} field={interval} operation={operations} />;
};
