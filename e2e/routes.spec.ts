import { expect, test } from "@playwright/test";
import { tools } from "../src/data/tools";
import { watchPageErrors } from "./helpers";

test.describe("all tool routes", () => {
  for (const tool of tools) {
    test(`${tool.name} (${tool.id}) renders`, async ({ page }) => {
      const errors = watchPageErrors(page);

      await page.goto(`/tool/${tool.id}`);

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(tool.name);
      await expect(page.getByText("Loading tool…")).toHaveCount(0);
      await expect(page.getByText("Something broke")).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  }
});

test("home page renders the catalogue", async ({ page }) => {
  const errors = watchPageErrors(page);

  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("DevToolbox");
  await expect(page.getByRole("textbox", { name: /Search \d+ developer tools/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test("unknown tool route shows the 404 page", async ({ page }) => {
  const errors = watchPageErrors(page);

  await page.goto("/tool/not-a-real-tool");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  expect(errors).toEqual([]);
});
