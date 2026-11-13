export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-512";

const CHECKSUM_LENGTHS: Record<HashAlgorithm, number> = {
  "SHA-1": 40,
  "SHA-256": 64,
  "SHA-512": 128,
};

export interface ParsedChecksum {
  /** Lowercase hexadecimal digest, or an empty string when the input is empty/invalid. */
  value: string;
  /** Human-readable reason when the input is non-empty but malformed. */
  error: string;
}

/**
 * Parses the common published-checksum formats:
 *
 *   <hash>
 *   sha256:<hash>
 *   sha256:<hash>  filename
 *   SHA256 (filename) = <hash>
 *
 * Unlike a permissive sanitizer, this rejects non-hex characters and wrong
 * lengths so a typo can never normalize into the computed digest.
 */
export function parseExpectedChecksum(raw: string, algorithm: HashAlgorithm): ParsedChecksum {
  const trimmed = raw.trim();
  if (!trimmed) return { value: "", error: "" };

  const expectedLength = CHECKSUM_LENGTHS[algorithm];

  const bsd = /^sha-?(?:1|256|512)\s*\([^)]*\)\s*=\s*(\S+)\s*$/i.exec(trimmed);
  let token: string;
  if (bsd) {
    token = bsd[1];
  } else {
    const withoutPrefix = trimmed.replace(/^sha-?(?:1|256|512)[:=]?\s*/i, "");
    token = withoutPrefix.split(/\s+/)[0] ?? "";
  }

  if (!/^[a-f0-9]+$/i.test(token)) {
    return {
      value: "",
      error: "Expected checksum must contain only hexadecimal characters.",
    };
  }

  if (token.length !== expectedLength) {
    return {
      value: "",
      error: `A ${algorithm} checksum must be ${expectedLength} hexadecimal characters (got ${token.length}).`,
    };
  }

  return { value: token.toLowerCase(), error: "" };
}
