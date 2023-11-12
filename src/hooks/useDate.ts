import { useState } from "react";
import useLocalStorage from "react-use/lib/useLocalStorage";

import { UseDateOption, UseDateReturn } from "../types/useDateOption";
import { NullableDate } from "../types/nullableDate";

export function useDate({ defaultValue, key, mode }: UseDateOption): UseDateReturn {
  const [time, setTime] = useState<NullableDate>(defaultValue);
  const [localTime, setLocalTime] = useLocalStorage<NullableDate>(
    `time_${key ?? ""}`,
    defaultValue
  );
  const isState = mode == "state";
  return { date: isState ? time : localTime, setDate: isState ? setTime : setLocalTime };
}
