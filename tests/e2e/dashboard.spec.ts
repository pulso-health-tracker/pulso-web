import { test, expect } from "@playwright/test";

test("dashboard loads, shows charts, and date-range navigation updates the URL", async ({ page }) => {
  // Given the dashboard is opened with no query params (default range)
  await page.goto("/");

  // Then the page title and all 3 chart cards render
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByText("Daily Active Energy vs Goal")).toBeVisible();
  await expect(page.getByText("Workout Volume Trend")).toBeVisible();
  await expect(page.getByText("Top Record Types Over Time")).toBeVisible();

  // When the start date is changed
  const startInput = page.locator('input[type="date"]').first();
  await startInput.fill("2025-01-01");

  // Then the URL reflects the new searchParams and the page re-renders server-side
  await expect(page).toHaveURL(/start=2025-01-01/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});
