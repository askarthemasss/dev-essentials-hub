type Token = number | string;

const FUNCTIONS: Record<string, (...args: number[]) => number> = {
  sqrt: (value) => {
    if (value < 0) throw new Error("Square root of a negative number");
    return Math.sqrt(value);
  },
  cbrt: Math.cbrt,
  abs: Math.abs,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  log: (value) => {
    if (value <= 0) throw new Error("Logarithm input must be positive");
    return Math.log10(value);
  },
  ln: (value) => {
    if (value <= 0) throw new Error("Logarithm input must be positive");
    return Math.log(value);
  },
  log2: (value) => {
    if (value <= 0) throw new Error("Logarithm input must be positive");
    return Math.log2(value);
  },
  exp: Math.exp,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  min: (...values) => Math.min(...values),
  max: (...values) => Math.max(...values),
  pow: (base, exponent) => Math.pow(base, exponent),
};

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
};

const NORMALIZE: Record<string, string> = {
  "×": "*",
  "÷": "/",
  "−": "-",
  "π": "pi",
};

function tokenize(input: string): Token[] {
  const source = [...input].map((char) => NORMALIZE[char] ?? char).join("");
  const tokens: Token[] = [];
  let index = 0;

  while (index < source.length) {
    const char = source[index];

    if (/\s/.test(char)) {
      index += 1;
      continue;
    }

    if (/\d/.test(char) || (char === "." && /\d/.test(source[index + 1] ?? ""))) {
      const match = source.slice(index).match(/^\d*\.?\d+(?:[eE][+-]?\d+)?/);
      if (!match) throw new Error(`Invalid number at position ${index + 1}`);
      tokens.push(Number(match[0]));
      index += match[0].length;
      continue;
    }

    if (/[a-zA-Z_]/.test(char)) {
      const match = source.slice(index).match(/^[a-zA-Z_]\w*/);
      if (!match) throw new Error(`Invalid name at position ${index + 1}`);
      tokens.push(match[0].toLowerCase());
      index += match[0].length;
      continue;
    }

    if (source.startsWith("**", index)) {
      tokens.push("**");
      index += 2;
      continue;
    }

    if ("+-*/%^(),!".includes(char)) {
      tokens.push(char);
      index += 1;
      continue;
    }

    throw new Error(`Unsupported character "${char}"`);
  }

  return tokens;
}

function factorial(value: number): number {
  if (!Number.isInteger(value) || value < 0) throw new Error("Factorial needs a non-negative integer");
  if (value > 170) throw new Error("Factorial is too large");
  let result = 1;
  for (let i = 2; i <= value; i += 1) result *= i;
  return result;
}

/**
 * Small recursive-descent arithmetic evaluator. Deliberately supports only
 * numbers, maths operators and an allow-listed set of functions so untrusted
 * calculator input can never execute JavaScript.
 */
export function evaluateExpression(input: string): number {
  const tokens = tokenize(input);
  if (tokens.length === 0) throw new Error("Enter an expression");

  let position = 0;

  const peek = (): Token | undefined => tokens[position];
  const consume = (): Token => {
    const token = tokens[position];
    position += 1;
    return token;
  };

  const expect = (expected: string): void => {
    if (consume() !== expected) throw new Error(`Expected "${expected}"`);
  };

  const parseExpression = (): number => {
    let value = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const operator = consume();
      const right = parseTerm();
      value = operator === "+" ? value + right : value - right;
    }
    return value;
  };

  const parseTerm = (): number => {
    let value = parseUnary();
    while (peek() === "*" || peek() === "/" || peek() === "%") {
      const operator = consume();
      const right = parseUnary();
      if ((operator === "/" || operator === "%") && right === 0) {
        throw new Error("Division by zero");
      }
      if (operator === "*") value *= right;
      if (operator === "/") value /= right;
      if (operator === "%") value %= right;
    }
    return value;
  };

  const parseUnary = (): number => {
    if (peek() === "+") {
      consume();
      return parseUnary();
    }
    if (peek() === "-") {
      consume();
      return -parseUnary();
    }
    return parsePower();
  };

  const parsePower = (): number => {
    const base = parsePostfix();
    if (peek() === "^" || peek() === "**") {
      consume();
      return Math.pow(base, parseUnary());
    }
    return base;
  };

  const parsePostfix = (): number => {
    let value = parsePrimary();
    while (peek() === "!") {
      consume();
      value = factorial(value);
    }
    return value;
  };

  const parsePrimary = (): number => {
    const token = peek();
    if (token === undefined) throw new Error("Unexpected end of expression");

    if (typeof token === "number") {
      consume();
      return token;
    }

    if (token === "(") {
      consume();
      const value = parseExpression();
      expect(")");
      return value;
    }

    if (/^[a-z_]\w*$/.test(token)) {
      consume();
      if (peek() === "(") {
        const fn = FUNCTIONS[token];
        if (!fn) throw new Error(`Unknown function "${token}"`);
        consume();
        const args: number[] = [];
        if (peek() !== ")") {
          args.push(parseExpression());
          while (peek() === ",") {
            consume();
            args.push(parseExpression());
          }
        }
        expect(")");
        return fn(...args);
      }
      if (token in CONSTANTS) return CONSTANTS[token];
      throw new Error(`Unknown value "${token}"`);
    }

    throw new Error(`Unexpected token "${token}"`);
  };

  const result = parseExpression();
  if (position < tokens.length) {
    throw new Error(`Unexpected token "${tokens[position]}"`);
  }
  if (!Number.isFinite(result)) throw new Error("Result is not a finite number");
  return result;
}
