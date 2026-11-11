import { createHmac, webcrypto } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  base64UrlDecodeText,
  base64UrlEncodeText,
  decodeJwt,
  signJwt,
} from "./jwt";

describe("JWT helpers", () => {
  beforeAll(() => {
    vi.stubGlobal("crypto", webcrypto);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it("round-trips UTF-8 through base64url", () => {
    const text = "héllo 世界 🚀";
    expect(base64UrlDecodeText(base64UrlEncodeText(text))).toBe(text);
  });

  it("decodes a real JWT without padding", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const decoded = decodeJwt(token);
    expect(decoded.header).toMatchObject({ alg: "HS256", typ: "JWT" });
    expect(decoded.payload).toMatchObject({ sub: "1234567890", name: "John Doe" });
    expect(decoded.signature).toBe("SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
  });

  it("rejects malformed tokens", () => {
    expect(() => decodeJwt("not-a-token")).toThrow("three dot-separated parts");
    expect(() => decodeJwt("a.b.c")).toThrow("Could not decode token");
  });

  it("signs HS256 tokens with a real HMAC", async () => {
    const header = '{"alg":"HS256","typ":"JWT"}';
    const payload = '{"sub":"123"}';
    const token = await signJwt(header, payload, "secret");
    const [encodedHeader, encodedPayload, signature] = token.split(".");
    const expected = createHmac("sha256", "secret").update(`${encodedHeader}.${encodedPayload}`).digest("base64url");

    expect(signature).toBe(expected);
    expect(signature).toHaveLength(43);
    expect(decodeJwt(token).payload).toEqual({ sub: "123" });
  });

  it("supports HS384 and HS512", async () => {
    const hs512 = await signJwt('{"alg":"HS512"}', '{"sub":"1"}', "secret");
    expect(hs512.split(".")[2]).toHaveLength(86);

    const hs384 = await signJwt('{"alg":"HS384"}', '{"sub":"1"}', "secret");
    expect(hs384.split(".")[2]).toHaveLength(64);
  });

  it("refuses insecure or invalid algorithms", async () => {
    await expect(signJwt('{"alg":"none"}', "{}", "secret")).rejects.toThrow("HS256, HS384 or HS512");
    await expect(signJwt('{"typ":"JWT"}', "{}", "secret")).rejects.toThrow("HS256, HS384 or HS512");
    await expect(signJwt('{"alg":"HS256"}', "{}", "")).rejects.toThrow("secret key");
  });
});
