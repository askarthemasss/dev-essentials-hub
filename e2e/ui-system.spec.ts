import { expect, test } from "@playwright/test";
import { expectNoAccessibilityViolations, expectNamedControls, openTool } from "./helpers";

const searchTools = (page: import("@playwright/test").Page) =>
  page.getByRole("combobox", { name: "Search developer tools" });

test.describe("catalogue shell", () => {
  test("quick search is visible, labelled and returns focus on Escape", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", { name: /Quick open/ });
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const input = searchTools(page);
    await expect(input).toBeFocused();
    await input.fill("uuid");
    await expect(page.getByRole("option", { name: /UUID Generator/ })).toBeVisible();
    await expectNoAccessibilityViolations(page);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("selecting a result moves focus to the tool page main region", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Quick open/ }).click();

    await searchTools(page).fill("uuid");
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/tool\/uuid-generator$/);
    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("skip link reveals and moves focus to the catalogue", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "Skip to main content" });
    await expect(skipLink).toBeVisible();
    await skipLink.press("Enter");

    await expect(page.locator("#main-content")).toBeFocused();
  });
});

test.describe("copy and validation feedback", () => {
  test("copy waits for the clipboard and announces success", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await openTool(page, "json-formatter");

    await page.locator("textarea").first().fill('{"name":"Ada"}');
    const copy = page.getByRole("button", { name: "Copy output to clipboard" });
    await copy.click();

    await expect(copy).toContainText("Copied");
    await expectNoAccessibilityViolations(page);
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain('"name": "Ada"');
  });

  test("copy reports a rejected clipboard write", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: () => Promise.reject(new Error("denied")) },
      });
    });
    await openTool(page, "json-formatter");

    await page.locator("textarea").first().fill('{"name":"Ada"}');
    const copy = page.getByRole("button", { name: "Copy output to clipboard" });
    await copy.click();

    await expect(copy).toContainText("Copy failed");
    await expect(
      page.getByText("Copy failed. Check clipboard permissions and try again."),
    ).toBeAttached();
  });

  test("invalid JSON shows an associated inline error, not fake output", async ({ page }) => {
    await openTool(page, "json-formatter");

    const input = page.locator("textarea").first();
    await input.fill('{"name": }');

    const error = page.getByRole("alert");
    await expect(error).toContainText("Invalid JSON");
    await expect(input).toHaveAttribute("aria-invalid", "true");

    const describedBy = await input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`[id="${describedBy}"]`)).toContainText("Check for a missing comma");

    await expect(page.locator("textarea").nth(1)).toHaveValue("");
    await expectNoAccessibilityViolations(page);
  });

  test("invalid YAML shows an associated inline error, not fake output", async ({ page }) => {
    await openTool(page, "yaml-formatter");

    const input = page.locator("textarea").first();
    await input.fill("name: [Ada\n");

    const error = page.getByRole("alert");
    await expect(error).toContainText("Invalid YAML");
    await expect(error).toContainText("Check indentation, quotes and colons.");
    await expect(input).toHaveAttribute("aria-invalid", "true");

    const describedBy = await input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`[id="${describedBy}"]`)).toContainText("Invalid YAML");
    await expect(page.locator("textarea").nth(1)).toHaveValue("");
    await expectNoAccessibilityViolations(page);
  });

  test("repeated-row inputs carry row-specific names", async ({ page }) => {
    await openTool(page, "env-generator");

    await expect(page.getByRole("textbox", { name: "Variable 1 key" })).toHaveValue("DATABASE_URL");
    await expect(page.getByRole("textbox", { name: "Variable 2 value" })).toBeVisible();

    await page.getByRole("button", { name: "Add Variable" }).click();
    await expect(page.getByRole("textbox", { name: "Variable 4 key" })).toBeVisible();
    await expectNoAccessibilityViolations(page);
  });

  test("read-only outputs carry descriptive names", async ({ page }) => {
    await openTool(page, "sitemap");

    await expect(page.getByRole("textbox", { name: "Sitemap XML output" })).toHaveValue(/<urlset/);
    await expectNamedControls(page);
  });

  test("invalid JSON in the diff shows an inline error, not output text", async ({ page }) => {
    await openTool(page, "json-diff");

    const original = page.getByRole("textbox", { name: "Original JSON" });
    const modified = page.getByRole("textbox", { name: "Modified JSON" });
    await original.fill('{"name": }');
    await modified.fill('{"name": "Bob"}');
    await page.getByRole("button", { name: "Compare" }).click();

    const error = page.getByRole("alert");
    await expect(error).toContainText("Original JSON is invalid");
    await expect(error).toContainText("Fix the syntax and compare again.");
    await expect(original).toHaveAttribute("aria-invalid", "true");
    await expect(modified).toHaveAttribute("aria-invalid", "false");

    const describedBy = await original.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`[id="${describedBy}"]`)).toContainText("Original JSON is invalid");
    await expect(page.locator("pre")).toContainText("No diff available until both JSON documents are valid.");

    await original.fill('{"name": "Alice"}');
    await page.getByRole("button", { name: "Compare" }).click();
    await expect(page.getByRole("alert")).toHaveCount(0);
    await expect(page.locator("pre")).toContainText('~ name: "Alice" → "Bob"');
    await expectNoAccessibilityViolations(page);
  });

  test("colour contrast marks only the invalid field", async ({ page }) => {
    await openTool(page, "color-contrast");

    const foreground = page.getByRole("textbox", { name: "Foreground hex color" });
    const background = page.getByRole("textbox", { name: "Background hex color" });
    await foreground.fill("not-a-color");

    await expect(foreground).toHaveAttribute("aria-invalid", "true");
    await expect(background).toHaveAttribute("aria-invalid", "false");
    await expect(page.getByRole("alert")).toContainText("Enter a foreground color");
    await expectNoAccessibilityViolations(page);
  });
});

test.describe("mobile controls", () => {
  test.use({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true });

  test("search and filters stay readable and tappable without overflow", async ({ page }) => {
    await page.goto("/tools");

    const search = page.getByRole("textbox", { name: /Search \d+ developer tools/ });
    await expect(search).toBeVisible();
    expect(await search.evaluate((element) => getComputedStyle(element).fontSize)).toBe("16px");

    const allChip = page.getByRole("button", { name: "All", exact: true });
    const chipBox = await allChip.boundingBox();
    expect(chipBox?.height ?? 0).toBeGreaterThanOrEqual(44);

    const star = page.getByRole("button", { name: /Add .* to favorites/ }).first();
    const starBox = await star.boundingBox();
    expect(starBox?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(starBox?.height ?? 0).toBeGreaterThanOrEqual(44);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the palette does not animate when motion is reduced", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Quick open/ }).click();

    const duration = await page.getByRole("dialog").evaluate((element) => {
      const value = getComputedStyle(element).animationDuration.split(",")[0].trim();
      return value.endsWith("ms") ? Number.parseFloat(value) / 1000 : Number.parseFloat(value);
    });

    expect(duration).toBeLessThan(0.01);
  });
});
