import { expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/** Opens a tool route and waits for its lazy-loaded component to finish loading. */
export async function openTool(page: Page, toolId: string): Promise<void> {
  await page.goto(`/tool/${toolId}`);
  await expect(page.getByText("Loading tool…")).toHaveCount(0);
  await expect(page.getByText("Something broke")).toHaveCount(0);
}

/** Fails with a readable summary when the page has WCAG 2.0/2.1 A or AA violations. */
export async function expectNoAccessibilityViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const violations = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    nodes: violation.nodes.map((node) => node.target.join(" ")),
  }));

  expect(violations, "WCAG A/AA violations").toEqual([]);
}

/**
 * Fails when a form control relies on its placeholder or has no accessible
 * name. Axe accepts placeholders, so this guard is explicit.
 */
export async function expectNamedControls(page: Page): Promise<void> {
  const unnamed = await page.evaluate(() => {
    const controls = Array.from(
      document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        "input:not([type='hidden']), textarea, select",
      ),
    );

    return controls
      .filter((control) => {
        const ariaLabel = control.getAttribute("aria-label")?.trim();
        const labelledBy = control.getAttribute("aria-labelledby")?.trim();
        const title = control.getAttribute("title")?.trim();
        return !ariaLabel && !labelledBy && !title && !control.labels?.length;
      })
      .map((control) => {
        const type = control.getAttribute("type");
        const tag = `${control.tagName.toLowerCase()}${type ? `[${type}]` : ""}`;
        return `${tag} placeholder="${control.getAttribute("placeholder") ?? ""}"`;
      });
  });

  expect(unnamed, "form controls need a label or aria-label").toEqual([]);
}

/**
 * Collects uncaught page errors and console errors. Failed font/resource loads
 * are ignored because they do not affect tool behaviour.
 */
export function watchPageErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on("pageerror", (error) => {
    errors.push(`page error: ${error.message}`);
  });

  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (text.includes("Failed to load resource")) return;
    errors.push(`console error: ${text}`);
  });

  return errors;
}
