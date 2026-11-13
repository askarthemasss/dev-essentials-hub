export type JwtAlgorithm = "HS256" | "HS384" | "HS512";

const HASH_BY_ALGORITHM: Record<JwtAlgorithm, "SHA-256" | "SHA-384" | "SHA-512"> = {
  HS256: "SHA-256",
  HS384: "SHA-384",
  HS512: "SHA-512",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseJsonObject(text: string, label: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(text);
  if (!isRecord(parsed)) throw new Error(`${label} must be a JSON object`);
  return parsed;
}

export function base64UrlEncodeBytes(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlEncodeText(text: string): string {
  return base64UrlEncodeBytes(new TextEncoder().encode(text));
}

export function base64UrlDecodeText(part: string): string {
  const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export function decodeJwt(token: string): DecodedJwt {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("A JWT must have three dot-separated parts");

  let header: Record<string, unknown>;
  let payload: Record<string, unknown>;
  try {
    header = parseJsonObject(base64UrlDecodeText(parts[0]), "Header");
    payload = parseJsonObject(base64UrlDecodeText(parts[1]), "Payload");
  } catch (error) {
    throw new Error(`Could not decode token: ${error instanceof Error ? error.message : "invalid encoding"}`);
  }

  if (typeof header.alg !== "string") throw new Error('Token header is missing a string "alg" field');

  return { header, payload, signature: parts[2] };
}

/**
 * Signs a JWT with HMAC using the Web Crypto API. Only HS256/384/512 are
 * accepted so the token can never be produced with `alg: none`.
 */
export async function signJwt(headerText: string, payloadText: string, secret: string): Promise<string> {
  const header = parseJsonObject(headerText, "Header");
  const payload = parseJsonObject(payloadText, "Payload");

  const algorithm = header.alg;
  if (algorithm !== "HS256" && algorithm !== "HS384" && algorithm !== "HS512") {
    throw new Error('Header "alg" must be HS256, HS384 or HS512');
  }
  if (!secret) throw new Error("Enter a secret key to sign the token");

  const encoder = new TextEncoder();
  const signingKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: HASH_BY_ALGORITHM[algorithm] },
    false,
    ["sign"]
  );

  const encodedHeader = base64UrlEncodeText(JSON.stringify(header));
  const encodedPayload = base64UrlEncodeText(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = await crypto.subtle.sign("HMAC", signingKey, encoder.encode(unsignedToken));

  return `${unsignedToken}.${base64UrlEncodeBytes(new Uint8Array(signature))}`;
}
