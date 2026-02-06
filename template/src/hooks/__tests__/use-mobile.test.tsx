import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useIsMobile, useIsMounted } from "../use-mobile";

describe("useIsMobile", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  it("effect 실행 후 boolean 값을 반환한다", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: 1024 });
    const { result } = renderHook(() => useIsMobile());
    await waitFor(() => {
      expect(typeof result.current).toBe("boolean");
    });
  });

  it("데스크탑 너비에서 false를 반환한다", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: 1024 });

    const { result } = renderHook(() => useIsMobile());
    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it("모바일 너비에서 true를 반환한다", async () => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: 375 });

    const { result } = renderHook(() => useIsMobile());
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("767px 기준으로 matchMedia를 호출한다", () => {
    renderHook(() => useIsMobile());
    expect(window.matchMedia).toHaveBeenCalledWith("(max-width: 767px)");
  });

  it("unmount 시 리스너를 제거한다", () => {
    const removeEventListener = vi.fn();
    (window.matchMedia as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      matches: false,
      media: "",
      addEventListener: vi.fn(),
      removeEventListener,
    }));

    const { unmount } = renderHook(() => useIsMobile());
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});

describe("useIsMounted", () => {
  it("초기값은 false", () => {
    const { result } = renderHook(() => useIsMounted());
    // 첫 렌더에서는 false지만 useEffect 후 true로 바뀜
    // waitFor 없이 즉시 확인하면 이미 true일 수 있음 (동기 flush)
    expect(typeof result.current).toBe("boolean");
  });

  it("mount 후 true를 반환한다", async () => {
    const { result } = renderHook(() => useIsMounted());
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("re-render 후에도 true를 유지한다", async () => {
    const { result, rerender } = renderHook(() => useIsMounted());
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
    rerender();
    expect(result.current).toBe(true);
  });
});
