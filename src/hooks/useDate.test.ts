import { renderHook, act } from "@testing-library/react-hooks";
import { NullableDate, UseDateOption } from "../type/type";
import { useDate, DispatchDate } from "./useDate";
import { useStorageState } from "./useStorageState";

// Mock the useStorageState hook
jest.mock("./useStorageState");

const mockUseStorageState = useStorageState as jest.MockedFunction<typeof useStorageState>;

describe("useDate", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should return date and setDate with default state mode", () => {
    const defaultValue = undefined;
    const option: UseDateOption = { defaultValue, mode: "state" };

    const { result } = renderHook(() => useDate(option));

    expect(result.current.date).toBe(defaultValue);

    const newDate = new Date();
    act(() => {
      result.current.setDate(newDate);
    });

    expect(result.current.date).toBe(newDate);
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

  test("should return date and setDate with local mode", () => {
    const defaultValue: NullableDate = new Date();
    const option: UseDateOption = { defaultValue, key: "test_key", mode: "local" };

    mockUseStorageState.mockReturnValue([defaultValue, jest.fn()]);

    const { result } = renderHook(() => useDate(option));

    expect(result.current.date).toBe(defaultValue);
    expect(mockUseStorageState).toBeCalledWith(
      `time_${option.key}`,
      option.defaultValue,
      expect.any(Function)
    );

    const newDate = new Date();
    const setLocalTime = mockUseStorageState.mock.calls[0][1];

    expect(result.current.date).toBe(newDate);
  });
});
