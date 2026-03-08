import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { tools } from "@/data/tools";
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
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback(
    (toolId: string) => {
      setOpen(false);
      navigate(`/tool/${toolId}`);
    },
    [navigate]
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search tools…" />
      <CommandList>
        <CommandEmpty>No tools found.</CommandEmpty>
        <CommandGroup heading="Tools">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <CommandItem
                key={tool.id}
                value={`${tool.name} ${tool.category}`}
                onSelect={() => handleSelect(tool.id)}
                className="cursor-pointer"
              >
                <Icon className="mr-2 h-4 w-4 shrink-0 text-primary" />
                <span className="font-mono text-sm">{tool.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{tool.category}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
