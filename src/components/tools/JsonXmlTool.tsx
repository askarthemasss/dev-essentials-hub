import { useState } from "react";
import DualPane from "./DualPane";
import { Button } from "@/components/ui/button";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sanitizeTag(name: string): string {
  const sanitized = name.trim().replace(/[^a-zA-Z0-9_.-]/g, "_");
  if (!sanitized) return "item";
  return /^[a-zA-Z_]/.test(sanitized) ? sanitized : `_${sanitized}`;
}

function toXml(value: unknown, tag: string, indent: string): string {
  if (value === null || value === undefined) return `${indent}<${tag}/>`;

  if (Array.isArray(value)) {
    if (value.length === 0) return `${indent}<${tag}/>`;
    return value.map((item) => toXml(item, tag, indent)).join("\n");
  }

  if (isRecord(value)) {
    const entries = Object.entries(value);
    if (entries.length === 0) return `${indent}<${tag}/>`;
    const children = entries.map(([key, child]) => toXml(child, sanitizeTag(key), `${indent}  `)).join("\n");
    return `${indent}<${tag}>\n${children}\n${indent}</${tag}>`;
  }

  return `${indent}<${tag}>${escapeXml(String(value))}</${tag}>`;
}

function jsonToXml(source: string): string {
  const parsed: unknown = JSON.parse(source);
  let body: string;

  if (Array.isArray(parsed)) {
    body = parsed.map((item) => toXml(item, "item", "  ")).join("\n");
  } else if (isRecord(parsed)) {
    body = Object.entries(parsed)
      .map(([key, value]) => toXml(value, sanitizeTag(key), "  "))
      .join("\n");
  } else {
    body = toXml(parsed, "value", "  ");
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${body}\n</root>`;
}

function elementToValue(element: Element): unknown {
  const children = Array.from(element.children);
  if (children.length === 0) return (element.textContent ?? "").trim();

  const result: Record<string, unknown> = {};
  for (const child of children) {
    const key = child.tagName;
    const value = elementToValue(child);
    if (!(key in result)) {
      result[key] = value;
    } else if (Array.isArray(result[key])) {
      (result[key] as unknown[]).push(value);
    } else {
      result[key] = [result[key], value];
    }
  }
  return result;
}

function xmlToJson(source: string): string {
  const document = new DOMParser().parseFromString(source, "application/xml");
  const parserError = document.getElementsByTagName("parsererror")[0];
  if (parserError) {
    throw new Error(parserError.textContent?.split("\n")[0]?.trim() || "Invalid XML");
  }

  const root = document.documentElement;
  if (!root) throw new Error("Invalid XML: missing root element");

  return JSON.stringify({ [root.tagName]: elementToValue(root) }, null, 2);
}

const JsonXmlTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"json-to-xml" | "xml-to-json">("json-to-xml");

  let output = "";
  if (input.trim()) {
    try {
      output = mode === "json-to-xml" ? jsonToXml(input) : xmlToJson(input);
    } catch (caught) {
      output = `Invalid input: ${caught instanceof Error ? caught.message : "could not convert document"}`;
    }
  }

  return (
    <DualPane
      input={input}
      output={output}
      onInputChange={setInput}
      inputLabel={mode === "json-to-xml" ? "JSON" : "XML"}
      outputLabel={mode === "json-to-xml" ? "XML" : "JSON"}
      inputPlaceholder={mode === "json-to-xml" ? "Paste JSON here…" : "Paste XML here…"}
      actions={
        <>
          <Button
            size="sm"
            variant={mode === "json-to-xml" ? "default" : "secondary"}
            onClick={() => setMode("json-to-xml")}
          >
            JSON → XML
          </Button>
          <Button
            size="sm"
            variant={mode === "xml-to-json" ? "default" : "secondary"}
            onClick={() => setMode("xml-to-json")}
          >
            XML → JSON
          </Button>
        </>
      }
    />
  );
};

export default JsonXmlTool;
