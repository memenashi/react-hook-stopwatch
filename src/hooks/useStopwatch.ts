import {
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect, useState } from "react";
import { useDate } from "./useTime";

const defaultStateDateOption = { mode: "state" } as StateDateOption;

export const useStopwatch: (option?: StopwatchOption) => UseStopwatchReturn = (
  { option = defaultStateDateOption } = { option: defaultStateDateOption }
) => {
  const useDateOption = {
    ...option,
  };
  const { date: startAt, setDate: setStartAt } = useDate({
    ...useDateOption,
    key: useDateOption.mode == "local" ? `${useDateOption.key}_start` : undefined,
  } as UseDateOption);
  const { date: tempTime, setDate: setTempTime } = useDate({
    ...useDateOption,
    key: useDateOption.mode == "local" ? `${useDateOption.key}_temp` : undefined,
  } as UseDateOption);
  const [isRunning, setIsRunning] = useState(false);
  const [calcTime, setCalculatedTime] = useState(tempTime ? tempTime.getTime() : 0);

  const start = () => {
    setIsRunning(true);
    setStartAt(new Date());
    setCalculatedTime(Date.now());
  };

  /** restart the stopwatch */
  const resume = () => {
    if (!startAt) throw new Error("startAt is null");
    if (!tempTime) throw new Error("resume date is null");
    setIsRunning(true);
    const durationBetweenStartAndTemp = tempTime.getTime() - startAt.getTime();
    setStartAt(new Date(Date.now() - durationBetweenStartAndTemp));
    setCalculatedTime(Date.now());
  };

  const reset = () => {
    setStartAt(null);
    setCalculatedTime(0);
  };

  /** returns Interval from start */
  const stop = () => {
    if (!startAt) throw new Error("date is null");
    setIsRunning(false);
    const now = new Date();
    const interval = {
      milliseconds: differenceInMilliseconds(now, startAt) % 1000,
      seconds: differenceInSeconds(now, startAt) % 60,
      minutes: differenceInMinutes(now, startAt) % 60,
      hours: differenceInHours(now, startAt) % 24,
    };
    setTempTime(now);
    return interval;
  };

  useEffect(() => {
    let timerInterval: number | undefined = undefined;
    if (isRunning && startAt) {
      timerInterval = window.setInterval(() => {
        setCalculatedTime(Date.now());
      }, 1000);
    }
    return () => {
      window.clearInterval(timerInterval);
    };
  }, [isRunning, startAt]);

  return {
    startAt,
    interval: {
      milliseconds: startAt && calcTime ? differenceInMilliseconds(calcTime, startAt) % 1000 : 0,
      seconds: startAt && calcTime ? differenceInSeconds(calcTime, startAt) % 60 : 0,
      minutes: startAt && calcTime ? differenceInMinutes(calcTime, startAt) % 60 : 0,
      hours: startAt && calcTime ? differenceInHours(calcTime, startAt) % 24 : 0,
    },
    operations: {
      isRunning,
      stop,
      start,
      reset,
      resume,
    },
  };
};
