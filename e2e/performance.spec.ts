import { expect, test } from "@playwright/test";

test("fonts are self-hosted and load without third-party requests", async ({ page }) => {
  const fontRequests: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "font") fontRequests.push(request.url());
  });

  await page.goto("/");

  const loadedFamilies = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts]
      .filter((font) => font.status === "loaded")
      .map((font) => font.family.replace(/["']/g, ""));
  });

  const pageOrigin = new URL(page.url()).origin;
  expect(fontRequests.length, "the page loads its fonts").toBeGreaterThan(0);
  expect(
    fontRequests.filter((url) => new URL(url).origin !== pageOrigin),
    "font requests stay on the app origin",
  ).toEqual([]);
  expect(loadedFamilies).toEqual(expect.arrayContaining(["Inter Variable", "JetBrains Mono Variable"]));
});
