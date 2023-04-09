import { act, renderHook } from "@testing-library/react-hooks";
import { StopwatchOption } from "../type/type";
import { useStopwatch } from "./useStopwatch";

describe("useStopwatch", () => {
  const mockSetInterval = jest.fn();
  const mockClearInterval = jest.fn();

  beforeAll(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, "setInterval", { value: mockSetInterval });
    Object.defineProperty(window, "clearInterval", { value: mockClearInterval });
  });

  test("should be defined", () => {
    expect(useStopwatch).toBeDefined();
  });

  describe("state mode", () => {
    test("can start", () => {
      const { result } = renderHook(() => useStopwatch());
      act(() => {
        result.current.operations.start();
      });
      expect(result.current.operations.isRunning).toBe(true);
      expect(result.current.startAt).not.toBeNull();
    });

    test("can stop", () => {
      const { result } = renderHook(() => useStopwatch());
      act(() => {
        result.current.operations.start();
      });
      expect(result.current.operations.isRunning).toBe(true);
      expect(result.current.startAt).not.toBeNull();
      act(() => {
        result.current.operations.stop();
      });
      expect(result.current.operations.isRunning).toBe(false);
      expect(result.current.startAt).not.toBeNull();
    });

    test("can resume", () => {
      const { result } = renderHook(() => useStopwatch());
      act(() => {
        result.current.operations.start();
      });
      expect(result.current.operations.isRunning).toBe(true);
      expect(result.current.startAt).not.toBeNull();
      act(() => {
        result.current.operations.stop();
      });
      expect(result.current.operations.isRunning).toBe(false);
      expect(result.current.startAt).not.toBeNull();
      act(() => {
        result.current.operations.resume();
      });
      expect(result.current.operations.isRunning).toBe(true);
      expect(result.current.startAt).not.toBeNull();
    });
  });

  describe("local mode", () => {
    const localStopwatchOption: StopwatchOption = { option: { mode: "local", key: "test" } };
    test("can start", () => {
      const { result } = renderHook(() => useStopwatch(localStopwatchOption));
      act(() => {
        result.current.operations.start();
      });
      expect(result.current.operations.isRunning).toBe(true);
      expect(result.current.startAt).not.toBeNull();
    });

    test("can stop", () => {
      const { result } = renderHook(() => useStopwatch(localStopwatchOption));
      act(() => {
        result.current.operations.start();
      });
      expect(result.current.operations.isRunning).toBe(true);
      expect(result.current.startAt).not.toBeNull();
      act(() => {
        result.current.operations.stop();
      });
      expect(result.current.operations.isRunning).toBe(false);
      expect(result.current.startAt).not.toBeNull();
    });
  });
});
