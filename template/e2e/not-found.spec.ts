import { test, expect } from "@playwright/test";

test.describe("404 Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
  });

  test("404 heading이 표시된다", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  });

  test("Page not found 메시지가 표시된다", async ({ page }) => {
    await expect(page.getByText(/page not found/i)).toBeVisible();
  });

  test("Go Home 링크가 홈으로 이동한다", async ({ page }) => {
    await page.getByRole("link", { name: /go home/i }).click();
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("heading", { name: /welcome to your new project/i })
    ).toBeVisible();
  });
});
