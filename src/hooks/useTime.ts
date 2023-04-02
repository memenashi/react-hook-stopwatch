import { useState } from "react";
import { useStorageState } from "./useStorageState";

type DateKey = string;

interface DateOptionBase {
  mode: "state" | "local";
  defaultValue?: Date;
}

export interface StateDateOption extends DateOptionBase {
  mode: "state";
  key: undefined;
}

export interface LocalDateOption extends DateOptionBase {
  mode: "local";
  key: DateKey;
}

export type UseDateOption = StateDateOption | LocalDateOption;

export type DispatchDate = NullableDate | ((prev: NullableDate) => NullableDate);

export const useDate: (option: UseDateOption) => {
  date: NullableDate;
  setDate: (value: DispatchDate) => void;
} = (option) => {
  const [time, setTime] = useState<NullableDate>(option.defaultValue);
  const [localTime, setLocalTime] = useStorageState<NullableDate>(
    `time_${option.key ?? ""}`,
    option.defaultValue
  );
  if (option.mode == "state") return { date: time, setDate: setTime };
  return { date: localTime, setDate: setLocalTime };
};
