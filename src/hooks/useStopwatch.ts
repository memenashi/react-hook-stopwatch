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
  const useDateOption = {
    ...option,
  };
  const { date: startAt, setDate: setStartAt } = useDate({
    ...useDateOption,
    key: useDateOption.mode == "local" ? `${useDateOption.key}_start` : undefined,
  } as UseDateOption);
  const { date: restartDate, setDate: setRestartDate } = useDate({
    ...useDateOption,
    key: useDateOption.mode == "local" ? `${useDateOption.key}_temp` : undefined,
  } as UseDateOption);
  const { date: tempTime, setDate: setTempTime } = useDate({
    ...useDateOption,
    key: useDateOption.mode == "local" ? `${useDateOption.key}_temp` : undefined,
  } as UseDateOption);
  const [isRunning, setIsRunning] = useState(false);
  const [calcTime, setCalculatedTime] = useState(tempTime ? tempTime.getTime() : 0);

  const start = () => {
    setIsRunning(true);
    const now = new Date();
    setStartAt(now);
    setRestartDate(now);
    setCalculatedTime(Date.now());
  };

  /** restart the stopwatch */
  const resume = () => {
    if (!restartDate) throw new Error("startAt is null");
    if (!tempTime) throw new Error("resume date is null");
    setIsRunning(true);
    const durationBetweenStartAndTemp = tempTime.getTime() - restartDate.getTime();
    setRestartDate(new Date(Date.now() - durationBetweenStartAndTemp));
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
