import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolLink from "@/components/ToolLink";
import { tools, type Tool } from "@/data/tools";

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, children }) => {
  const categoryTools = tools.filter((entry) => entry.category === tool.category);
  const relatedTools = categoryTools.filter((entry) => entry.id !== tool.id).slice(0, 4);
  const categoryHref = `/tools?category=${encodeURIComponent(tool.category)}`;

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
      <section aria-labelledby="tool-title" className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Tools", to: "/tools" },
              { label: tool.category, to: categoryHref },
              { label: tool.name },
            ]}
          />

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1
                id="tool-title"
                tabIndex={-1}
                className="text-balance font-mono text-2xl font-bold leading-tight text-foreground focus:outline-none"
              >
                {tool.name}
              </h1>
              <p className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Runs locally
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {children}

        <div className="mt-10 grid gap-6 border-t border-border pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <section aria-labelledby="tool-notes-heading">
            <h2
              id="tool-notes-heading"
              className="font-mono text-xs font-medium text-muted-foreground"
            >
              Tool notes
            </h2>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                This tool runs entirely in your browser. Input is not uploaded, stored on a server
                or shared with another service.
              </p>
              <p>
                Part of{" "}
                <Link
                  to={categoryHref}
                  className="rounded-sm text-secondary-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {tool.category}
                </Link>{" "}
                — {categoryTools.length} tools in this category.
              </p>
            </div>
            <Link
              to="/usage#work-with-a-tool"
              className="mt-3 inline-flex items-center gap-1 rounded-sm text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              How to use this tool
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </section>

          <section aria-labelledby="related-tools-heading">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2
                id="related-tools-heading"
                className="font-mono text-xs font-medium text-muted-foreground"
              >
                More in {tool.category}
              </h2>
              <Link
                to={categoryHref}
                className="inline-flex items-center gap-1 rounded-sm text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-1 grid gap-x-6 sm:grid-cols-2">
              {relatedTools.map((related) => (
                <ToolLink key={related.id} tool={related} showDescription={false} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ToolLayout;
