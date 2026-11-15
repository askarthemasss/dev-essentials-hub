export type JsonPathSegment = string | number;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Parses dot paths ($.user.name), bracket indexes ($.items[0]) and quoted keys
 * ($["a.b"], $['a"b']). The leading "$" is optional.
 */
export function parseJsonPath(path: string): JsonPathSegment[] {
  const source = path.trim();
  const segments: JsonPathSegment[] = [];
  let index = 0;

  if (source.startsWith("$")) index = 1;
  if (index === source.length) return segments;

  while (index < source.length) {
    const character = source[index];

    if (character === ".") {
      index += 1;
      const start = index;
      while (index < source.length && source[index] !== "." && source[index] !== "[") {
        index += 1;
      }
      const segment = source.slice(start, index);
      if (!segment) throw new Error("Expected a property name after '.'");
      segments.push(segment);
      continue;
    }

    if (character === "[") {
      index += 1;
      while (source[index] === " ") index += 1;

      if (source[index] === '"' || source[index] === "'") {
        const quote = source[index];
        index += 1;
        let key = "";
        let closed = false;

        while (index < source.length) {
          const current = source[index];
          if (current === "\\") {
            const escaped = source[index + 1];
            if (escaped === "u") {
              const hex = source.slice(index + 2, index + 6);
              if (!/^[0-9a-fA-F]{4}$/.test(hex)) throw new Error("Invalid unicode escape in path");
              key += String.fromCharCode(Number.parseInt(hex, 16));
              index += 6;
            } else {
              const escapes: Record<string, string> = {
                n: "\n",
                r: "\r",
                t: "\t",
                b: "\b",
                f: "\f",
                "\\": "\\",
                "/": "/",
              };
              key += escapes[escaped] ?? escaped ?? "";
              index += 2;
            }
          } else if (current === quote) {
            closed = true;
            index += 1;
            break;
          } else {
            key += current;
            index += 1;
          }
        }

        if (!closed) throw new Error("Unterminated quoted key");
        while (source[index] === " ") index += 1;
        if (source[index] !== "]") throw new Error("Expected ']' after quoted key");
        index += 1;
        segments.push(key);
        continue;
      }

      const start = index;
      while (index < source.length && source[index] !== "]") index += 1;
      if (index >= source.length) throw new Error("Unterminated bracket path");
      const raw = source.slice(start, index).trim();
      index += 1;
      if (!raw) throw new Error("Empty bracket path");
      if (/^-?\d+$/.test(raw)) {
        segments.push(Number(raw));
      } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(raw)) {
        segments.push(raw);
      } else {
        throw new Error(`Invalid bracket path segment: ${raw}`);
      }
      continue;
    }

    if (index === 0) {
      const start = index;
      while (index < source.length && source[index] !== "." && source[index] !== "[") {
        index += 1;
      }
      const segment = source.slice(start, index);
      if (!segment) throw new Error("Invalid JSON path");
      segments.push(segment);
      continue;
    }

    throw new Error(`Unexpected character '${character}' in path`);
  }

  return segments;
}

export function evaluateJsonPath(root: unknown, path: string): unknown {
  let current: unknown = root;

  for (const segment of parseJsonPath(path)) {
    if (typeof segment === "number") {
      if (!Array.isArray(current) || segment < 0) return undefined;
      current = current[segment];
    } else if (Array.isArray(current)) {
      if (segment === "length") {
        current = current.length;
      } else if (/^\d+$/.test(segment)) {
        current = current[Number(segment)];
      } else {
        return undefined;
      }
    } else {
      if (!isRecord(current) || !Object.prototype.hasOwnProperty.call(current, segment)) {
        return undefined;
      }
      current = current[segment];
    }

    if (current === undefined) return undefined;
  }

  return current;
}

export function formatJsonPathResult(value: unknown): string {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  return typeof value === "object" ? JSON.stringify(value, null, 2) : String(value);
}
