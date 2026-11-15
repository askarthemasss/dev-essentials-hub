import { describe, expect, it } from "vitest";
import { morseToText, textToMorse } from "./morse";

describe("Morse code", () => {
  it("encodes and decodes text", () => {
    expect(textToMorse("SOS")).toBe("... --- ...");
    expect(textToMorse("hello world")).toBe(".... . .-.. .-.. --- / .-- --- .-. .-.. -..");
    expect(morseToText(".... . .-.. .-.. --- / .-- --- .-. .-.. -..")).toBe("HELLO WORLD");
  });

  it("tolerates repeated and irregular spaces when decoding", () => {
    expect(morseToText("...   ---   ...")).toBe("SOS");
    expect(morseToText("  ... --- ...  ")).toBe("SOS");
    expect(morseToText(".... . .-.. .-.. ---   /   .-- --- .-. .-.. -..")).toBe("HELLO WORLD");
    expect(morseToText(".-/-...")).toBe("A B");
  });

  it("treats repeated word separators as a single space", () => {
    expect(morseToText("... /// ---")).toBe("S O");
  });

  it("preserves unknown characters and codes", () => {
    expect(textToMorse("A#")).toBe(".- #");
    expect(morseToText("... #")).toBe("S#");
  });
});
