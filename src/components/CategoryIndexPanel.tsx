import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { categories, tools } from "@/data/tools";

const counts = new Map(
  categories.map((category) => [category, tools.filter((tool) => tool.category === category).length]),
);

/** The homepage's typeset table of contents for the 129-tool catalogue. */
const CategoryIndexPanel = () => (
  <nav aria-labelledby="category-index-heading" className="rounded-lg border border-border bg-card">
    <div className="flex items-baseline justify-between gap-3 border-b border-border px-4 py-3">
      <h2 id="category-index-heading" className="font-mono text-xs font-medium text-muted-foreground">
        Index
      </h2>
      <p className="font-mono text-[11px] text-muted-foreground">
        {categories.length} categories
      </p>
    </div>

    <ol className="divide-y divide-border">
      {categories.map((category, index) => (
        <li key={category}>
          <Link
            to={`/tools?category=${encodeURIComponent(category)}`}
            className="group flex min-h-[40px] items-center gap-2 px-4 py-2 transition-colors duration-150 hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            <span className="w-5 shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="shrink-0 text-sm text-secondary-foreground transition-colors group-hover:text-foreground">
              {category}
            </span>
            <span
              className="mx-2 min-w-4 flex-1 border-b border-dotted border-border"
              aria-hidden="true"
            />
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {counts.get(category)}
            </span>
            <ArrowUpRight
              className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ol>

    <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
      <p className="font-mono text-[11px] text-muted-foreground">
        {tools.length} tools, all local
      </p>
      <Link
        to="/tools"
        className="inline-flex items-center gap-1 rounded-sm text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        Open directory
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  </nav>
);

export default CategoryIndexPanel;
