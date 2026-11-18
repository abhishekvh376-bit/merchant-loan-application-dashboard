const { test, expect } = require("@playwright/test");

test("admin can sign in, search applications and open a detail page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Loan applications" })).toBeVisible();
  await expect(page.getByText("Aarav Retail Pvt Ltd")).toBeVisible();

  await page.getByRole("textbox", { name: "Search applications" }).fill("Nova Electronics");
  await expect(page.getByText("Nova Electronics")).toBeVisible();
  await expect(page.getByText("Aarav Retail Pvt Ltd")).toHaveCount(0);

  await page.getByRole("textbox", { name: "Search applications" }).fill("");
  await page.getByRole("link", { name: "LN-2026-1001" }).click();
  await expect(page.getByRole("heading", { name: "Aarav Retail Pvt Ltd" })).toBeVisible();
  await expect(page.getByText("Inventory expansion")).toBeVisible();
});
