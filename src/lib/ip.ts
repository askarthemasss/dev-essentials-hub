export interface ParsedIp {
  version: 4 | 6;
  value: bigint;
  normalized: string;
}

export interface SubnetDetails {
  version: 4 | 6;
  cidr: string;
  prefix: number;
  network: string;
  lastAddress: string;
  netmask: string;
  wildcard: string;
  firstUsable: string;
  lastUsable: string;
  totalAddresses: bigint;
  usableAddresses: bigint;
}

const IPV4_BITS = 32n;
const IPV6_BITS = 128n;
const IPV4_MAX = (1n << IPV4_BITS) - 1n;
const IPV6_MAX = (1n << IPV6_BITS) - 1n;

export function parseIPv4(input: string): bigint | null {
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(input.trim());
  if (!match) return null;

  let value = 0n;
  for (let index = 1; index <= 4; index += 1) {
    const part = match[index];
    // Leading zeros are ambiguous (octal-looking) and rejected by most parsers.
    if (part.length > 1 && part.startsWith("0")) return null;
    const octet = Number(part);
    if (!Number.isInteger(octet) || octet < 0 || octet > 255) return null;
    value = (value << 8n) | BigInt(octet);
  }
  return value;
}

export function formatIPv4(value: bigint): string {
  if (value < 0n || value > IPV4_MAX) throw new Error("IPv4 address out of range");
  return [24n, 16n, 8n, 0n].map((shift) => Number((value >> shift) & 0xffn)).join(".");
}

export function parseIPv6(input: string): bigint | null {
  let address = input.trim().toLowerCase();
  if (!address.includes(":")) return null;

  if (address.startsWith("[") && address.endsWith("]")) address = address.slice(1, -1);
  const zoneIndex = address.indexOf("%");
  if (zoneIndex !== -1) address = address.slice(0, zoneIndex);

  // Rewrite an embedded IPv4 tail (e.g. ::ffff:192.168.1.1) as two hex groups.
  const lastColon = address.lastIndexOf(":");
  const lastPart = address.slice(lastColon + 1);
  if (lastPart.includes(".")) {
    const embedded = parseIPv4(lastPart);
    if (embedded === null) return null;
    address =
      address.slice(0, lastColon + 1) +
      (embedded >> 16n).toString(16) +
      ":" +
      (embedded & 0xffffn).toString(16);
  }

  const halves = address.split("::");
  if (halves.length > 2) return null;

  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];

  if (halves.length === 1 && head.length !== 8) return null;
  if (halves.length === 2 && head.length + tail.length > 7) return null;

  const groups =
    halves.length === 2
      ? [...head, ...Array<string>(8 - head.length - tail.length).fill("0"), ...tail]
      : head;

  let value = 0n;
  for (const group of groups) {
    if (!/^[0-9a-f]{1,4}$/.test(group)) return null;
    value = (value << 16n) | BigInt(parseInt(group, 16));
  }
  return value;
}

/** RFC 5952-style compression: lowercase, no leading zeroes, longest zero run as :: */
export function formatIPv6(value: bigint): string {
  if (value < 0n || value > IPV6_MAX) throw new Error("IPv6 address out of range");
  const groups = Array.from({ length: 8 }, (_, index) =>
    Number((value >> BigInt((7 - index) * 16)) & 0xffffn).toString(16)
  );

  let bestStart = -1;
  let bestLength = 1;
  for (let index = 0; index < groups.length; index += 1) {
    if (groups[index] !== "0") continue;
    let end = index;
    while (end < groups.length && groups[end] === "0") end += 1;
    const length = end - index;
    if (length > bestLength) {
      bestStart = index;
      bestLength = length;
    }
    index = end;
  }

  if (bestStart === -1) return groups.join(":");
  const before = groups.slice(0, bestStart).join(":");
  const after = groups.slice(bestStart + bestLength).join(":");
  if (!before && !after) return "::";
  if (!before) return `::${after}`;
  if (!after) return `${before}::`;
  return `${before}::${after}`;
}

export function parseIp(input: string): ParsedIp | null {
  const ipv4 = parseIPv4(input);
  if (ipv4 !== null) return { version: 4, value: ipv4, normalized: formatIPv4(ipv4) };

  const ipv6 = parseIPv6(input);
  if (ipv6 !== null) return { version: 6, value: ipv6, normalized: formatIPv6(ipv6) };

  return null;
}

function subnetMask(prefix: number, bits: bigint): bigint {
  if (prefix === 0) return 0n;
  return ((1n << BigInt(prefix)) - 1n) << (bits - BigInt(prefix));
}

function matchesIPv4(value: bigint, cidr: string, prefix: number): boolean {
  const network = parseIPv4(cidr);
  if (network === null) return false;
  return (value & subnetMask(prefix, IPV4_BITS)) === network;
}

function matchesIPv6(value: bigint, network: string, prefix: number): boolean {
  const parsed = parseIPv6(network);
  if (parsed === null) return false;
  return (value & subnetMask(prefix, IPV6_BITS)) === parsed;
}

export function classifyIp(ip: ParsedIp): string {
  if (ip.version === 4) {
    const value = ip.value;
    if (matchesIPv4(value, "0.0.0.0", 8)) return "This network";
    if (matchesIPv4(value, "10.0.0.0", 8)) return "Private (RFC 1918)";
    if (matchesIPv4(value, "172.16.0.0", 12)) return "Private (RFC 1918)";
    if (matchesIPv4(value, "192.168.0.0", 16)) return "Private (RFC 1918)";
    if (matchesIPv4(value, "127.0.0.0", 8)) return "Loopback";
    if (matchesIPv4(value, "169.254.0.0", 16)) return "Link-local";
    if (matchesIPv4(value, "100.64.0.0", 10)) return "Carrier-grade NAT";
    if (matchesIPv4(value, "192.0.2.0", 24) || matchesIPv4(value, "198.51.100.0", 24) ||
        matchesIPv4(value, "203.0.113.0", 24)) return "Documentation";
    if (matchesIPv4(value, "198.18.0.0", 15)) return "Benchmarking";
    if (matchesIPv4(value, "224.0.0.0", 4)) return "Multicast";
    if (matchesIPv4(value, "240.0.0.0", 4)) return "Reserved";
    return "Public";
  }

  if (ip.value === 0n) return "Unspecified";
  if (ip.value === 1n) return "Loopback";
  if ((ip.value >> 32n) === 0xffffn) return "IPv4-mapped";
  if ((ip.value >> 121n) === 0b1111110n) return "Unique local (fc00::/7)";
  if ((ip.value >> 118n) === 0b1111111010n) return "Link-local (fe80::/10)";
  if ((ip.value >> 120n) === 0xffn) return "Multicast";
  if (matchesIPv6(ip.value, "2001:db8::", 32)) return "Documentation";
  return "Global unicast";
}

export function parseCidr(input: string): { ip: ParsedIp; prefix: number } | null {
  const trimmed = input.trim();
  const slash = trimmed.lastIndexOf("/");
  if (slash === -1) return null;

  const prefixText = trimmed.slice(slash + 1);
  if (!/^\d{1,3}$/.test(prefixText)) return null;

  const ip = parseIp(trimmed.slice(0, slash));
  if (!ip) return null;

  const prefix = Number(prefixText);
  const maxPrefix = ip.version === 4 ? 32 : 128;
  if (prefix > maxPrefix) return null;

  return { ip, prefix };
}

export function getSubnet(ip: ParsedIp, prefix: number): SubnetDetails | null {
  const bits = ip.version === 4 ? IPV4_BITS : IPV6_BITS;
  const maxPrefix = ip.version === 4 ? 32 : 128;
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > maxPrefix) return null;

  const totalAddresses = 1n << (bits - BigInt(prefix));
  const mask = subnetMask(prefix, bits);
  const networkValue = ip.value & mask;
  const lastValue = networkValue | (totalAddresses - 1n);
  const format = ip.version === 4 ? formatIPv4 : formatIPv6;

  let firstUsableValue = networkValue;
  let lastUsableValue = lastValue;
  let usableAddresses = totalAddresses;

  if (ip.version === 4) {
    if (prefix >= 31) {
      usableAddresses = totalAddresses;
    } else {
      firstUsableValue = networkValue + 1n;
      lastUsableValue = lastValue - 1n;
      usableAddresses = totalAddresses - 2n;
    }
  }

  return {
    version: ip.version,
    cidr: `${format(networkValue)}/${prefix}`,
    prefix,
    network: format(networkValue),
    lastAddress: format(lastValue),
    netmask: format(mask),
    wildcard: format((ip.version === 4 ? IPV4_MAX : IPV6_MAX) ^ mask),
    firstUsable: format(firstUsableValue),
    lastUsable: format(lastUsableValue),
    totalAddresses,
    usableAddresses,
  };
}
