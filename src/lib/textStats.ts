type GraphemeSegmenter = {
  segment(input: string): Iterable<{ segment: string }>;
};

type SegmenterConstructor = new (
  locales?: string | string[],
  options?: { granularity: "grapheme" }
) => GraphemeSegmenter;

const Segmenter = (Intl as unknown as { Segmenter?: SegmenterConstructor }).Segmenter;
const segmenter = Segmenter ? new Segmenter(undefined, { granularity: "grapheme" }) : null;

/**
 * Counts user-visible characters. Falls back to code points in runtimes
 * without Intl.Segmenter, which is still better than UTF-16 code units.
 */
export function countGraphemes(value: string): number {
  if (!value) return 0;
  if (segmenter) {
    let count = 0;
    for (const _segment of segmenter.segment(value)) count += 1;
    return count;
  }
  return Array.from(value).length;
}

export function countCharactersWithoutWhitespace(value: string): number {
  return countGraphemes(value.replace(/\s/gu, ""));
}

export function countWords(value: string): number {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}

export function countSentences(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  return trimmed.split(/[.!?]+(?:\s+|$)/u).filter((part) => part.trim().length > 0).length;
}

export function countParagraphs(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\n\s*\n/u).filter((part) => part.trim().length > 0).length;
}
