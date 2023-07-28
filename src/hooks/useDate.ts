import { useCallback, useMemo, useState } from "react";
import { useStorageState } from "./useStorageState";
import { UseDateOption, UseDateReturn } from "../types/useDateOption";
import { NullableDate } from "../types/nullableDate";

export const useDate: (option: UseDateOption) => UseDateReturn = ({ defaultValue, key, mode }) => {
  const [time, setTime] = useState<NullableDate>(defaultValue);
  const [localTime, setLocalTime] = useStorageState<NullableDate>(
    `time_${key ?? ""}`,
    defaultValue,
    (_key, value) => {
      if (value === null) return value;
      return new Date(value);
    }
  );
  const isState = mode == "state";
  return useMemo(
    () => ({ date: isState ? time : localTime, setDate: isState ? setTime : setLocalTime }),
    [localTime, setLocalTime, time, isState, setTime]
  );
};
