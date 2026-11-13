import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

function toDateTimeLocal(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}:${pad(date.getSeconds())}`;
}

function parseTimestamp(raw: string): Date | null {
  const trimmed = raw.trim();
  if (!/^-?\d+$/.test(trimmed)) return null;
  const numeric = Number(trimmed);
  if (!Number.isSafeInteger(numeric)) return null;
  // 13+ digit epochs are milliseconds; 10 digit epochs are seconds.
  const milliseconds = Math.abs(numeric) >= 1_000_000_000_000 ? numeric : numeric * 1000;
  const date = new Date(milliseconds);
  return Number.isNaN(date.getTime()) ? null : date;
}

const UnixTimestampTool = () => {
  const initialDate = new Date();
  const initialSeconds = Math.floor(initialDate.getTime() / 1000);
  const [timestamp, setTimestamp] = useState(String(initialSeconds));
  const [dateInput, setDateInput] = useState(toDateTimeLocal(initialDate));
  const [error, setError] = useState("");

  const date = parseTimestamp(timestamp);

  const updateTimestamp = (value: string) => {
    setTimestamp(value);
    if (!value.trim()) {
      setDateInput("");
      setError("");
      return;
    }
    const parsed = parseTimestamp(value);
    if (!parsed) {
      setDateInput("");
      setError("Enter a whole-number Unix timestamp in seconds or milliseconds.");
      return;
    }
    setDateInput(toDateTimeLocal(parsed));
    setError("");
  };

  const updateDate = (value: string) => {
    setDateInput(value);
    if (!value) {
      setTimestamp("");
      setError("");
      return;
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      setTimestamp("");
      setError("Enter a valid date and time.");
      return;
    }
    setTimestamp(String(Math.floor(parsed.getTime() / 1000)));
    setError("");
  };

  const useNow = () => {
    const now = new Date();
    setTimestamp(String(Math.floor(now.getTime() / 1000)));
    setDateInput(toDateTimeLocal(now));
    setError("");
  };

  return (
    <div className="max-w-xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="unix-timestamp" className="mb-1 block font-mono text-xs text-muted-foreground">
            Unix timestamp
          </label>
          <Input
            id="unix-timestamp"
            inputMode="numeric"
            value={timestamp}
            onChange={(event) => updateTimestamp(event.target.value)}
            placeholder="1700000000"
            className="border-border bg-secondary font-mono"
          />
        </div>
        <div>
          <label htmlFor="unix-date" className="mb-1 block font-mono text-xs text-muted-foreground">
            Date (local time)
          </label>
          <Input
            id="unix-date"
            type="datetime-local"
            step={1}
            value={dateInput}
            onChange={(event) => updateDate(event.target.value)}
            className="border-border bg-secondary font-mono"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          10-digit values are treated as seconds, 13-digit values as milliseconds.
        </p>
        <Button size="sm" variant="outline" onClick={useNow}>
          <Clock className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
          Now
        </Button>
      </div>

      {error && (
        <p role="alert" className="font-mono text-sm text-destructive">
          {error}
        </p>
      )}

      {date && (
        <div className="space-y-2">
          {[
            ["UTC", date.toUTCString()],
            ["Local", date.toLocaleString()],
            ["ISO 8601", date.toISOString()],
            ["Seconds", String(Math.floor(date.getTime() / 1000))],
            ["Milliseconds", String(date.getTime())],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col justify-between gap-1 rounded border border-border bg-secondary p-3 font-mono text-sm sm:flex-row sm:items-center"
            >
              <span className="text-muted-foreground">{label}</span>
              <span className="break-all text-foreground">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnixTimestampTool;
