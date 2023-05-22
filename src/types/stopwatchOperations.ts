export interface UseStopwatchReturn {
  startAt: Date | null | undefined;
  interval: StopWatchDuration;
  operations: StopWatchOperations;
}

export interface StopWatchOperations {
  isRunning: boolean;
  start: () => void;
  stop: () => StopWatchDuration;
  reset: () => void;
  resume: () => void;
}

export interface StopWatchDuration {
  seconds: number;
  minutes: number;
  hours: number;
}
