import { useId, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CloudOff, Command, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryIndexPanel from "@/components/CategoryIndexPanel";
import SectionHeading from "@/components/SectionHeading";
import ToolLink from "@/components/ToolLink";
import { popularTools } from "@/data/curated";
import { tools, type Tool } from "@/data/tools";
import { useRecentTools } from "@/hooks/useRecentTools";
import { useSEO } from "@/hooks/useSEO";

const guideLinkClass =
  "inline-flex items-center gap-1 rounded-sm text-xs font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const steps = [
  {
    title: "Find",
    body: "Search the directory or open quick search with ⌘K. Twelve categories, no nested menus.",
  },
  {
    title: "Work",
    body: "Paste input and set an option. Many tools update as you type; others run on one clear action.",
  },
  {
    title: "Keep",
    body: "Copy the result or star the tool. Favorites and recent tools stay in this browser.",
  },
];

const Home = () => {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { recent } = useRecentTools();

  useSEO(
    `DevToolbox — ${tools.length} Free Browser-Based Developer Tools`,
    `${tools.length} developer tools that run locally in your browser. Format JSON, encode Base64, generate UUIDs, test regex, check contrast and more. No account or uploads.`,
    "/",
  );

  const recentTools = useMemo(
    () =>
      recent
        .map((id) => tools.find((tool) => tool.id === id))
        .filter((tool): tool is Tool => Boolean(tool)),
    [recent],
  );

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/tools?q=${encodeURIComponent(trimmed)}` : "/tools");
  };

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
      <section aria-labelledby="home-heading" className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="min-w-0 lg:col-span-7">
            <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              Local-first developer tools
            </p>

            <h1
              id="home-heading"
              className="mt-4 text-balance font-mono text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.25rem]"
            >
              {tools.length} tools. One local workbench.
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Format, encode, convert, generate and inspect data without pasting it into someone
              else’s server. Every tool runs in this tab.
            </p>

            <form role="search" onSubmit={handleSearch} className="mt-6 flex max-w-xl flex-col gap-2 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <label htmlFor={searchId} className="sr-only">
                  Search {tools.length} developer tools
                </label>
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id={searchId}
                  name="q"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try “JWT”, “diff” or “base64”…"
                  autoComplete="off"
                  spellCheck={false}
                  className="h-11 border-border bg-secondary pl-9 font-mono text-base placeholder:text-muted-foreground md:text-sm"
                />
              </div>
              <Button type="submit" className="h-11 shrink-0 gap-2 px-5">
                Search tools
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Runs locally
              </li>
              <li className="inline-flex items-center gap-1.5">
                <CloudOff className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                No uploads
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Command className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span>
                  <kbd className="rounded border border-border bg-card px-1 font-mono text-[11px] text-foreground">
                    ⌘&nbsp;K
                  </kbd>{" "}
                  quick open
                </span>
              </li>
            </ul>

            <Link
              to="/usage"
              className="mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Read the 60-second guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="min-w-0 lg:col-span-5">
            <CategoryIndexPanel />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <section aria-labelledby="popular-heading">
          <SectionHeading
            id="popular-heading"
            title="Start with a common job"
            action={
              <Link to="/tools" className={guideLinkClass}>
                All {tools.length} tools
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <div className="grid gap-x-8 sm:grid-cols-2">
            {popularTools.map((tool) => (
              <ToolLink key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {recentTools.length > 0 && (
          <section aria-labelledby="recent-heading" className="mt-10">
            <SectionHeading
              id="recent-heading"
              title="Continue where you left off"
              action={
                <Link to="/tools" className={guideLinkClass}>
                  Full directory
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              }
            />
            <div className="grid gap-x-8 sm:grid-cols-2">
              {recentTools.map((tool) => (
                <ToolLink key={tool.id} tool={tool} showDescription={false} />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="how-heading" className="mt-12">
          <SectionHeading
            id="how-heading"
            title="The workbench in three moves"
            action={
              <Link to="/usage" className={guideLinkClass}>
                Read the guide
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <ol className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-border pt-4">
                <span className="font-mono text-[11px] tabular-nums text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-mono text-sm font-bold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section aria-labelledby="privacy-heading" className="border-y border-border bg-card/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 gap-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
              aria-hidden="true"
            >
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 id="privacy-heading" className="font-mono text-base font-bold text-foreground">
                Your input stays in this tab.
              </h2>
              <p className="mt-1 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
                No account, no upload endpoint and no telemetry. Favorites and recent tools live in
                this browser’s local storage.
              </p>
            </div>
          </div>
          <Link to="/usage#privacy" className={`${guideLinkClass} shrink-0`}>
            Read the privacy notes
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
