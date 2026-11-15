import { expect, test, type Page } from "@playwright/test";
import { openTool } from "./helpers";

const textareas = (page: Page) => page.locator("textarea");
const firstTextarea = (page: Page) => textareas(page).nth(0);
const outputTextarea = (page: Page) => textareas(page).nth(1);

const statValue = (page: Page, label: string) =>
  page.getByText(label, { exact: true }).locator("..").locator(".text-2xl");

test.describe("converter direction switches", () => {
  test("Base64 carries output forward and recovers from errors", async ({ page }) => {
    await openTool(page, "base64");

    await firstTextarea(page).fill("hello");
    await expect(outputTextarea(page)).toHaveValue("aGVsbG8=");

    await page.getByRole("button", { name: "Decode", exact: true }).click();
    await expect(firstTextarea(page)).toHaveValue("aGVsbG8=");
    await expect(outputTextarea(page)).toHaveValue("hello");

    await firstTextarea(page).fill("a");
    await expect(outputTextarea(page)).toHaveValue("Error: Invalid input");

    await page.getByRole("button", { name: "Encode", exact: true }).click();
    await expect(firstTextarea(page)).toHaveValue("a");
    await expect(outputTextarea(page)).toHaveValue("YQ==");
  });

  test("Morse switches direction and tolerates irregular spacing", async ({ page }) => {
    await openTool(page, "morse-code");

    await firstTextarea(page).fill("SOS");
    await expect(outputTextarea(page)).toHaveValue("... --- ...");

    await page.getByRole("button", { name: "From Morse", exact: true }).click();
    await expect(firstTextarea(page)).toHaveValue("... --- ...");
    await expect(outputTextarea(page)).toHaveValue("SOS");

    await firstTextarea(page).fill("...   ---   ...");
    await expect(outputTextarea(page)).toHaveValue("SOS");
  });

  test("JSON ↔ YAML carries output into the new input", async ({ page }) => {
    await openTool(page, "json-yaml");

    await firstTextarea(page).fill('{"name":"Alice"}');
    await page.getByRole("button", { name: "YAML → JSON", exact: true }).click();

    await expect(firstTextarea(page)).toHaveValue(/name: Alice/);
    expect(JSON.parse(await outputTextarea(page).inputValue())).toEqual({ name: "Alice" });
  });

  test("JSON ↔ XML carries output into the new input", async ({ page }) => {
    await openTool(page, "json-xml");

    await firstTextarea(page).fill('{"user":{"name":"Alice"}}');
    await page.getByRole("button", { name: "XML → JSON", exact: true }).click();

    await expect(firstTextarea(page)).toHaveValue(/<user>/);
    expect(JSON.parse(await outputTextarea(page).inputValue())).toEqual({
      root: { user: { name: "Alice" } },
    });
  });

  test("JSON ↔ CSV carries output into the new input", async ({ page }) => {
    await openTool(page, "json-csv");

    await firstTextarea(page).fill('[{"a":1,"b":2},{"a":3,"b":4}]');
    await page.getByRole("button", { name: "CSV → JSON", exact: true }).click();

    await expect(firstTextarea(page)).toHaveValue(/a,b/);
    expect(JSON.parse(await outputTextarea(page).inputValue())).toEqual([
      { a: "1", b: "2" },
      { a: "3", b: "4" },
    ]);
  });

  test("TOML ↔ INI carries output into the new input", async ({ page }) => {
    await openTool(page, "toml-ini");

    await page.getByRole("button", { name: "INI → TOML", exact: true }).click();

    await expect(firstTextarea(page)).toHaveValue(/\[database\]/);
    await expect(firstTextarea(page)).toHaveValue(/host = localhost/);
    await expect(outputTextarea(page)).toHaveValue(/host = "localhost"/);
  });
});

test.describe("formatting and text tools", () => {
  test("async formatters load their dependencies on demand", async ({ page }) => {
    await openTool(page, "js-beautifier");
    await firstTextarea(page).fill("const value={a:1};");
    await expect(outputTextarea(page)).toHaveValue(/const value = \{ a: 1 \};/);

    await openTool(page, "js-minifier");
    await firstTextarea(page).fill("const total = 1 + 2;");
    await expect(outputTextarea(page)).toHaveValue("const total=3;");
  });

  test("XML formatter keeps > inside quoted attributes", async ({ page }) => {
    await openTool(page, "xml-formatter");

    await firstTextarea(page).fill('<root><node title="a > b">value</node><item/></root>');

    await expect(outputTextarea(page)).toHaveValue(
      ['<root>', '  <node title="a > b">value</node>', "  <item/>", "</root>"].join("\n")
    );
  });

  test("HTML entity decoder preserves literal markup", async ({ page }) => {
    await openTool(page, "html-entity");
    await page.getByRole("button", { name: "Decode", exact: true }).click();

    await firstTextarea(page).fill("&lt;b&gt;hi&lt;/b&gt; &amp; bye");

    await expect(outputTextarea(page)).toHaveValue("<b>hi</b> & bye");
  });

  test("Text diff marks a single insertion without shifting later lines", async ({ page }) => {
    await openTool(page, "text-diff");

    await firstTextarea(page).fill("a\nc");
    await outputTextarea(page).fill("a\nb\nc");

    const lines = await page
      .locator("div.rounded.bg-secondary.p-3.font-mono.text-sm.space-y-1 > div")
      .allTextContents();

    expect(lines).toEqual(["  a", "+ b", "  c"]);
  });

  test("character and word counters count grapheme clusters", async ({ page }) => {
    await openTool(page, "char-counter");
    await firstTextarea(page).fill("a👍");
    await expect(statValue(page, "With spaces")).toHaveText("2");
    await expect(statValue(page, "Without spaces")).toHaveText("2");

    await openTool(page, "word-counter");
    await firstTextarea(page).fill("👨‍👩‍👧‍👦");
    await expect(statValue(page, "Characters")).toHaveText("1");
  });
});

test.describe("numeric and calculation tools", () => {
  test("matrix calculator accepts negative decimals", async ({ page }) => {
    await openTool(page, "matrix-calc");

    await page.getByLabel("Row 1, column 1").fill("-2");
    await page.getByLabel("Row 1, column 2").fill("0.5");
    await page.getByLabel("Row 2, column 1").fill("4");
    await page.getByLabel("Row 2, column 2").fill("3");

    await expect(page.getByText("Determinant: -8")).toBeVisible();
    await expect(page.getByText("Transpose: [[-2,4],[0.5,3]]")).toBeVisible();
  });

  test("angle converter shows a placeholder for invalid input", async ({ page }) => {
    await openTool(page, "angle-converter");

    await page.locator("input").first().fill("");

    await expect(page.getByText("Radians: —", { exact: true })).toBeVisible();
    await expect(page.getByText("Gradians: —", { exact: true })).toBeVisible();
  });

  test("temperature converter shows a placeholder for invalid input", async ({ page }) => {
    await openTool(page, "temperature");

    await page.locator("input").first().fill("");

    await expect(page.getByText("Fahrenheit: —°F", { exact: true })).toBeVisible();
    await expect(page.getByText("Kelvin: — K", { exact: true })).toBeVisible();
  });

  test("percentage calculator shows placeholders for invalid input", async ({ page }) => {
    await openTool(page, "percentage-calc");

    await page.locator("input").first().fill("");

    await expect(page.locator("body")).toContainText("= —");
    await expect(page.locator("body")).toContainText("is —%");
  });

  test("byte calculator shows a placeholder for invalid input", async ({ page }) => {
    await openTool(page, "byte-calc");

    await page.locator("input").first().fill("");

    await expect(page.getByText("Bits: —", { exact: true })).toBeVisible();
  });

  test("CSS unit converter shows a placeholder for invalid input", async ({ page }) => {
    await openTool(page, "css-units");

    await page.locator("input").first().fill("abc");

    await expect(page.getByText("rem", { exact: true }).locator("..")).toContainText("—");
  });

  test("timestamp tools seed local datetime values", async ({ page }) => {
    await openTool(page, "timestamp-diff");

    const difference = await page.evaluate(() => {
      const inputs = [...document.querySelectorAll<HTMLInputElement>('input[type="datetime-local"]')];
      return {
        start: new Date(inputs[0].value).getTime(),
        end: new Date(inputs[1].value).getTime(),
        now: Date.now(),
      };
    });

    expect(Math.abs(difference.start - difference.now)).toBeLessThan(120_000);
    expect(Math.abs(difference.end - (difference.now + 7 * 86_400_000))).toBeLessThan(120_000);

    await openTool(page, "unix-timestamp");
    const unix = await page.evaluate(() => {
      const input = document.querySelector<HTMLInputElement>("#unix-date");
      return { value: input?.value ?? "", now: Date.now() };
    });

    expect(Math.abs(new Date(unix.value).getTime() - unix.now)).toBeLessThan(120_000);
  });
});

test.describe("generator safeguards", () => {
  test("grid generator clamps invalid counts", async ({ page }) => {
    await openTool(page, "grid-generator");

    await page.getByRole("spinbutton").nth(0).fill("0");
    await page.getByRole("spinbutton").nth(1).fill("-4");
    await page.getByRole("spinbutton").nth(2).fill("999");

    const css = page.locator("pre");
    await expect(css).toContainText("grid-template-columns: repeat(1, 1fr)");
    await expect(css).toContainText("grid-template-rows: repeat(1, 1fr)");
    await expect(css).toContainText("gap: 50px");
  });

  test("Lorem Ipsum clamps a zero count to one paragraph", async ({ page }) => {
    await openTool(page, "lorem-ipsum");

    await page.locator('input[type="number"]').fill("0");
    const output = await firstTextarea(page).inputValue();

    expect(output.trim().length).toBeGreaterThan(0);
    expect(output).not.toContain("\n\n");
  });

  test("Dockerfile generator uses Debian user commands for Python", async ({ page }) => {
    await openTool(page, "dockerfile-gen");

    await expect(page.locator("textarea")).toHaveValue(/addgroup -S appgroup/);

    await page.getByRole("combobox").click();
    await page.getByRole("option", { name: "python", exact: true }).click();

    const dockerfile = page.locator("textarea");
    await expect(dockerfile).toHaveValue(/FROM python:3.12-slim/);
    await expect(dockerfile).toHaveValue(/groupadd --system appgroup/);
    await expect(dockerfile).toHaveValue(/useradd --system/);
    await expect(dockerfile).not.toHaveValue(/addgroup -S/);
  });
});
