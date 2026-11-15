import { describe, expect, it } from "vitest";
import { formatToml, iniToToml, tomlToIni } from "./toml";

describe("formatToml", () => {
  it("normalizes spacing, sections and blank lines", () => {
    const source = `  name="demo" # app


[ database ]
host ="localhost"
port= 5432
`;
    expect(formatToml(source)).toBe(`name = "demo" # app

[database]
host = "localhost"
port = 5432`);
  });

  it("supports array tables and quoted hashes", () => {
    const source = `[[ products ]]
name = "a # b"
`;
    expect(formatToml(source)).toBe(`[[products]]
name = "a # b"`);
  });
});

describe("TOML and INI conversion", () => {
  it("converts TOML arrays without splitting commas inside strings", () => {
    const ini = tomlToIni(`[server]
allowed = ["a,b", "c"]
enabled = true`);
    expect(ini).toContain("allowed = a,b, c");
    expect(ini).toContain("enabled = true");
  });

  it("quotes INI values and escapes quotes when writing TOML", () => {
    const toml = iniToToml(`[app]
name = My "App"
port = 8080
debug = true
tags = one, two`);
    expect(toml).toContain('name = "My \\"App\\""');
    expect(toml).toContain("port = 8080");
    expect(toml).toContain("debug = true");
    expect(toml).toContain('tags = ["one", "two"]');
  });

  it("round-trips common values", () => {
    const toml = `[database]
host = "localhost"
port = 5432
ssl = true
names = ["a", "b"]`;
    expect(iniToToml(tomlToIni(toml))).toContain('host = "localhost"');
    expect(iniToToml(tomlToIni(toml))).toContain('names = ["a", "b"]');
  });
});
