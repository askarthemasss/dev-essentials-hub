function findUnquoted(text: string, target: string): number {
  let quote = "";
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quote) {
      if (quote === '"' && character === "\\") {
        index += 1;
      } else if (character === quote) {
        quote = "";
      }
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === target) {
      return index;
    }
  }
  return -1;
}

export function formatToml(source: string): string {
  const output: string[] = [];
  let blankPending = false;

  for (const rawLine of source.replace(/\r\n?/g, "\n").split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      if (output.length > 0) blankPending = true;
      continue;
    }

    if (blankPending) {
      output.push("");
      blankPending = false;
    }

    if (line.startsWith("#")) {
      output.push(line);
      continue;
    }

    const arraySection = line.match(/^\[\[\s*(.*?)\s*\]\]\s*(#.*)?$/);
    if (arraySection) {
      output.push(`[[${arraySection[1]}]]${arraySection[2] ? ` ${arraySection[2]}` : ""}`);
      continue;
    }

    const section = line.match(/^\[\s*(.*?)\s*\]\s*(#.*)?$/);
    if (section) {
      output.push(`[${section[1]}]${section[2] ? ` ${section[2]}` : ""}`);
      continue;
    }

    const equals = findUnquoted(line, "=");
    if (equals === -1) {
      output.push(line);
      continue;
    }

    const key = line.slice(0, equals).trim();
    const rest = line.slice(equals + 1).trim();
    const commentAt = findUnquoted(rest, "#");
    const value = (commentAt === -1 ? rest : rest.slice(0, commentAt)).trim();
    const comment = commentAt === -1 ? "" : rest.slice(commentAt).trim();
    output.push(`${key} =${value ? ` ${value}` : ""}${comment ? ` ${comment}` : ""}`);
  }

  return output.join("\n").trim();
}

function splitQuotedList(value: string): string[] {
  const items: string[] = [];
  let current = "";
  let quote = "";

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (quote) {
      current += character;
      if (quote === '"' && character === "\\") {
        current += value[index + 1] ?? "";
        index += 1;
      } else if (character === quote) {
        quote = "";
      }
    } else if (character === '"' || character === "'") {
      quote = character;
      current += character;
    } else if (character === ",") {
      items.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }

  if (current.trim()) items.push(current.trim());
  return items;
}

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (trimmed.length < 2) return trimmed;
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function splitInlineComment(value: string): [string, string] {
  const commentAt = findUnquoted(value, "#");
  if (commentAt === -1) return [value.trim(), ""];
  return [value.slice(0, commentAt).trim(), value.slice(commentAt).trim()];
}

export function tomlToIni(source: string): string {
  const output: string[] = [];

  for (const line of formatToml(source).split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) {
      output.push("");
      continue;
    }
    if (trimmed.startsWith("#") || trimmed.startsWith("[")) {
      output.push(trimmed);
      continue;
    }

    const equals = findUnquoted(trimmed, "=");
    if (equals === -1) {
      output.push(trimmed);
      continue;
    }

    const key = trimmed.slice(0, equals).trim();
    const [rawValue, comment] = splitInlineComment(trimmed.slice(equals + 1));
    let value = rawValue;

    if (value.startsWith("[") && value.endsWith("]")) {
      value = splitQuotedList(value.slice(1, -1)).map(stripQuotes).join(", ");
    } else {
      value = stripQuotes(value);
    }

    output.push(`${key} = ${value}${comment ? ` ${comment}` : ""}`);
  }

  return output.join("\n").trim();
}

export function iniToToml(source: string): string {
  const output: string[] = [];

  for (const rawLine of source.replace(/\r\n?/g, "\n").split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      output.push("");
      continue;
    }
    if (line.startsWith(";") || line.startsWith("#")) {
      output.push(`#${line.slice(1)}`);
      continue;
    }
    if (line.startsWith("[")) {
      output.push(line);
      continue;
    }

    const equals = line.indexOf("=");
    if (equals === -1) {
      output.push(line);
      continue;
    }

    const key = line.slice(0, equals).trim();
    const value = line.slice(equals + 1).trim();

    let converted: string;
    if (value === "true" || value === "false") {
      converted = value;
    } else if (/^[+-]?\d+$/.test(value)) {
      converted = value;
    } else if (/^[+-]?(?:\d+\.\d*|\d*\.\d+)$/.test(value)) {
      converted = value;
    } else if (value.includes(",")) {
      const items = splitQuotedList(value).map((item) => JSON.stringify(stripQuotes(item)));
      converted = `[${items.join(", ")}]`;
    } else {
      converted = JSON.stringify(stripQuotes(value));
    }

    output.push(`${key} = ${converted}`);
  }

  return output.join("\n").trim();
}
