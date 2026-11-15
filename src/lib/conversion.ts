const FAILURE_PREFIX = /^(?:Error:|Invalid|Could not|Input must)/;

/**
 * Returns true when a conversion result can safely be used as the input for
 * the reverse conversion. Error messages must never be fed back as data.
 */
export function isConversionResult(output: string): boolean {
  const trimmed = output.trim();
  return trimmed.length > 0 && !FAILURE_PREFIX.test(trimmed);
}
