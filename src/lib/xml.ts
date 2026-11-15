export type XmlTokenType =
  | "open"
  | "close"
  | "self"
  | "text"
  | "comment"
  | "cdata"
  | "declaration"
  | "doctype";

export interface XmlToken {
  type: XmlTokenType;
  value: string;
}

function findTagEnd(source: string, start: number): number {
  let quote = "";
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (character === quote) quote = "";
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === ">") {
      return index;
    }
  }
  return -1;
}

function findDeclarationEnd(source: string, start: number): number {
  let quote = "";
  let bracketDepth = 0;

  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (character === quote) quote = "";
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === "[") {
      bracketDepth += 1;
    } else if (character === "]") {
      bracketDepth = Math.max(0, bracketDepth - 1);
    } else if (character === ">" && bracketDepth === 0) {
      return index;
    }
  }
  return -1;
}

/**
 * Splits XML into tags, text, comments, CDATA and declarations. Unlike a
 * regular-expression split, a ">" inside a quoted attribute value does not
 * end the tag.
 */
export function tokenizeXml(source: string): XmlToken[] {
  const tokens: XmlToken[] = [];
  let index = 0;

  const pushText = (end: number) => {
    if (end > index) tokens.push({ type: "text", value: source.slice(index, end) });
    index = end;
  };

  while (index < source.length) {
    if (source[index] !== "<") {
      const next = source.indexOf("<", index);
      pushText(next === -1 ? source.length : next);
      continue;
    }

    const rest = source.slice(index);

    if (rest.startsWith("<!--")) {
      const end = source.indexOf("-->", index + 4);
      if (end !== -1) {
        tokens.push({ type: "comment", value: source.slice(index, end + 3) });
        index = end + 3;
        continue;
      }
    } else if (rest.startsWith("<![CDATA[")) {
      const end = source.indexOf("]]>", index + 9);
      if (end !== -1) {
        tokens.push({ type: "cdata", value: source.slice(index, end + 3) });
        index = end + 3;
        continue;
      }
    } else if (rest.startsWith("<?")) {
      const end = source.indexOf("?>", index + 2);
      if (end !== -1) {
        tokens.push({ type: "declaration", value: source.slice(index, end + 2) });
        index = end + 2;
        continue;
      }
    } else if (/^<![A-Za-z]/.test(rest)) {
      const end = findDeclarationEnd(source, index + 2);
      if (end !== -1) {
        tokens.push({ type: "doctype", value: source.slice(index, end + 1) });
        index = end + 1;
        continue;
      }
    } else {
      const end = findTagEnd(source, index + 1);
      if (end !== -1) {
        const value = source.slice(index, end + 1);
        if (value.startsWith("</")) {
          tokens.push({ type: "close", value });
        } else if (/\/\s*>$/.test(value)) {
          tokens.push({ type: "self", value });
        } else {
          tokens.push({ type: "open", value });
        }
        index = end + 1;
        continue;
      }
    }

    // A "<" that does not start a complete construct is part of the text.
    const next = source.indexOf("<", index + 1);
    pushText(next === -1 ? source.length : next);
  }

  return tokens;
}

/** Pretty-prints XML without rewriting quoted attribute values. */
export function formatXml(source: string): string {
  const tokens = tokenizeXml(source);
  const lines: string[] = [];
  let depth = 0;

  const indent = () => "  ".repeat(depth);

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (token.type === "text") {
      const text = token.value.trim();
      if (text) lines.push(`${indent()}${text}`);
      continue;
    }

    const text = tokens[index + 1];
    const close = tokens[index + 2];

    // Keep simple text-only elements such as <item>A</item> on one line.
    if (
      token.type === "open" &&
      text?.type === "text" &&
      close?.type === "close" &&
      text.value.trim() &&
      !text.value.includes("\n")
    ) {
      lines.push(`${indent()}${token.value.trim()}${text.value.trim()}${close.value.trim()}`);
      index += 2;
      continue;
    }

    if (token.type === "close") depth = Math.max(0, depth - 1);

    lines.push(`${indent()}${token.value.trim()}`);

    if (token.type === "open") depth += 1;
  }

  return lines.join("\n");
}
