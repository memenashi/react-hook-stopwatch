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

interface DateOptionBase {
  mode: "state" | "local";
  defaultValue?: Date;
}
