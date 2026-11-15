import { useEffect, useState } from "react";

/**
 * Runs a (possibly async) formatter in an effect and discards stale results.
 */
export function useAsyncOutput(
  input: string,
  transform: (input: string) => string | Promise<string>
): string {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let active = true;

    if (!input.trim()) {
      setOutput("");
      return () => {
        active = false;
      };
    }

    void Promise.resolve()
      .then(() => transform(input))
      .then((result) => {
        if (active) setOutput(result);
      })
      .catch((caught: unknown) => {
        if (active) {
          setOutput(`Error: ${caught instanceof Error ? caught.message : "Could not process this input"}`);
        }
      });

    return () => {
      active = false;
    };
  }, [input, transform]);

  return output;
}
