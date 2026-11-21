import { Command } from "lucide-react";
import { openCommandPalette } from "@/lib/commandPalette";
import { cn } from "@/lib/utils";

interface CommandPaletteTriggerProps {
  className?: string;
}

/**
 * Visible entry point for the command palette. The palette is keyboard-first,
 * but it still needs a discoverable control and a mobile entry point.
 */
const CommandPaletteTrigger = ({ className }: CommandPaletteTriggerProps) => (
  <button
    type="button"
    onClick={openCommandPalette}
    aria-label="Quick open ⌘ K"
    aria-keyshortcuts="Meta+K Control+K"
    className={cn(
      "touch-target inline-flex h-10 items-center gap-2 rounded-md border border-border bg-secondary px-2.5 text-xs font-medium text-muted-foreground",
      "transition-colors duration-150 hover:border-primary/50 hover:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
  >
    <Command className="h-4 w-4" aria-hidden="true" />
    <span className="hidden lg:inline">Quick open</span>
    <kbd
      className="hidden items-center gap-0.5 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground md:inline-flex"
      aria-hidden="true"
    >
      ⌘&nbsp;K
    </kbd>
  </button>
);

export default CommandPaletteTrigger;
