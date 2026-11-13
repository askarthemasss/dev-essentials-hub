import { describe, expect, it } from "vitest";
import {
  classifyIp,
  formatIPv6,
  getSubnet,
  parseCidr,
  parseIPv4,
  parseIPv6,
  parseIp,
} from "./ip";

describe("IP parsing", () => {
  it("parses and formats IPv4 addresses", () => {
    const value = parseIPv4("192.168.1.42");
    expect(value).not.toBeNull();
    expect(value?.toString()).toBe("3232235818");
    expect(parseIPv4("255.255.255.255")).toBe(4294967295n);
  });

  it("rejects invalid IPv4 addresses", () => {
    expect(parseIPv4("256.1.1.1")).toBeNull();
    expect(parseIPv4("192.168.1")).toBeNull();
    expect(parseIPv4("192.168.01.1")).toBeNull();
    expect(parseIPv4("example.com")).toBeNull();
  });

  it("parses compressed and embedded IPv6 addresses", () => {
    expect(parseIPv6("::1")).toBe(1n);
    expect(parseIPv6("2001:db8::1")).toBe(parseIPv6("2001:0db8:0000:0000:0000:0000:0000:0001"));
    expect(parseIPv6("::ffff:192.168.1.1")).toBe(0xffffc0a80101n);
    expect(parseIPv6("[2001:db8::1]")).not.toBeNull();
  });

  it("rejects invalid IPv6 addresses", () => {
    expect(parseIPv6("2001:db8:::1")).toBeNull();
    expect(parseIPv6("2001:db8::1::2")).toBeNull();
    expect(parseIPv6("12345::1")).toBeNull();
    expect(parseIPv6("not-an-ip")).toBeNull();
  });

  it("compresses IPv6 output using the longest zero run", () => {
    expect(formatIPv6(0x20010db8000000000000000000000001n)).toBe("2001:db8::1");
    expect(formatIPv6(0n)).toBe("::");
    expect(formatIPv6(1n)).toBe("::1");
  });

  it("normalizes and classifies addresses", () => {
    expect(parseIp("2001:0db8::1")?.normalized).toBe("2001:db8::1");
    const privateIp = parseIp("10.1.2.3");
    const publicIp = parseIp("8.8.8.8");
    expect(privateIp && classifyIp(privateIp)).toBe("Private (RFC 1918)");
    expect(publicIp && classifyIp(publicIp)).toBe("Public");
    const loopback6 = parseIp("::1");
    expect(loopback6 && classifyIp(loopback6)).toBe("Loopback");
  });
});

describe("subnet calculation", () => {
  it("calculates an IPv4 /24 network", () => {
    const parsed = parseIp("192.168.1.42");
    const details = parsed && getSubnet(parsed, 24);
    expect(details).not.toBeNull();
    expect(details).toMatchObject({
      cidr: "192.168.1.0/24",
      network: "192.168.1.0",
      lastAddress: "192.168.1.255",
      netmask: "255.255.255.0",
      wildcard: "0.0.0.255",
      firstUsable: "192.168.1.1",
      lastUsable: "192.168.1.254",
      totalAddresses: 256n,
      usableAddresses: 254n,
    });
  });

  it("handles point-to-point and host prefixes", () => {
    const parsed = parseIp("192.168.1.0");
    expect(parsed && getSubnet(parsed, 31)).toMatchObject({ usableAddresses: 2n, firstUsable: "192.168.1.0" });
    expect(parsed && getSubnet(parsed, 32)).toMatchObject({ usableAddresses: 1n, lastAddress: "192.168.1.0" });
  });

  it("calculates IPv6 ranges without a broadcast address", () => {
    const parsed = parseIp("2001:db8::1");
    const details = parsed && getSubnet(parsed, 64);
    expect(details).toMatchObject({
      cidr: "2001:db8::/64",
      network: "2001:db8::",
      netmask: "ffff:ffff:ffff:ffff::",
      lastAddress: "2001:db8::ffff:ffff:ffff:ffff",
      totalAddresses: 18446744073709551616n,
      usableAddresses: 18446744073709551616n,
    });
  });

  it("parses CIDR strings and rejects impossible prefixes", () => {
    expect(parseCidr("10.0.0.5/8")?.prefix).toBe(8);
    expect(parseCidr("2001:db8::1/128")?.prefix).toBe(128);
    expect(parseCidr("10.0.0.1/33")).toBeNull();
    expect(parseCidr("2001:db8::1/129")).toBeNull();
    expect(parseCidr("10.0.0.1")).toBeNull();
  });
});
