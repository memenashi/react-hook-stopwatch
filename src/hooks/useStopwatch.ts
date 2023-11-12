import {
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";

import { StateDateOption, UseDateOption } from "../types/useDateOption";
import { StopwatchOption, UseStopwatchReturn } from "../types";

import { useDate } from "./useDate";

const defaultStateDateOption = { mode: "state" } as StateDateOption;

export function useStopwatch(stopwatchOption?: StopwatchOption): UseStopwatchReturn {
  const option = stopwatchOption?.option || defaultStateDateOption;
  const { date: startAt, setDate: setStartAt } = useDate({
    ...option,
    key: option.mode == "local" ? `${option.key}_start` : undefined,
  } as UseDateOption);
  const { date: restartDate, setDate: setRestartDate } = useDate({
    mode: option.mode,
    key: option.mode == "local" ? `${option.key}_temp` : undefined,
    defaultValue: option.defaultValue,
  } as UseDateOption);
  const { date: tempTime, setDate: setTempTime } = useDate({
    ...option,
    key: option.mode == "local" ? `${option.key}_temp` : undefined,
    defaultValue: new Date(),
  } as UseDateOption);
  const [isRunning, setIsRunning] = useState(false);
  console.log("tempTime", tempTime, typeof tempTime);
  const [calcTime, setCalculatedTime] = useState(tempTime ? tempTime.getTime() : 0);

  const start = useCallback(() => {
    setIsRunning(true);
    const now = new Date();
    if (option.defaultValue) {
      setStartAt(option.defaultValue);
    } else {
      setStartAt(now);
    }
    setRestartDate(now);
    setCalculatedTime(Date.now());
  }, [option.defaultValue, setRestartDate, setStartAt]);

  /** restart the stopwatch */
  const resume = useCallback(() => {
    if (!restartDate) throw new Error("restartDate is null");
    if (!tempTime) throw new Error("tempTime date is null");
    setIsRunning(true);
    const durationBetweenStartAndTemp = tempTime.getTime() - restartDate.getTime();
    const tmp = new Date(Date.now() - durationBetweenStartAndTemp);
    setRestartDate(tmp);
    setCalculatedTime(Date.now());
  }, [restartDate, setRestartDate, tempTime]);

  const reset = useCallback(() => {
    setStartAt(null);
    setCalculatedTime(0);
  }, [setStartAt]);

  /** returns Interval from start */
  const stop = useCallback(() => {
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
  }, [setTempTime, startAt]);

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

  const getInterval = useCallback(
    (date: Date | null | undefined) => ({
      seconds: date && calcTime ? differenceInSeconds(calcTime, date) % 60 : 0,
      minutes: date && calcTime ? differenceInMinutes(calcTime, date) % 60 : 0,
      hours: date && calcTime ? differenceInHours(calcTime, date) % 24 : 0,
    }),
    [calcTime]
  );

  const interval = useMemo(() => getInterval(startAt), [getInterval, startAt]);

  return {
    startAt,
    interval,
    operations: {
      isRunning,
      stop,
      start,
      reset,
      resume,
    },
  };
}
