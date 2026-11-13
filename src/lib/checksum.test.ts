import { describe, expect, it } from "vitest";
import { parseExpectedChecksum } from "./checksum";

const SHA1 = "a9993e364706816aba3e25717850c26c9cd0d89d";
const SHA256 = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
const SHA512 =
  "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f";

describe("parseExpectedChecksum", () => {
  it("accepts bare, prefixed and GNU-style digests", () => {
    expect(parseExpectedChecksum(SHA256, "SHA-256")).toEqual({ value: SHA256, error: "" });
    expect(parseExpectedChecksum(`sha256:${SHA256}`, "SHA-256")).toEqual({ value: SHA256, error: "" });
    expect(parseExpectedChecksum(`sha-256: ${SHA256}`, "SHA-256")).toEqual({ value: SHA256, error: "" });
    expect(parseExpectedChecksum(`${SHA256}  archive.tar.gz`, "SHA-256")).toEqual({
      value: SHA256,
      error: "",
    });
  });

  it("accepts BSD-style checksum output", () => {
    expect(parseExpectedChecksum(`SHA256 (archive.tar.gz) = ${SHA256}`, "SHA-256")).toEqual({
      value: SHA256,
      error: "",
    });
  });

  it("normalizes uppercase hex to lowercase", () => {
    expect(parseExpectedChecksum(SHA1.toUpperCase(), "SHA-1")).toEqual({ value: SHA1, error: "" });
    expect(parseExpectedChecksum(SHA512.toUpperCase(), "SHA-512")).toEqual({ value: SHA512, error: "" });
  });

  it("rejects non-hex characters instead of stripping them", () => {
    // This typo used to be sanitized back into a valid digest.
    expect(parseExpectedChecksum(`${SHA256}z`, "SHA-256")).toEqual({
      value: "",
      error: "Expected checksum must contain only hexadecimal characters.",
    });
    expect(parseExpectedChecksum(`sha256:${SHA256.slice(0, 32)}-${SHA256.slice(32)}`, "SHA-256")).toEqual({
      value: "",
      error: "Expected checksum must contain only hexadecimal characters.",
    });
  });

  it("rejects digests that do not match the selected algorithm", () => {
    expect(parseExpectedChecksum(SHA1, "SHA-256")).toEqual({
      value: "",
      error: "A SHA-256 checksum must be 64 hexadecimal characters (got 40).",
    });
    expect(parseExpectedChecksum(SHA256, "SHA-512").value).toBe("");
  });

  it("treats empty input as untouched rather than invalid", () => {
    expect(parseExpectedChecksum("", "SHA-256")).toEqual({ value: "", error: "" });
    expect(parseExpectedChecksum("   ", "SHA-1")).toEqual({ value: "", error: "" });
  });
});
