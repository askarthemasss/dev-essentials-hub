import { useState, useCallback } from "react";

const STORAGE_KEY = "devtoolbox-recent";
const MAX_RECENT = 5;

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Standalone function to record a tool visit (call from anywhere) */
export function addRecentTool(id: string) {
  const prev = loadRecent();
  const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX_RECENT);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

/** Hook that provides reactive recent-tools state */
export function useRecentTools() {
  const [recent, setRecent] = useState<string[]>(loadRecent);

  const addRecent = useCallback((id: string) => {
    addRecentTool(id);
    setRecent(loadRecent());
  }, []);

  return { recent, addRecent };
}
