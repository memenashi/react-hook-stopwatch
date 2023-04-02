type NullableDate = Date | null | undefined;

interface UseStopwatchReturn {
  startAt: NullableDate;
  interval: StopWatchDuration;
  operations: StopWatchOperations;
}

interface StopWatchDuration {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
}

interface StopWatchOperations {
  isRunning: boolean;
  start: () => void;
  stop: () => StopWatchDuration;
  reset: () => void;
  resume: () => void;
}
