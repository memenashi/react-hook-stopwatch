import { useState, useEffect } from "react";

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useStorageState<T>(
  key: string,
  initialValue?: T,
  reviver?: (key: string, value: any) => any
): [T | undefined, SetValue<T | undefined>] {
  if (!key) {
    throw new Error("A key is required for useLocalStorage.");
  }

  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item, reviver) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
