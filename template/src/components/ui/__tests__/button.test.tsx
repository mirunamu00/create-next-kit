import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";

describe("Button", () => {
  it("텍스트를 렌더링한다", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("클릭 이벤트를 처리한다", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // --- Variants ---
  it("default variant", () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });

  it("destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });

  it("outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-input");
  });

  it("secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-secondary");
  });

  it("ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveClass("hover:bg-accent");
  });

  it("link variant", () => {
    render(<Button variant="link">Link</Button>);
    expect(screen.getByRole("button")).toHaveClass("underline-offset-4");
  });

  // --- Sizes ---
  it("sm size", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");
  });

  it("lg size", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10");
  });

  it("icon size", () => {
    render(<Button size="icon">X</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("h-9");
    expect(btn).toHaveClass("w-9");
  });

  // --- States ---
  it("disabled 상태", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );

    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();

    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("asChild로 다른 요소를 렌더링한다", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveClass("inline-flex");
  });

  it("커스텀 className을 적용한다", () => {
    render(<Button className="my-custom">Custom</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("my-custom");
    expect(btn).toHaveClass("inline-flex");
  });

  it("displayName이 설정되어 있다", () => {
    expect(Button.displayName).toBe("Button");
  });
});
