const RAW_TEXT_ELEMENTS = new Set(["script", "style", "pre", "textarea"]);

export async function beautifyJavaScript(source: string): Promise<string> {
  const [{ format }, babelPlugin, estreePlugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/babel"),
    import("prettier/plugins/estree"),
  ]);
  return format(source, {
    parser: "babel",
    plugins: [babelPlugin, estreePlugin],
    semi: true,
    singleQuote: false,
    tabWidth: 2,
  });
}

export async function beautifyCss(source: string): Promise<string> {
  const [{ format }, postcssPlugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/postcss"),
  ]);
  return format(source, {
    parser: "css",
    plugins: [postcssPlugin],
    tabWidth: 2,
  });
}

export async function beautifyHtml(source: string): Promise<string> {
  const [{ format }, htmlPlugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/html"),
  ]);
  return format(source, {
    parser: "html",
    plugins: [htmlPlugin],
    tabWidth: 2,
    printWidth: 100,
  });
}

export async function minifyJavaScript(source: string): Promise<string> {
  const { minify_sync } = await import("terser");
  const result = minify_sync(source, {
    compress: true,
    mangle: true,
    format: { comments: false },
  });
  if (!result.code) throw new Error("Could not minify this JavaScript");
  return result.code;
}

export async function minifyCss(source: string): Promise<string> {
  const { minify } = await import("csso");
  return minify(source, { restructure: true, comments: false }).css;
}

/**
 * Conservative HTML minifier. It removes comments and collapses whitespace
 * outside raw-text elements while leaving tags, attributes and preformatted
 * content untouched.
 */
export function minifyHtml(source: string): string {
  let output = "";
  let index = 0;

  while (index < source.length) {
    if (source.startsWith("<!--", index)) {
      const end = source.indexOf("-->", index + 4);
      const comment = end === -1 ? source.slice(index) : source.slice(index, end + 3);
      if (/^<!--\[if/i.test(comment)) output += comment;
      index = end === -1 ? source.length : end + 3;
      continue;
    }

    if (source[index] === "<") {
      const tagEnd = findTagEnd(source, index);
      if (tagEnd === -1) {
        output += source.slice(index);
        break;
      }

      const tag = source.slice(index, tagEnd + 1);
      output += tag;
      index = tagEnd + 1;

      const match = /^<\s*([a-zA-Z][a-zA-Z0-9-]*)/.exec(tag);
      const name = match?.[1]?.toLowerCase();
      if (!name || !RAW_TEXT_ELEMENTS.has(name) || /\/\s*>$/.test(tag)) continue;

      const closing = new RegExp(`</\\s*${name}\\s*>`, "i");
      const rest = source.slice(index);
      const closeMatch = closing.exec(rest);
      if (!closeMatch) {
        output += rest;
        break;
      }

      output += rest.slice(0, closeMatch.index);
      output += closeMatch[0];
      index += closeMatch.index + closeMatch[0].length;
      continue;
    }

    const nextTag = source.indexOf("<", index);
    const text = nextTag === -1 ? source.slice(index) : source.slice(index, nextTag);
    output += /^\s*$/.test(text) ? " " : text.replace(/\s+/g, " ");
    index = nextTag === -1 ? source.length : nextTag;
  }

  return output.trim();
}

function findTagEnd(source: string, start: number): number {
  let quote = "";
  for (let index = start + 1; index < source.length; index += 1) {
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
