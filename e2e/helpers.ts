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
