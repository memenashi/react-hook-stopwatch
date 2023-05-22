import { FC } from "react";
import { useStopwatch } from "../hooks/useStopwatch";
import { StopWatchDuration, StopWatchOperations, StopwatchOption } from "../types";

export interface StopwatchRenderProps {
  startAt: Date | null | undefined;
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
