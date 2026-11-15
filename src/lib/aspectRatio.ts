export interface AspectRatio {
  width: number;
  height: number;
  divisor: number;
  simplifiedWidth: number;
  simplifiedHeight: number;
  decimal: number;
}

function gcd(a: number, b: number): number {
  let left = a;
  let right = b;
  while (right !== 0) {
    const remainder = left % right;
    left = right;
    right = remainder;
  }
  return left;
}

/**
 * Simplifies a positive whole-number width/height pair. Returns null instead of
 * recursing forever or producing NaN for empty, fractional or non-positive input.
 */
export function calculateAspectRatio(width: number, height: number): AspectRatio | null {
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width <= 0 || height <= 0) {
    return null;
  }

  const divisor = gcd(width, height);
  return {
    width,
    height,
    divisor,
    simplifiedWidth: width / divisor,
    simplifiedHeight: height / divisor,
    decimal: width / height,
  };
}
