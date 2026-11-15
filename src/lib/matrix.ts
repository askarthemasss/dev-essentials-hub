/** Parses a matrix cell, treating incomplete input such as "" or "-" as zero. */
export function parseMatrixCell(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function determinant2x2(matrix: number[][]): number {
  if (matrix.length !== 2 || matrix.some((row) => row.length !== 2)) {
    throw new Error("Expected a 2x2 matrix");
  }
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

export function transposeMatrix(matrix: number[][]): number[][] {
  if (matrix.length === 0) return [];
  return matrix[0].map((_, column) => matrix.map((row) => row[column]));
}
