import React from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Tool } from "@/data/tools";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();
  const Icon = tool.icon;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/tool/${tool.id}`)}
      onKeyDown={(e) => { if (e.key === "Enter") navigate(`/tool/${tool.id}`); }}
      className="group relative flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:glow-cyan-sm cursor-pointer"
      aria-label={`${tool.name} — ${tool.description}`}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(tool.id); }}
        aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
        className={cn(
          "absolute right-3 top-3 p-1 rounded transition-colors",
          isFavorite ? "text-primary" : "text-muted-foreground opacity-0 group-hover:opacity-100"
        )}
      >
        <Star className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
      </button>
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary" aria-hidden="true">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-mono text-sm font-semibold text-foreground">{tool.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
      </div>
      <span className="mt-auto inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
        {tool.category}
      </span>
    </article>
  );
};

export default ToolCard;
