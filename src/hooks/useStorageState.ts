import { useState, useEffect } from "react";

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useStorageState<T>(
  key: string,
  initialValue?: T,
  reviver?: (key: string, value: any) => any
): [T | undefined, SetValue<T | undefined>] {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    const item = window.localStorage.getItem(key);
    try {
      return item ? JSON.parse(item, reviver) : initialValue;
    } catch {
      return undefined;
    }
  });

  useEffect(() => {
    if (!storedValue) return;
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
