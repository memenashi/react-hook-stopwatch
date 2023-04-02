import { FC } from "react";
import { StopwatchRenderProps } from "../components/Stopwatch";

export const RenderDemo: FC<StopwatchRenderProps> = ({
  startAt,
  field: { hours, minutes, seconds },
  operation,
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
    <span>{`${hours}:${minutes}:${seconds}`}</span>
    {!operation.isRunning && (
      <>
        {!startAt && <button onClick={operation.start}>Start</button>}
        {startAt && <button onClick={operation.resume}>Resume</button>}
        <button onClick={operation.reset}>Reset</button>
      </>
    )}
    {operation.isRunning && <button onClick={operation.stop}>Stop</button>}
  </div>
);
