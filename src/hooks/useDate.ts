import { useState } from "react";
import { useStorageState } from "./useStorageState";

export type DispatchDate = NullableDate | ((prev: NullableDate) => NullableDate);

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
  return { date: isState ? time : localTime, setDate: isState ? setTime : setLocalTime };
};
