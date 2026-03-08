import { useState, useCallback } from "react";

const STORAGE_KEY = "devtoolbox-most-used";
const MAX_DISPLAY = 5;

interface UsageMap {
  [toolId: string]: number;
}

function loadUsage(): UsageMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Standalone function to record a tool usage (call from anywhere) */
export function addMostUsedTool(id: string) {
  const usage = loadUsage();
  usage[id] = (usage[id] || 0) + 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
}

/** Hook that provides reactive most-used tools state */
export function useMostUsedTools() {
  const [usage, setUsage] = useState<UsageMap>(loadUsage);

  const addUsage = useCallback((id: string) => {
    addMostUsedTool(id);
    setUsage(loadUsage());
  }, []);

  // Sort by usage count and return top N tool IDs
  const mostUsed = Object.entries(usage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, MAX_DISPLAY)
    .map(([id]) => id);

  return { mostUsed, addUsage };
}
