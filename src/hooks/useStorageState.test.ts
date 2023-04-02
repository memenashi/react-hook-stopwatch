import { renderHook, act } from "@testing-library/react-hooks";
import { useStorageState } from "./useStorageState";

describe("useStorageState", () => {
  // テスト後にlocalStorageをクリア
  afterEach(() => {
    localStorage.clear();
  });

  it("should return initial value when there is no data in localStorage", () => {
    const { result } = renderHook(() => useStorageState<number>("testKey", 42));

    expect(result.current[0]).toBe(42);
  });

  it("should return stored value when there is data in localStorage", () => {
    localStorage.setItem("testKey", JSON.stringify("Hello, World!"));
    const { result } = renderHook(() => useStorageState<string>("testKey"));

    expect(result.current[0]).toBe("Hello, World!");
  });

  it("should store value in localStorage when value is updated", () => {
    const { result } = renderHook(() => useStorageState<number>("testKey", 42));

    act(() => {
      result.current[1](13);
    });

    expect(localStorage.getItem("testKey")).toBe(JSON.stringify(13));
  });

  it("should update stored value when value is updated", () => {
    const { result } = renderHook(() => useStorageState<number>("testKey", 42));

    act(() => {
      result.current[1](13);
    });

    expect(result.current[0]).toBe(13);
  });
});
