import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/data/tools";

interface ToolLinkProps {
  tool: Tool;
  showDescription?: boolean;
}

/** Dense, editorial tool row used on the homepage, guide and related-tool lists. */
const ToolLink = ({ tool, showDescription = true }: ToolLinkProps) => {
  const Icon = tool.icon;

  return (
    <Link
      to={`/tool/${tool.id}`}
      className="group flex min-h-[56px] min-w-0 items-start gap-3 border-b border-border py-3 transition-colors duration-150 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10 text-primary"
        aria-hidden="true"
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 font-mono text-sm leading-snug text-foreground transition-colors group-hover:text-primary">
          {tool.name}
        </span>
        {showDescription && (
          <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {tool.description}
          </span>
        )}
      </span>
      <ArrowUpRight
        className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
        aria-hidden="true"
      />
    </Link>
  );
};

export default ToolLink;
