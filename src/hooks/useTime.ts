import { useState } from "react";

type NullableDate = Date | null | undefined;

type DateKey = string | string[];

interface DateOptionBase {
  mode: "state" | "local";
}

interface StateDateOption extends DateOptionBase {
  mode: "state";
}

interface LocalDateOption extends DateOptionBase {
  mode: "local";
  key: DateKey;
}

export type UseDateOption = StateDateOption | LocalDateOption;

export type DispatchDate = NullableDate | ((prev: NullableDate) => NullableDate);

export const useDate: (option: UseDateOption) => {
  date: NullableDate;
  setDate: (value: DispatchDate) => void;
} = (option) => {
  const [time, setTime] = useState<NullableDate>();
  if (option.mode == "local") {
    const keyStr = typeof option.key == "string" ? option.key : option.key.join(".");
    const date = getLocalStorageDate();

    function getLocalStorageDate() {
      const dateStr = localStorage.getItem(keyStr);
      if (dateStr) return new Date(dateStr);
      return null;
    }

    function setLocalStorageDate(value: DispatchDate) {
      const newDate = typeof value == "function" ? value(date) : value;
      if (newDate) {
        localStorage.setItem(keyStr, newDate.toISOString());
      } else {
        localStorage.removeItem(keyStr);
      }
    }
    return { date, setDate: setLocalStorageDate };
  }
  return { date: time, setDate: setTime };
};
