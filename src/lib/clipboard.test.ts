import { afterEach, describe, expect, it, vi } from "vitest";
import { copyText } from "./clipboard";

function setClipboard(writeText?: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: writeText ? { writeText } : undefined,
  });
}

afterEach(() => {
  setClipboard(undefined);
});

describe("copyText", () => {
  it("resolves true after a successful clipboard write", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);

    await expect(copyText("hello")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("hello");
  });

  it("resolves false when the clipboard rejects", async () => {
    setClipboard(vi.fn().mockRejectedValue(new Error("denied")));

    await expect(copyText("hello")).resolves.toBe(false);
  });

  it("resolves false when the clipboard API is unavailable", async () => {
    setClipboard(undefined);

    await expect(copyText("hello")).resolves.toBe(false);
  });

  it("does not touch the clipboard for empty text", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);

    await expect(copyText("")).resolves.toBe(false);
    expect(writeText).not.toHaveBeenCalled();
  });
});
