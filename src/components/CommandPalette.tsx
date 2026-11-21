import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { tools } from "@/data/tools";
import { OPEN_COMMAND_PALETTE_EVENT } from "@/lib/commandPalette";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const originRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  const rememberOrigin = useCallback(() => {
    originRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }, []);

  const openPalette = useCallback(() => {
    rememberOrigin();
    setOpen(true);
  }, [rememberOrigin]);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;

      event.preventDefault();
      setOpen((current) => {
        if (!current) rememberOrigin();
        return !current;
      });
    };

    const openFromTrigger = () => openPalette();

    document.addEventListener("keydown", down);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, openFromTrigger);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, openFromTrigger);
    };
  }, [openPalette, rememberOrigin]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) rememberOrigin();
    setOpen(nextOpen);
  }, [rememberOrigin]);

  const handleCloseAutoFocus = useCallback((event: Event) => {
    event.preventDefault();
    const origin = originRef.current;
    originRef.current = null;

    // If the trigger was unmounted by navigation, RouteFocus moves focus to
    // the new page's main region instead.
    if (origin?.isConnected) {
      window.requestAnimationFrame(() => origin.focus({ preventScroll: true }));
    }
  }, []);

  const handleSelect = useCallback(
    (toolId: string) => {
      setOpen(false);
      navigate(`/tool/${toolId}`);
    },
    [navigate],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      onCloseAutoFocus={handleCloseAutoFocus}
    >
      <CommandInput
        aria-label="Search developer tools"
        placeholder={`Search ${tools.length} tools…`}
        autoComplete="off"
        spellCheck={false}
      />
      <CommandList>
        <CommandEmpty className="px-4 py-8 text-center text-sm text-muted-foreground">
          No tools match that search. Try a shorter term.
        </CommandEmpty>
        <CommandGroup heading="All tools">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <CommandItem
                key={tool.id}
                value={`${tool.name} ${tool.description} ${tool.category}`}
                onSelect={() => handleSelect(tool.id)}
                className="cursor-pointer gap-2"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-primary group-data-[selected=true]:text-primary-foreground"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate font-mono text-sm">{tool.name}</span>
                <span className="hidden shrink-0 text-xs text-muted-foreground group-data-[selected=true]:text-primary-foreground/80 sm:inline">
                  {tool.category}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
      <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
        <span>{tools.length} tools</span>
        <span className="sm:hidden">Type to filter, tap to open</span>
        <span className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
          <kbd className="rounded border border-border bg-secondary px-1 font-mono">↑</kbd>
          <kbd className="rounded border border-border bg-secondary px-1 font-mono">↓</kbd>
          navigate
          <kbd className="ml-1 rounded border border-border bg-secondary px-1 font-mono">↵</kbd>
          open
          <kbd className="ml-1 rounded border border-border bg-secondary px-1 font-mono">esc</kbd>
          close
        </span>
      </div>
    </CommandDialog>
  );
};

export default CommandPalette;
