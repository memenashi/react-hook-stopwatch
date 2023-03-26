import { useDate, UseDateOption } from "./useTime";

export interface StopwatchOption {
  autoStart?: boolean;
  option?: UseDateOption;
}

export const useStopwatch: (option: StopwatchOption) => UseStopwatchReturn = ({
  autoStart = false,
  option = { mode: "state" },
}) => {
  const time = useDate(option);
  return {
    startAt: new Date(),
    interval: { milliseconds: 0, seconds: 0, minutes: 0, hours: 0, dates: 0 },
    raps: [],
    operations: {
      rap: () => ({ milliseconds: 0, seconds: 0, minutes: 0, hours: 0, dates: 0 }),
      stop: () => ({ milliseconds: 0, seconds: 0, minutes: 0, hours: 0, dates: 0 }),
      reset: () => undefined,
      start: () => undefined,
    },
  };
};
