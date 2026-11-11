import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Tool } from "@/data/tools";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isFavorite, onToggleFavorite }) => {
  const Icon = tool.icon;

  return (
    <article className="group relative flex items-center rounded-md border border-border bg-card transition-all hover:border-primary/50 hover:bg-card/80 focus-within:border-primary/50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={`/tool/${tool.id}`}
            aria-label={`${tool.name} — ${tool.description}`}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-md px-3 py-2.5 pr-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10 text-primary"
              aria-hidden="true"
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="truncate font-mono text-sm text-foreground">{tool.name}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="text-xs">{tool.description}</p>
        </TooltipContent>
      </Tooltip>
      <button
        onClick={() => onToggleFavorite(tool.id)}
        aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
        aria-pressed={isFavorite}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 transition-colors focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isFavorite
            ? "text-primary"
            : "text-muted-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        )}
      >
        <Star className="h-3.5 w-3.5" fill={isFavorite ? "currentColor" : "none"} />
      </button>
    </article>
  );
};

export default ToolCard;
