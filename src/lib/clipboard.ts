/**
 * Writes text to the clipboard and reports whether the write succeeded.
 * Clipboard access can fail (permissions, insecure context, an unfocused
 * document), so callers must be able to show a failure state instead of
 * claiming success.
 */
export async function copyText(text: string): Promise<boolean> {
  if (!text) return false;

  try {
    if (!navigator.clipboard?.writeText) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
