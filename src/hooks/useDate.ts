import { useState } from "react";

import { UseDateOption, UseDateReturn } from "../types/useDateOption";
import { NullableDate } from "../types/nullableDate";

import { useStorageState } from "./useStorageState";

export function useDate({ defaultValue, key, mode }: UseDateOption): UseDateReturn {
  const [time, setTime] = useState<NullableDate>(defaultValue);
  const [localTime, setLocalTime] = useStorageState<NullableDate>(
    `time_${key ?? ""}`,
    defaultValue,
    (_key, value) => {
      if (value === null) return value;
      if (typeof value === "string" || typeof value === "number") return new Date(value);
    }
  );
  const isState = mode == "state";
  return { date: isState ? time : localTime, setDate: isState ? setTime : setLocalTime };
}
