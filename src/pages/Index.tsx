import { useState, useMemo } from "react";
import { Search, Star, Terminal, Clock, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";
import { tools, categories, ToolCategory } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentTools } from "@/hooks/useRecentTools";
import { useMostUsedTools } from "@/hooks/useMostUsedTools";
import { useSEO } from "@/hooks/useSEO";
import ToolCard from "@/components/ToolCard";
import { cn } from "@/lib/utils";

const Index = () => {
  useSEO("DevToolbox — 124+ Free Online Developer Tools", "Free collection of 124+ browser-based developer tools. JSON formatter, Base64, UUID, regex tester, color picker, JWT decoder, and more.");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "All" | "Favorites">("All");
  const { toggle, isFavorite, count } = useFavorites();
  const { recent } = useRecentTools();
  const { mostUsed } = useMostUsedTools();
  const recentTools = useMemo(() => recent.map((id) => tools.find((t) => t.id === id)).filter(Boolean), [recent]);
  const mostUsedTools = useMemo(() => mostUsed.map((id) => tools.find((t) => t.id === id)).filter(Boolean), [mostUsed]);

  const filtered = useMemo(() => {
    let list = tools;
    if (activeCategory === "Favorites") {
      list = list.filter((t) => isFavorite(t.id));
    } else if (activeCategory !== "All") {
      list = list.filter((t) => t.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory, isFavorite]);

  return (
    <div className="dark min-h-screen bg-background">
      {/* Compact header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            <span className="font-mono text-base font-bold text-foreground hidden sm:inline">DevToolbox</span>
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${tools.length} tools…`}
              className="h-8 pl-8 bg-secondary border-border font-mono text-xs"
            />
          </div>
          <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-border bg-secondary px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">
            ⌘K
          </kbd>
          <button
            onClick={() => setActiveCategory(activeCategory === "Favorites" ? "All" : "Favorites")}
            className={cn(
              "flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors",
              activeCategory === "Favorites"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Star className="h-3.5 w-3.5" fill={activeCategory === "Favorites" ? "currentColor" : "none"} />
            <span className="hidden sm:inline">{count}</span>
          </button>
        </div>
      </header>

      {/* Inline category filter */}
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-1.5 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("All")}
            className={cn(
              "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
              activeCategory === "All"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {cat.split("/")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Recent tools - compact */}
      {recentTools.length > 0 && activeCategory === "All" && !search && (
        <section className="mx-auto max-w-6xl px-4 pt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <h2 className="font-mono text-xs font-medium text-muted-foreground">Recent</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {recentTools.map((tool) => (
              <ToolCard
                key={tool!.id}
                tool={tool!}
                isFavorite={isFavorite(tool!.id)}
                onToggleFavorite={toggle}
              />
            ))}
          </div>
        </section>
      )}

      {/* Tool grid - dense layout */}
      <main className="mx-auto max-w-6xl px-4 py-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Search className="h-8 w-8 mb-2" />
            <p className="font-mono text-xs">No tools found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
      </main>
    </div>
  );
};

export default Index;
