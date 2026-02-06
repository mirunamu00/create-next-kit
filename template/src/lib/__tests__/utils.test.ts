import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn", () => {
  it("클래스명을 병합한다", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("조건부 클래스를 처리한다", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("Tailwind 충돌 클래스를 해소한다", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("객체 형태를 처리한다", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("배열을 처리한다", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("빈 입력을 처리한다", () => {
    expect(cn()).toBe("");
  });

  it("undefined/null을 무시한다", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });
});
