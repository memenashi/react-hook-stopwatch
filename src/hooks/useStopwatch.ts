import {
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { useEffect, useState } from "react";
import { useDate } from "./useDate";
import { StateDateOption, UseDateOption } from "../types/useDateOption";
import { StopwatchOption, UseStopwatchReturn } from "../types";

const defaultStateDateOption = { mode: "state" } as StateDateOption;

export const useStopwatch: (option?: StopwatchOption) => UseStopwatchReturn = (
  { option = defaultStateDateOption } = { option: defaultStateDateOption }
) => {
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
  const [calcTime, setCalculatedTime] = useState(tempTime ? tempTime.getTime() : 0);

  const start = () => {
    setIsRunning(true);
    const now = new Date();
    if (option.defaultValue) {
      setStartAt(option.defaultValue);
    } else {
      setStartAt(now);
    }
    setRestartDate(now);
    setCalculatedTime(Date.now());
  };

  /** restart the stopwatch */
  const resume = () => {
    if (!restartDate) throw new Error("restartDate is null");
    if (!tempTime) throw new Error("tempTime date is null");
    setIsRunning(true);
    const durationBetweenStartAndTemp = tempTime.getTime() - restartDate.getTime();
    const tmp = new Date(Date.now() - durationBetweenStartAndTemp);
    setRestartDate(tmp);
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

  const getInterval = (date: Date | null | undefined) => ({
    seconds: date && calcTime ? differenceInSeconds(calcTime, date) % 60 : 0,
    minutes: date && calcTime ? differenceInMinutes(calcTime, date) % 60 : 0,
    hours: date && calcTime ? differenceInHours(calcTime, date) % 24 : 0,
  });

  return {
    startAt,
    interval: getInterval(restartDate),
    operations: {
      isRunning,
      stop,
      start,
      reset,
      resume,
    },
  };
};
