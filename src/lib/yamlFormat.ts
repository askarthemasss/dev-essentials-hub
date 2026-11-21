import { parseDocument } from "yaml";

export interface YamlFormatResult {
  output: string;
  error: string;
}

/**
 * Formats YAML and keeps parse failures out of the output pane. A string such
 * as "Invalid YAML: …" in the result looks like formatted output and gives
 * assistive technology nothing to announce.
 */
export function formatYaml(source: string): YamlFormatResult {
  if (!source.trim()) return { output: "", error: "" };

  try {
    const document = parseDocument(source);
    if (document.errors.length > 0) {
      return { output: "", error: formatError(document.errors[0].message) };
    }
    return { output: document.toString({ indent: 2, lineWidth: 0 }), error: "" };
  } catch (caught) {
    return {
      output: "",
      error: formatError(caught instanceof Error ? caught.message : "the document could not be parsed"),
    };
  }
}

function formatError(detail: string): string {
  return `Invalid YAML: ${detail.replace(/\.$/, "")}. Check indentation, quotes and colons.`;
}
