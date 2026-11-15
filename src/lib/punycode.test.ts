import { describe, expect, it } from "vitest";
import { decodePunycodeDomain, decodePunycodeLabel, encodePunycodeDomain, encodePunycodeLabel } from "./punycode";

describe("punycode", () => {
  it("encodes internationalized labels", () => {
    expect(encodePunycodeLabel("bücher")).toBe("bcher-kva");
    expect(encodePunycodeLabel("münchen")).toBe("mnchen-3ya");
    expect(encodePunycodeLabel("mañana")).toBe("maana-pta");
  });

  it("decodes internationalized labels", () => {
    expect(decodePunycodeLabel("bcher-kva")).toBe("bücher");
    expect(decodePunycodeLabel("mnchen-3ya")).toBe("münchen");
    expect(decodePunycodeLabel("maana-pta")).toBe("mañana");
  });

  it("converts domains in both directions", () => {
    expect(encodePunycodeDomain("bücher.example")).toBe("xn--bcher-kva.example");
    expect(decodePunycodeDomain("xn--bcher-kva.example")).toBe("bücher.example");
    expect(encodePunycodeDomain("日本語.jp")).toBe("xn--wgv71a119e.jp");
    expect(decodePunycodeDomain("xn--wgv71a119e.jp")).toBe("日本語.jp");
  });

  it("leaves ASCII and already decoded domains alone", () => {
    expect(encodePunycodeDomain("Example.COM")).toBe("example.com");
    expect(decodePunycodeDomain("example.com")).toBe("example.com");
    expect(decodePunycodeDomain("xn--not-valid-.example")).toBe("not-valid.example");
    expect(decodePunycodeDomain("xn--.example")).toBe("xn--.example");
  });
});
