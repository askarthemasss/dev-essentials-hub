import { tools, type Tool } from "./tools";

/**
 * Curated entry points for the homepage. Keep these as ids so the catalogue
 * remains the single source of truth for names, descriptions and icons.
 */
export const popularToolIds = [
  "json-formatter",
  "base64",
  "uuid-generator",
  "regex-tester",
  "jwt-decoder",
  "hash-generator",
  "json-diff",
  "color-contrast",
] as const;

export function getToolsByIds(ids: readonly string[]): Tool[] {
  return ids
    .map((id) => tools.find((tool) => tool.id === id))
    .filter((tool): tool is Tool => Boolean(tool));
}

export const popularTools = getToolsByIds(popularToolIds);
