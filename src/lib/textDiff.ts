export type DiffLine =
  | { type: "same"; text: string }
  | { type: "add"; text: string }
  | { type: "remove"; text: string };

/**
 * Line diff based on the longest common subsequence. Inserting a line only
 * marks that line as added instead of shifting every following line.
 */
export function diffLines(original: string, modified: string): DiffLine[] {
  const before = original.split("\n");
  const after = modified.split("\n");

  if (original === modified) {
    return before.map((text) => ({ type: "same", text }));
  }

  const rows = before.length;
  const columns = after.length;
  const lengths: number[][] = Array.from({ length: rows + 1 }, () =>
    Array.from({ length: columns + 1 }, () => 0)
  );

  for (let row = rows - 1; row >= 0; row -= 1) {
    for (let column = columns - 1; column >= 0; column -= 1) {
      lengths[row][column] =
        before[row] === after[column]
          ? lengths[row + 1][column + 1] + 1
          : Math.max(lengths[row + 1][column], lengths[row][column + 1]);
    }
  }

  const result: DiffLine[] = [];
  let row = 0;
  let column = 0;

  while (row < rows && column < columns) {
    if (before[row] === after[column]) {
      result.push({ type: "same", text: before[row] });
      row += 1;
      column += 1;
    } else if (lengths[row + 1][column] >= lengths[row][column + 1]) {
      result.push({ type: "remove", text: before[row] });
      row += 1;
    } else {
      result.push({ type: "add", text: after[column] });
      column += 1;
    }
  }

  while (row < rows) {
    result.push({ type: "remove", text: before[row] });
    row += 1;
  }
  while (column < columns) {
    result.push({ type: "add", text: after[column] });
    column += 1;
  }

  return result;
}
