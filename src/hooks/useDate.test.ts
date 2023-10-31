import { renderHook, act } from "@testing-library/react-hooks";

import { UseDateOption } from "../types/useDateOption";
import { NullableDate } from "../types/nullableDate";

import { useDate } from "./useDate";

describe("useDate", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should return date and setDate with default state mode", () => {
    const defaultValue = undefined;
    const option: UseDateOption = { defaultValue, mode: "state" };

    const render = renderHook(() => useDate(option));

    expect(render.result.current.date).toBe(defaultValue);

    const newDate = new Date();
    act(() => {
      render.result.current.setDate(newDate);
    });

    expect(render.result.current.date).toBe(newDate);
  });

  test("should return date and setDate with state mode", () => {
    const defaultValue: NullableDate = new Date();
    const option: UseDateOption = { defaultValue, mode: "state" };

    const { result } = renderHook(() => useDate(option));

    expect(result.current.date).toBe(defaultValue);

    const newDate = new Date();
    act(() => {
      result.current.setDate(newDate);
    });

    expect(result.current.date).toBe(newDate);
  });
});
