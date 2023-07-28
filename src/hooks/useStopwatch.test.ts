import { act, renderHook } from "@testing-library/react-hooks";

import { useStopwatch } from "./useStopwatch";
import { StopwatchOption } from "../types";

describe("useStopwatch", () => {
  let originalSetInterval;
  let originalClearInterval;

  const mockSetInterval = jest.fn();
  const mockClearInterval = jest.fn();

  beforeAll(() => {
    originalSetInterval = window.setInterval;
    originalClearInterval = window.clearInterval;

    window.setInterval = mockSetInterval as any;
    window.clearInterval = mockClearInterval as any;
  });

  test("should be defined", () => {
    expect(useStopwatch).toBeDefined();
  });

  describe("state mode", () => {
    beforeEach(() => {
      localStorage.clear();
    });

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
    beforeEach(() => {
      localStorage.clear();
    });

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
