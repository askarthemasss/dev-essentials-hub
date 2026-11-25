import { expect, test } from "@playwright/test";
import { tools } from "../src/data/tools";
import { expectNoAccessibilityViolations, expectNamedControls, watchPageErrors } from "./helpers";

test.describe("all tool routes", () => {
  for (const tool of tools) {
    test(`${tool.name} (${tool.id}) renders`, async ({ page }) => {
      const errors = watchPageErrors(page);

      await page.goto(`/tool/${tool.id}`);

      await expect(page.locator("#tool-title")).toHaveText(tool.name);
      await expect(page.getByText("Loading tool…")).toHaveCount(0);
      await expect(page.getByText("Something broke")).toHaveCount(0);
      await expectNoAccessibilityViolations(page);
      await expectNamedControls(page);
      expect(errors).toEqual([]);
    });
  }
});

test.describe("all tool routes on a narrow viewport", () => {
  test.use({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true });

  for (const tool of tools) {
    test(`${tool.name} (${tool.id}) avoids page-level horizontal scroll`, async ({ page }) => {
      await page.goto(`/tool/${tool.id}`);

      await expect(page.locator("#tool-title")).toHaveText(tool.name);
      await expect(page.getByText("Loading tool…")).toHaveCount(0);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, tool.id).toBeLessThanOrEqual(0);
    });
  }
});

test("home page renders the workbench", async ({ page }) => {
  const errors = watchPageErrors(page);

  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("129 tools. One local workbench.");
  await expect(page.getByRole("textbox", { name: /Search \d+ developer tools/ })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expectNoAccessibilityViolations(page);
  expect(errors).toEqual([]);
});

test("tools directory renders the catalogue", async ({ page }) => {
  const errors = watchPageErrors(page);

  await page.goto("/tools");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("All 129 developer tools");
  await expect(page.getByRole("textbox", { name: /Search \d+ developer tools/ })).toBeVisible();
  await expect(page.getByText("129 tools", { exact: true })).toBeVisible();
  await expectNoAccessibilityViolations(page);
  expect(errors).toEqual([]);
});

test("usage guide renders", async ({ page }) => {
  const errors = watchPageErrors(page);

  await page.goto("/usage");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How to use DevToolbox");
  await expect(page.getByRole("heading", { name: "Keyboard shortcuts" })).toBeVisible();
  await expectNoAccessibilityViolations(page);
  expect(errors).toEqual([]);
});

test("unknown tool route shows the 404 page", async ({ page }) => {
  const errors = watchPageErrors(page);

  await page.goto("/tool/not-a-real-tool");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  await expectNoAccessibilityViolations(page);
  expect(errors).toEqual([]);
});
