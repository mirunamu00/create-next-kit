import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("메인 heading이 표시된다", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /welcome to your new project/i })
    ).toBeVisible();
  });

  test("FE Template badge가 표시된다", async ({ page }) => {
    await expect(page.getByText("FE Template")).toBeVisible();
  });

  test("Get Started 버튼이 있다", async ({ page }) => {
    await expect(page.getByRole("button", { name: /get started/i })).toBeVisible();
  });

  test("Learn More 버튼이 있다", async ({ page }) => {
    await expect(page.getByRole("button", { name: /learn more/i })).toBeVisible();
  });

  test("페이지 타이틀이 올바르다", async ({ page }) => {
    await expect(page).toHaveTitle(/My App/i);
  });
});
