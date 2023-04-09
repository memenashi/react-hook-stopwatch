export type NullableDate = Date | null | undefined;

export interface UseStopwatchReturn {
  startAt: NullableDate;
  interval: StopWatchDuration;
  operations: StopWatchOperations;
}

export interface StopWatchDuration {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
}

export interface StopWatchOperations {
  isRunning: boolean;
  start: () => void;
  stop: () => StopWatchDuration;
  reset: () => void;
  resume: () => void;
}

interface StopwatchOption {
  // autoStart?: boolean;
  option?: Omit<UseDateOption, "defaultValue">;
}

interface StateDateOption extends DateOptionBase {
  mode: "state";
  key?: never;
}

interface LocalDateOption extends DateOptionBase {
  mode: "local";
  key: DateKey;
}

type UseDateOption = StateDateOption | LocalDateOption;

export interface DateOptionBase {
  mode: "state" | "local";
  defaultValue?: Date;
}
