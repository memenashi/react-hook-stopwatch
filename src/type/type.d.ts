interface UseStopwatchReturn {
  startAt: Date;
  interval: Interval;
  raps: Interval[];
  operations: Operations;
}

interface Interval {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  dates: number;
}

interface Operations {
  start: () => void;
  stop: () => Interval;
  reset: () => void;
  rap: () => Interval;
}
