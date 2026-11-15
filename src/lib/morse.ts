const MORSE_CODE: Record<string, string> = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "'": ".----.",
  '"': ".-..-.",
  ":": "---...",
  ";": "-.-.-.",
  "/": "-..-.",
  "-": "-....-",
  "(": "-.--.",
  ")": "-.--.-",
  "@": ".--.-.",
  " ": "/",
  "\n": "/",
};

const REVERSE_MORSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_CODE).map(([character, code]) => [code, character])
);

/** Encodes text as Morse code, separating letters with spaces and words with "/". */
export function textToMorse(text: string): string {
  return Array.from(text.toUpperCase())
    .map((character) => MORSE_CODE[character] ?? character)
    .join(" ");
}

/**
 * Decodes Morse code tolerantly: arbitrary runs of spaces are allowed between
 * letters, and "/" may have any amount of surrounding whitespace.
 */
export function morseToText(source: string): string {
  return source
    .trim()
    .split(/\s*\/\s*/)
    .map((word) => word.trim())
    .filter(Boolean)
    .map((word) =>
      word
        .split(/\s+/)
        .map((code) => REVERSE_MORSE[code] ?? code)
        .join("")
    )
    .join(" ");
}
