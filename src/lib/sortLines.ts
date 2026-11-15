import { shuffleSecure } from "./random";

export type SortMode = "asc" | "desc" | "numeric-asc" | "numeric-desc" | "random";

function compareAlphabetically(first: string, second: string): number {
  return first.localeCompare(second, undefined, { sensitivity: "base" });
}

function numericValue(line: string): number | null {
  const match = line.match(/[+-]?(?:\d+\.?\d*|\.\d+)/);
  if (!match) return null;
  const value = Number(match[0]);
  return Number.isFinite(value) ? value : null;
}

export function sortLines(text: string, mode: SortMode): string {
  const lines = text.split("\n");

  if (mode === "random") return shuffleSecure(lines).join("\n");

  const sorted = [...lines].sort((first, second) => {
    if (mode === "numeric-asc" || mode === "numeric-desc") {
      const firstValue = numericValue(first);
      const secondValue = numericValue(second);
      if (firstValue !== null && secondValue !== null) {
        return mode === "numeric-asc" ? firstValue - secondValue : secondValue - firstValue;
      }
      if (firstValue !== null) return -1;
      if (secondValue !== null) return 1;
    }

    const comparison = compareAlphabetically(first, second);
    return mode === "desc" ? -comparison : comparison;
  });

  return sorted.join("\n");
}
