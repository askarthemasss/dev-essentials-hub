import { describe, expect, it } from "vitest";
import { formatMacAddress } from "./mac";

describe("formatMacAddress", () => {
  it("formats common MAC address separators", () => {
    const expected = {
      normalized: "AABBCCDDEEFF",
      colon: "AA:BB:CC:DD:EE:FF",
      dash: "AA-BB-CC-DD-EE-FF",
      dot: "AABB.CCDD.EEFF",
      raw: "AABBCCDDEEFF",
    };
    expect(formatMacAddress("AA:BB:CC:DD:EE:FF")).toEqual(expected);
    expect(formatMacAddress("aa-bb-cc-dd-ee-ff")).toEqual(expected);
    expect(formatMacAddress("aabb.ccdd.eeff")).toEqual(expected);
    expect(formatMacAddress("AA BB CC DD EE FF")).toEqual(expected);
  });

  it("rejects the wrong length or non-hexadecimal characters", () => {
    for (const value of ["", "AA:BB:CC:DD:EE", "AA:BB:CC:DD:EE:FF:00", "GG:BB:CC:DD:EE:FF", "AA:BB:CC:DD:EE:F"]) {
      expect(formatMacAddress(value)).toBeNull();
    }
  });
});
