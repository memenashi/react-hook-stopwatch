import { Dispatch, SetStateAction } from "react";

import { NullableDate } from "./nullableDate";

export type DispatchDate = NullableDate | ((prev: NullableDate) => NullableDate);

export interface UseDateReturn {
  date: NullableDate;
  setDate: Dispatch<SetStateAction<NullableDate>>;
}

interface DateOptionBase {
  mode: "state" | "local";
  defaultValue?: Date;
}
export interface StateDateOption extends DateOptionBase {
  mode: "state";
  key?: never;
}
export interface LocalDateOption extends DateOptionBase {
  mode: "local";
  key: string;
}
export type UseDateOption = StateDateOption | LocalDateOption;
