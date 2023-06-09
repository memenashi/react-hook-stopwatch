import { act, renderHook } from "@testing-library/react-hooks";
import { useStorageState } from "./useStorageState";
import { useDate } from "./useDate";
import { UseDateOption } from "../types/useDateOption";

// Mock the useStorageState hook
jest.mock("./useStorageState");

const mockUseStorageState = useStorageState as jest.MockedFunction<typeof useStorageState>;

test("should return date and setDate with local mode", () => {
  const defaultValue = new Date();
  const option: UseDateOption = { defaultValue, key: "test_key", mode: "local" };

  const mockSetDate = jest.fn();
  mockUseStorageState.mockReturnValue([defaultValue, mockSetDate]);

  const { result, waitFor } = renderHook(() => useDate(option));

  expect(result.current.date).toBe(defaultValue);
  expect(mockUseStorageState).toBeCalledWith(
    `time_${option.key}`,
    option.defaultValue,
    expect.any(Function)
  );

  const newDate = new Date();

  act(() => {
    result.current.setDate(newDate);
  });
  waitFor(() => {
    expect(mockSetDate).toBeCalledWith(newDate);
  });
});
