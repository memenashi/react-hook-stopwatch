import { useState } from "react";
import { NullableDate, UseDateOption } from "../type/type";
import { useStorageState } from "./useStorageState";

export type DispatchDate = NullableDate | ((prev: NullableDate) => NullableDate);

export const useDate: (option: UseDateOption) => {
  date: NullableDate;
  setDate: (value: DispatchDate) => void;
} = (option) => {
  const [time, setTime] = useState<NullableDate>(option.defaultValue);
  const [localTime, setLocalTime] = useStorageState<NullableDate>(
    `time_${option.key ?? ""}`,
    option.defaultValue,
    (_key, value) => {
      if (value === null) return value;
      return new Date(value);
    }
  );
  if (option.mode == "state") return { date: time, setDate: setTime };
  return { date: localTime, setDate: setLocalTime };
};
