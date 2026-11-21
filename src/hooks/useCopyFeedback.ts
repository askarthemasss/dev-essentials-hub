import { useCallback, useEffect, useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";

export type CopyStatus = "idle" | "copied" | "error";

/**
 * Copies text and exposes a short-lived success/failure state. Copy actions
 * must await the clipboard write: a rejected write is a failure, not a
 * success that clears itself after 1.5 seconds.
 */
export function useCopyFeedback(resetMs = 1800) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (timer.current !== undefined) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(
    async (text: string) => {
      if (timer.current !== undefined) window.clearTimeout(timer.current);
      setStatus("idle");

      const ok = await copyText(text);
      setStatus(ok ? "copied" : "error");
      timer.current = window.setTimeout(() => setStatus("idle"), ok ? resetMs : 4000);
      return ok;
    },
    [resetMs],
  );

  return { status, copy };
}
