type TypeNode =
  | { kind: "primitive"; name: string }
  | { kind: "array"; item: TypeNode }
  | { kind: "object"; properties: TypeProperty[] }
  | { kind: "union"; types: TypeNode[] };

interface TypeProperty {
  key: string;
  optional: boolean;
  type: TypeNode;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function primitive(name: string): TypeNode {
  return { kind: "primitive", name };
}

function inferType(value: unknown): TypeNode {
  if (value === null) return primitive("null");
  if (Array.isArray(value)) {
    if (value.length === 0) return { kind: "array", item: primitive("unknown") };
    return { kind: "array", item: combineTypes(value.map(inferType)) };
  }
  if (isRecord(value)) {
    return {
      kind: "object",
      properties: Object.entries(value).map(([key, child]) => ({
        key,
        optional: false,
        type: inferType(child),
      })),
    };
  }
  switch (typeof value) {
    case "string":
      return primitive("string");
    case "number":
      return primitive("number");
    case "boolean":
      return primitive("boolean");
    default:
      return primitive("unknown");
  }
}

function combineTypes(types: TypeNode[]): TypeNode {
  if (types.length === 0) return primitive("unknown");
  if (types.every((type) => type.kind === "object")) {
    return mergeObjects(types as Array<Extract<TypeNode, { kind: "object" }>>);
  }

  const unique: TypeNode[] = [];
  const seen = new Set<string>();
  for (const type of types) {
    const key = typeKey(type);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(type);
  }
  return unique.length === 1 ? unique[0] : { kind: "union", types: unique };
}

function mergeObjects(objects: Array<Extract<TypeNode, { kind: "object" }>>): TypeNode {
  const keys: string[] = [];
  for (const object of objects) {
    for (const property of object.properties) {
      if (!keys.includes(property.key)) keys.push(property.key);
    }
  }

  return {
    kind: "object",
    properties: keys.map((key) => {
      const matches = objects.flatMap((object) =>
        object.properties.filter((property) => property.key === key)
      );
      return {
        key,
        optional: matches.length !== objects.length,
        type: combineTypes(matches.map((property) => property.type)),
      };
    }),
  };
}

function typeKey(type: TypeNode): string {
  switch (type.kind) {
    case "primitive":
      return `p:${type.name}`;
    case "array":
      return `a:${typeKey(type.item)}`;
    case "union":
      return `u:${type.types.map(typeKey).sort().join("|")}`;
    case "object":
      return `o:${type.properties
        .map((property) => `${property.key}${property.optional ? "?" : ""}:${typeKey(property.type)}`)
        .sort()
        .join(",")}`;
  }
}

function toPascalCase(value: string): string {
  const parts = value.split(/[^A-Za-z0-9]+/).filter(Boolean);
  const joined = parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  if (!joined) return "Item";
  return /^[A-Za-z_$]/.test(joined) ? joined : `Type${joined}`;
}

function isIdentifier(value: string): boolean {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(value);
}

/**
 * Converts JSON data into TypeScript declarations. Root arrays become
 * "type Root = RootItem[];" instead of invalid "interface Root {...}[]".
 */
export function jsonToTypeScript(value: unknown, rootName = "Root"): string {
  const declarations: string[] = [];
  const usedNames = new Set<string>();
  const root = inferType(value);

  const reserveName = (suggested: string): string => {
    const base = toPascalCase(suggested);
    let candidate = base;
    let counter = 2;
    while (usedNames.has(candidate)) {
      candidate = `${base}${counter}`;
      counter += 1;
    }
    usedNames.add(candidate);
    return candidate;
  };

  const emit = (node: TypeNode, suggestedName: string): string => {
    switch (node.kind) {
      case "primitive":
        return node.name;
      case "array": {
        const itemType = emit(node.item, `${suggestedName}Item`);
        return node.item.kind === "union" ? `(${itemType})[]` : `${itemType}[]`;
      }
      case "union": {
        const members = node.types.map((type, index) =>
          emit(type, `${suggestedName}${index === 0 ? "" : index + 1}`)
        );
        return [...new Set(members)].join(" | ");
      }
      case "object": {
        const name = reserveName(suggestedName);
        const properties = node.properties.map((property) => {
          const key = isIdentifier(property.key) ? property.key : JSON.stringify(property.key);
          const propertyType = emit(
            property.type,
            `${name}${toPascalCase(property.key)}`
          );
          return `  ${key}${property.optional ? "?" : ""}: ${propertyType};`;
        });
        declarations.push(
          properties.length > 0
            ? `interface ${name} {\n${properties.join("\n")}\n}`
            : `interface ${name} {}`
        );
        return name;
      }
    }
  };

  const rootType = emit(root, rootName);
  if (root.kind === "object") return declarations.join("\n\n");

  return [`type ${toPascalCase(rootName)} = ${rootType};`, ...declarations].join("\n\n");
}
