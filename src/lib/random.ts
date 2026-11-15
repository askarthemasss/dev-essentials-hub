const UINT32_RANGE = 0x100000000;

/** Uniform, rejection-sampled random integer in [0, maxExclusive). */
export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isInteger(maxExclusive) || maxExclusive < 1 || maxExclusive > UINT32_RANGE) {
    throw new Error("Random upper bound must be a whole number between 1 and 2^32");
  }

  const limit = Math.floor(UINT32_RANGE / maxExclusive) * maxExclusive;
  const buffer = new Uint32Array(1);
  let value = 0;
  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);

  return value % maxExclusive;
}

export function secureRandomIntegers(min: number, max: number, count: number): number[] {
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)) {
    throw new Error("Minimum and maximum must be whole numbers");
  }
  if (min > max) throw new Error("Minimum must be less than or equal to maximum");
  if (!Number.isInteger(count) || count < 1 || count > 1000) {
    throw new Error("Count must be between 1 and 1000");
  }

  const span = max - min + 1;
  if (!Number.isSafeInteger(span) || span > UINT32_RANGE) {
    throw new Error("Range is too large; choose at most 2^32 values");
  }

  return Array.from({ length: count }, () => min + secureRandomInt(span));
}

export function shuffleSecure<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapWith = secureRandomInt(index + 1);
    [result[index], result[swapWith]] = [result[swapWith], result[index]];
  }
  return result;
}

export interface PasswordOptions {
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
}

const PASSWORD_SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export function generatePassword(length: number, options: PasswordOptions): string {
  if (!Number.isInteger(length) || length < 4 || length > 128) {
    throw new Error("Password length must be between 4 and 128");
  }

  const sets = (Object.keys(PASSWORD_SETS) as Array<keyof PasswordOptions>)
    .filter((key) => options[key])
    .map((key) => PASSWORD_SETS[key]);

  if (sets.length === 0) throw new Error("Select at least one character type");

  const pool = sets.join("");
  const characters = sets.map((set) => set[secureRandomInt(set.length)]);
  while (characters.length < length) {
    characters.push(pool[secureRandomInt(pool.length)]);
  }

  return shuffleSecure(characters).join("");
}
