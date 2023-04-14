import { FC } from "react";
import { StopwatchRenderProps } from "../components/Stopwatch";
import { format } from "date-fns";

export const RenderDemo: FC<StopwatchRenderProps> = ({
  startAt,
  field: { hours, minutes, seconds },
  operation,
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
    <span>start at:{startAt ? format(startAt, "yyyy/MM/dd HH:mm:ss") : ""}</span>
    <span>{`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`}</span>
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
