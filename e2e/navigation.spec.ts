import { expect, test } from "@playwright/test";
import { expectNoAccessibilityViolations, openTool } from "./helpers";

test("primary navigation reaches every surface and marks the current page", async ({ page }) => {
  await page.goto("/");

  const primary = page.getByRole("navigation", { name: "Primary" });
  await expect(primary.getByRole("link", { name: "Tools" })).toBeVisible();
  await expect(primary.getByRole("link", { name: "Usage" })).toBeVisible();

  await primary.getByRole("link", { name: "Tools" }).click();
  await expect(page).toHaveURL(/\/tools$/);
  await expect(primary.getByRole("link", { name: "Tools" })).toHaveAttribute("aria-current", "page");

  await primary.getByRole("link", { name: "Usage" }).click();
  await expect(page).toHaveURL(/\/usage$/);
  await expect(primary.getByRole("link", { name: "Usage" })).toHaveAttribute("aria-current", "page");
});

test("homepage search opens the directory with a shareable query", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("textbox", { name: /Search \d+ developer tools/ }).fill("uuid");
  await page.getByRole("button", { name: "Search tools" }).click();

  await expect(page).toHaveURL(/\/tools\?q=uuid$/);
  await expect(page.getByRole("status").filter({ hasText: "1 tool" })).toBeVisible();
  await expect(page.getByRole("link", { name: /UUID Generator/ })).toBeVisible();
  await expectNoAccessibilityViolations(page);
});

test("directory filters are URL-backed and reversible", async ({ page }) => {
  await page.goto("/tools?category=Formatters");

  const formatters = page.getByRole("button", { name: "Formatters", exact: true });
  await expect(formatters).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("status").filter({ hasText: "13 tools" })).toBeVisible();

  await page.getByRole("button", { name: "Generators", exact: true }).click();
  await expect(page).toHaveURL(/category=Generators/);
  await expect(page.getByRole("button", { name: "Generators", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(formatters).toHaveAttribute("aria-pressed", "false");

  await page.goBack();
  await expect(page).toHaveURL(/category=Formatters/);
  await expect(formatters).toHaveAttribute("aria-pressed", "true");
});

test("empty search has one clear escape hatch", async ({ page }) => {
  await page.goto("/tools?q=not-a-real-tool");

  await expect(page.getByText("No tools match “not-a-real-tool”")).toBeVisible();
  await page.getByRole("button", { name: "Show all tools" }).click();

  await expect(page).toHaveURL(/\/tools$/);
  await expect(page.getByRole("status").filter({ hasText: "129 tools" })).toBeVisible();
});

test("homepage category index opens a filtered directory", async ({ page }) => {
  await page.goto("/");

  const index = page.getByRole("navigation", { name: "Index" });
  await index.getByRole("link", { name: /CSS Tools/ }).click();

  await expect
    .poll(async () => new URL(page.url()).searchParams.get("category"))
    .toBe("CSS Tools");
  await expect(page.getByRole("button", { name: "CSS Tools", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("tool pages expose breadcrumbs, notes and related tools", async ({ page }) => {
  await openTool(page, "json-formatter");

  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb.getByRole("link", { name: "Formatters" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tool notes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "More in Formatters" })).toBeVisible();
  await expect(page.getByRole("link", { name: /XML Formatter/ })).toBeVisible();

  await breadcrumb.getByRole("link", { name: "Formatters" }).click();
  await expect(page).toHaveURL(/\/tools\?category=Formatters$/);
  await expect(page.getByRole("button", { name: "Formatters", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expectNoAccessibilityViolations(page);
});

test("usage guide anchors and troubleshooting work", async ({ page }) => {
  await page.goto("/usage");

  const onThisPage = page.getByRole("navigation", { name: "On this page" });
  await onThisPage.getByRole("link", { name: /Keyboard shortcuts/ }).click();

  await expect(page).toHaveURL(/#keyboard$/);
  await expect(page.getByRole("heading", { name: "Keyboard shortcuts" })).toBeVisible();

  const details = page.locator("details", { hasText: "Copy does nothing" });
  await details.locator("summary").click();
  await expect(details.getByText("Clipboard writes need permission.")).toBeVisible();

  await expect(page.getByRole("link", { name: /Browse all 129 tools/ })).toBeVisible();
  await expectNoAccessibilityViolations(page);
});

test("cross-route hash links land on the named guide section", async ({ page }) => {
  await openTool(page, "json-formatter");
  await page.getByRole("link", { name: "How to use this tool" }).click();

  await expect(page).toHaveURL(/\/usage#work-with-a-tool$/);
  const sectionHeading = page.getByRole("heading", { name: "Work with a tool", level: 2 });
  await expect
    .poll(async () => sectionHeading.evaluate((element) => element.getBoundingClientRect().top))
    .toBeLessThan(160);
  await expect(page.locator("#main-content")).toBeFocused();

  await page.goto("/");
  await page.getByRole("link", { name: /Read the privacy notes/ }).click();

  await expect(page).toHaveURL(/\/usage#privacy$/);
  const privacyHeading = page.getByRole("heading", { name: "Privacy", level: 2 });
  await expect
    .poll(async () => privacyHeading.evaluate((element) => element.getBoundingClientRect().top))
    .toBeLessThan(160);
});

test.describe("mobile surfaces", () => {
  test.use({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true });

  test("every surface avoids page-level horizontal scroll", async ({ page }) => {
    for (const path of ["/", "/tools", "/usage", "/tool/json-formatter"]) {
      await page.goto(path);
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByText("Loading tool…")).toHaveCount(0);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});
