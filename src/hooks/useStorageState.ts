import { useState, useEffect } from "react";

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useStorageState<T>(
  key: string,
  initialValue?: T,
  reviver?: (key: string, value: any) => any
): [T | undefined, SetValue<T | undefined>] {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item, reviver) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
