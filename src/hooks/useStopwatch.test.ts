import { act, renderHook } from "@testing-library/react-hooks";

import { StopwatchOption } from "../types";

import { useStopwatch } from "./useStopwatch";

describe("useStopwatch", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let originalSetInterval: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let originalClearInterval: any;

  const mockSetInterval = jest.fn();
  const mockClearInterval = jest.fn();

  beforeAll(() => {
    originalSetInterval = window.setInterval;
    originalClearInterval = window.clearInterval;

    window.setInterval = mockSetInterval as never;
    window.clearInterval = mockClearInterval as never;
  });

  afterAll(() => {
    window.setInterval = originalSetInterval;
    window.clearInterval = originalClearInterval;
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
