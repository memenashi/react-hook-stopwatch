import { useState } from "react";

type DateKey = string;

interface DateOptionBase {
  mode: "state" | "local";
  defaultValue?: Date;
}

export interface StateDateOption extends DateOptionBase {
  mode: "state";
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
  if (option.mode == "state") return { date: time, setDate: setTime };

  const key = option.key;
  const date = getLocalStorageDate();

  function getLocalStorageDate() {
    const dateStr = localStorage.getItem(key);
    if (dateStr) return new Date(dateStr);
    return null;
  }

  function setLocalStorageDate(value: DispatchDate) {
    const newDate = typeof value == "function" ? value(date) : value;
    if (newDate) {
      localStorage.setItem(key, newDate.toISOString());
    } else {
      localStorage.removeItem(key);
    }
  }
  return { date: getLocalStorageDate(), setDate: setLocalStorageDate };
};
