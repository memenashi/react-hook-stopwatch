import { UseDateOption } from "./useDateOption";

export interface StopwatchOption {
  // autoStart?: boolean;
  option?: Omit<UseDateOption, "defaultValue">;
}
