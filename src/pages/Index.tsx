import { useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tools, categories, ToolCategory } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentTools } from "@/hooks/useRecentTools";
import { useMostUsedTools } from "@/hooks/useMostUsedTools";
import { useSEO } from "@/hooks/useSEO";
import ToolCard from "@/components/ToolCard";
import BrandMark from "@/components/BrandMark";
import CommandPaletteTrigger from "@/components/CommandPaletteTrigger";
import { cn } from "@/lib/utils";

type CategoryFilter = ToolCategory | "All" | "Favorites";

const TOOL_GRID = "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";

const Index = () => {
  useSEO(
    `DevToolbox — ${tools.length} Free Online Developer Tools`,
    `Free collection of ${tools.length} browser-based developer tools. JSON formatter, Base64, UUID, regex tester, color picker, JWT decoder, and more.`,
    "/",
  );

  const searchId = useId();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const { toggle, isFavorite, count } = useFavorites();
  const { recent } = useRecentTools();
  const { mostUsed } = useMostUsedTools();

  const recentTools = useMemo(
    () => recent.map((id) => tools.find((tool) => tool.id === id)).filter(Boolean),
    [recent],
  );
  const mostUsedTools = useMemo(
    () => mostUsed.map((id) => tools.find((tool) => tool.id === id)).filter(Boolean),
    [mostUsed],
  );

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
  }, [search, activeCategory, isFavorite]);

  const categoryLabel =
    activeCategory === "Favorites"
      ? "favorites"
      : activeCategory === "All"
        ? null
        : activeCategory.split("/")[0];
  const hasFilters = search.trim().length > 0 || activeCategory !== "All";

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  const renderGrid = (items: typeof tools) => (
    <div className={TOOL_GRID}>
      {items.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          isFavorite={isFavorite(tool.id)}
          onToggleFavorite={toggle}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex h-[52px] max-w-6xl items-center gap-2 px-4 sm:gap-3">
          <Link
            to="/"
            aria-label="DevToolbox home"
            className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <BrandMark className="h-6 w-6 shrink-0" />
            <span className="hidden font-mono text-base font-bold text-foreground sm:inline">
              DevToolbox
            </span>
          </Link>

          <div className="relative min-w-0 flex-1 sm:max-w-sm">
            <label htmlFor={searchId} className="sr-only">
              Search {tools.length} developer tools
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id={searchId}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tools…"
              autoComplete="off"
              spellCheck={false}
              className="touch-target-y h-10 border-border bg-secondary pl-9 pr-3 font-mono text-base md:text-xs"
            />
          </div>

          <CommandPaletteTrigger className="shrink-0" />

          <button
            type="button"
            onClick={() =>
              setActiveCategory((current) => (current === "Favorites" ? "All" : "Favorites"))
            }
            aria-label={`Favorites (${count})`}
            aria-pressed={activeCategory === "Favorites"}
            className={cn(
              "touch-target inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 text-xs font-medium",
              "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
              activeCategory === "Favorites"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Star
              className="h-4 w-4"
              fill={activeCategory === "Favorites" ? "currentColor" : "none"}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Favorites ({count})</span>
          </button>
        </div>
      </header>

      <nav aria-label="Filter tools by category" className="border-b border-border bg-card/50">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto overscroll-x-contain px-4 py-1.5 scrollbar-hide">
          {(["All", ...categories, "Favorites"] as CategoryFilter[]).map((category) => {
            const isActive = activeCategory === category;
            const label = category === "All" || category === "Favorites" ? category : category.split("/")[0];

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={cn(
                  "touch-target-y inline-flex h-[22px] shrink-0 items-center justify-center rounded-full px-3 text-[11px] font-medium leading-none",
                  "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-6xl px-4 py-4 focus:outline-none">
        <h1 className="sr-only">DevToolbox — {tools.length} free developer tools</h1>

        {mostUsedTools.length > 0 && activeCategory === "All" && !search.trim() && (
          <section aria-labelledby="most-used-heading" className="mb-4">
            <div className="mb-2 flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <h2 id="most-used-heading" className="font-mono text-xs font-medium text-foreground">
                Most used
              </h2>
            </div>
            {renderGrid(mostUsedTools as typeof tools)}
          </section>
        )}

        {recentTools.length > 0 && activeCategory === "All" && !search.trim() && (
          <section aria-labelledby="recent-heading" className="mb-4">
            <div className="mb-2 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              <h2 id="recent-heading" className="font-mono text-xs font-medium text-muted-foreground">
                Recent
              </h2>
            </div>
            {renderGrid(recentTools as typeof tools)}
          </section>
        )}

        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
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

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 px-6 py-16 text-center">
            <Search className="mb-3 h-7 w-7 text-muted-foreground" aria-hidden="true" />
            <p role="status" className="font-mono text-sm text-foreground">
              {activeCategory === "Favorites" && count === 0
                ? "No favorites yet"
                : search.trim()
                  ? `No tools match “${search.trim()}”`
                  : "No tools found"}
            </p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              {activeCategory === "Favorites" && count === 0
                ? "Star a tool to keep it within reach. Favorites stay in this browser."
                : "Try a shorter search term, a different category, or show every tool."}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {search.trim() && (
                <Button variant="secondary" size="sm" onClick={() => setSearch("")}>
                  Clear search
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Show all tools
              </Button>
            </div>
          </div>
        ) : (
          renderGrid(filtered)
        )}
      </main>
    </div>
  );
};

export default Index;
