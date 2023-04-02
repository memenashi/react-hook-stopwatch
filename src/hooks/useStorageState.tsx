import { useState } from "react";

type UseStorageStateProps<T> =
  | {
      mode?: "local";
      value: T;
      key?: string;
    }
  | {
      mode?: "state";
      value: T;
      key?: undefined;
    };

export function useStorageState<T>({
  mode = "state",
  value,
  key = "",
}: UseStorageStateProps<T>): [T, (value: T) => T | void] {
  const [state, setState] = useState<T>(value);
  if (mode == "state") return [state, setState];

  function getLocalStorageDate(): T {
    const valueStr = localStorage.getItem(key);
    return JSON.parse(valueStr?.trim() ?? "") as T;
  }

  function setLocalStorageDate(value: T): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  return [getLocalStorageDate(), setLocalStorageDate];
}
