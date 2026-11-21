export interface JsonFormatResult {
  output: string;
  error: string;
}

/**
 * Formats JSON and keeps parse failures separate from the output. A tool that
 * writes "Invalid JSON" into the result pane looks like valid output and has
 * no error state for assistive technology.
 */
export function formatJson(source: string): JsonFormatResult {
  if (!source.trim()) return { output: "", error: "" };

  try {
    return { output: JSON.stringify(JSON.parse(source), null, 2), error: "" };
  } catch (caught) {
    const detail = caught instanceof Error ? caught.message : "the document could not be parsed";
    return {
      output: "",
      error: `Invalid JSON: ${detail}. Check for a missing comma, quote or bracket.`,
    };
  }
}
