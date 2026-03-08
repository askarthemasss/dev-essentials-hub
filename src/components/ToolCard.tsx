import React from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Tool } from "@/data/tools";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();
  const Icon = tool.icon;

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <article
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/tool/${tool.id}`)}
            onKeyDown={(e) => { if (e.key === "Enter") navigate(`/tool/${tool.id}`); }}
            className="group relative flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2.5 text-left transition-all hover:border-primary/50 hover:bg-card/80 cursor-pointer"
            aria-label={`${tool.name} — ${tool.description}`}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(tool.id); }}
              aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded transition-colors",
                isFavorite ? "text-primary" : "text-muted-foreground opacity-0 group-hover:opacity-100"
              )}
            >
              <Star className="h-3.5 w-3.5" fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10 text-primary" aria-hidden="true">
              <Icon className="h-4 w-4" />
            </div>
            <span className="font-mono text-sm text-foreground truncate pr-6">{tool.name}</span>
          </article>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="text-xs">{tool.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolCard;
