import { useId, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Flame, Search, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolCard from "@/components/ToolCard";
import ToolLink from "@/components/ToolLink";
import { categories, tools, type Tool, type ToolCategory } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";
import { useMostUsedTools } from "@/hooks/useMostUsedTools";
import { useSEO } from "@/hooks/useSEO";
import { cn } from "@/lib/utils";

const TOOL_GRID = "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";
const categoryFilters: Array<ToolCategory | "All"> = ["All", ...categories];

const isToolCategory = (value: string | null): value is ToolCategory =>
  value !== null && (categories as readonly string[]).includes(value);

const Tools = () => {
  useSEO(
    `All ${tools.length} Developer Tools — DevToolbox`,
    `Browse all ${tools.length} browser-based developer tools by category. Formatters, encoders, generators, converters and more — every tool runs locally in your browser.`,
    "/tools",
  );

  const searchId = useId();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggle, isFavorite, count } = useFavorites();
  const { mostUsed } = useMostUsedTools();

  const search = searchParams.get("q") ?? "";
  const rawCategory = searchParams.get("category");
  const isFavorites = searchParams.get("view") === "favorites";
  const activeCategory: ToolCategory | "All" | "Favorites" = isFavorites
    ? "Favorites"
    : isToolCategory(rawCategory)
      ? rawCategory
      : "All";

  const updateParams = (updates: Record<string, string | null>, replace = true) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
    });
    setSearchParams(next, { replace });
  };

  const filtered = useMemo(() => {
    let list = tools;
    if (activeCategory === "Favorites") {
      list = list.filter((tool) => isFavorite(tool.id));
    } else if (activeCategory !== "All") {
      list = list.filter((tool) => tool.category === activeCategory);
    }

    const query = search.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query),
      );
    }
    return list;
  }, [activeCategory, isFavorite, search]);

  const mostUsedTools = useMemo(
    () =>
      mostUsed
        .map((id) => tools.find((tool) => tool.id === id))
        .filter((tool): tool is Tool => Boolean(tool)),
    [mostUsed],
  );

  const categoryLabel =
    activeCategory === "Favorites"
      ? "favorites"
      : activeCategory === "All"
        ? null
        : activeCategory;
  const hasFilters = search.trim().length > 0 || activeCategory !== "All";
  const showMostUsed = !search.trim() && activeCategory === "All" && mostUsedTools.length > 0;

  const clearFilters = () => setSearchParams(new URLSearchParams(), { replace: false });

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
      <section aria-labelledby="tools-heading" className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools" }]} />

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <h1
                id="tools-heading"
                className="text-balance font-mono text-3xl font-bold leading-tight text-foreground sm:text-4xl"
              >
                All {tools.length} developer tools
              </h1>
              <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                Search the full index or filter by category. Every tool processes its input locally
                in this tab.
              </p>
            </div>
            <p className="shrink-0 font-mono text-xs text-muted-foreground">
              {categories.length} categories · {tools.length} tools
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Tool filters" className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <form role="search" onSubmit={(event) => event.preventDefault()} className="min-w-0 flex-1 lg:max-w-md">
              <div className="relative">
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
                  value={search}
                  onChange={(event) => updateParams({ q: event.target.value || null })}
                  placeholder="Search by name, description or category…"
                  autoComplete="off"
                  spellCheck={false}
                  className="h-11 border-border bg-secondary pl-9 pr-11 font-mono text-base placeholder:text-muted-foreground md:text-sm"
                />
                {search.trim() && (
                  <button
                    type="button"
                    onClick={() => updateParams({ q: null })}
                    aria-label="Clear search"
                    className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </form>

            <Button
              type="button"
              variant={isFavorites ? "default" : "outline"}
              aria-pressed={isFavorites}
              onClick={() => updateParams({ view: isFavorites ? null : "favorites", category: null }, false)}
              className="h-11 w-full shrink-0 gap-2 sm:w-auto"
            >
              <Star
                className="h-4 w-4"
                fill={isFavorites ? "currentColor" : "none"}
                aria-hidden="true"
              />
              Favorites ({count})
            </Button>
          </div>

          <nav
            aria-label="Filter tools by category"
            className="mt-3 flex gap-1 overflow-x-auto overscroll-x-contain pb-0.5 scrollbar-hide lg:flex-wrap lg:overflow-visible lg:pb-0"
          >
            {categoryFilters.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    updateParams(
                      { category: category === "All" ? null : category, view: null },
                      false,
                    )
                  }
                  aria-pressed={isActive}
                  className={cn(
                    "touch-target-y inline-flex h-8 shrink-0 items-center justify-center rounded-full px-3 text-xs font-medium leading-none",
                    "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p role="status" aria-live="polite" className="text-xs text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
            {search.trim() && (
              <>
                {" "}
                for <span className="font-mono text-foreground">“{search.trim()}”</span>
              </>
            )}
            {categoryLabel && (
              <>
                {" "}
                in <span className="font-medium text-secondary-foreground">{categoryLabel}</span>
              </>
            )}
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 px-2 text-xs">
              Clear filters
            </Button>
          )}
        </div>

        {showMostUsed && (
          <section aria-labelledby="most-used-heading" className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <Flame className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <h2 id="most-used-heading" className="font-mono text-xs font-medium text-muted-foreground">
                Most used
              </h2>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2">
              {mostUsedTools.map((tool) => (
                <ToolLink key={tool.id} tool={tool} showDescription={false} />
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 px-6 py-16 text-center">
            <Search className="mb-3 h-7 w-7 text-muted-foreground" aria-hidden="true" />
            <p role="status" className="font-mono text-sm text-foreground">
              {search.trim()
                ? `No tools match “${search.trim()}”`
                : activeCategory === "Favorites" && count === 0
                  ? "No favorites yet"
                  : "No tools found"}
            </p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              {activeCategory === "Favorites" && count === 0
                ? "Star a tool to keep it within reach. Favorites stay in this browser."
                : "Try a shorter search term, a different category, or show every tool."}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {search.trim() && (
                <Button variant="secondary" size="sm" onClick={() => updateParams({ q: null })}>
                  Clear search
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Show all tools
              </Button>
            </div>
          </div>
        ) : (
          <div className={TOOL_GRID}>
            {filtered.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={isFavorite(tool.id)}
                onToggleFavorite={toggle}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Tools;
