import { useState } from "react";
import { Input } from "@/components/ui/input";
import { determinant2x2, parseMatrixCell, transposeMatrix } from "@/lib/matrix";

const emptyMatrix = [
  ["1", "0"],
  ["0", "1"],
];

const MatrixCalcTool = () => {
  const [matrix, setMatrix] = useState(emptyMatrix);

  const update = (row: number, column: number, value: string) => {
    setMatrix((previous) =>
      previous.map((cells, rowIndex) =>
        rowIndex === row ? cells.map((cell, columnIndex) => (columnIndex === column ? value : cell)) : cells
      )
    );
  };

  const values = matrix.map((row) => row.map(parseMatrixCell));
  const determinant = determinant2x2(values);
  const transpose = transposeMatrix(values);

  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-1">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, columnIndex) => (
              <Input
                key={columnIndex}
                value={cell}
                inputMode="decimal"
                onChange={(event) => update(rowIndex, columnIndex, event.target.value)}
                className="w-20 text-center font-mono bg-secondary border-border"
                aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">Determinant: {determinant}</div>
      <div className="rounded bg-secondary p-3 font-mono text-sm">
        Transpose: [{transpose.map((row) => `[${row.join(",")}]`).join(",")}]
      </div>
    </div>
  );
};
export default MatrixCalcTool;
