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
    <article className="group relative flex min-h-[52px] items-center rounded-md border border-border bg-card transition-colors duration-150 hover:border-primary/50 focus-within:border-primary/50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={`/tool/${tool.id}`}
            aria-label={`${tool.name} — ${tool.description}`}
            className="flex min-h-[52px] min-w-0 flex-1 items-center gap-3 rounded-md py-2 pl-3 pr-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span
              className="hidden h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10 text-primary lg:flex"
              aria-hidden="true"
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="line-clamp-3 min-w-0 font-mono text-sm leading-snug text-foreground">
              {tool.name.split("/").map((part, index, parts) => (
                <React.Fragment key={`${part}-${index}`}>
                  {part}
                  {index < parts.length - 1 && (
                    <>
                      /<wbr />
                    </>
                  )}
                </React.Fragment>
              ))}
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="font-mono text-xs text-foreground">{tool.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{tool.description}</p>
        </TooltipContent>
      </Tooltip>
      <button
        type="button"
        onClick={() => onToggleFavorite(tool.id)}
        aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
        aria-pressed={isFavorite}
        className={cn(
          "absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md",
          "transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isFavorite ? "text-primary" : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Star
          className="h-4 w-4"
          fill={isFavorite ? "currentColor" : "none"}
          aria-hidden="true"
        />
      </button>
    </article>
  );
};

export default ToolCard;
