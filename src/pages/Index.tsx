import { useState, useMemo } from "react";
import { Search, Star, Terminal, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { tools, categories, ToolCategory } from "@/data/tools";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentTools } from "@/hooks/useRecentTools";
import ToolCard from "@/components/ToolCard";
import { cn } from "@/lib/utils";

const Index = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "All" | "Favorites">("All");
  const { toggle, isFavorite, count } = useFavorites();
  const { recent } = useRecentTools();
  const recentTools = useMemo(() => recent.map((id) => tools.find((t) => t.id === id)).filter(Boolean), [recent]);

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
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-mono text-lg font-bold text-foreground">DevToolbox</span>
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 104 tools…"
              className="pl-9 bg-secondary border-border font-mono text-sm"
            />
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-secondary px-2 py-1 text-[10px] font-mono text-muted-foreground">
            <span>⌘</span>K
          </kbd>
          <button
            onClick={() => setActiveCategory(activeCategory === "Favorites" ? "All" : "Favorites")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeCategory === "Favorites"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Star className="h-4 w-4" fill={activeCategory === "Favorites" ? "currentColor" : "none"} />
            {count}
          </button>
        </div>
      </header>

      {/* Category bar */}
      <div className="border-b border-border bg-card/50">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 scrollbar-hide">
          <button
            onClick={() => setActiveCategory("All")}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
              activeCategory === "All"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            All ({tools.length})
          </button>
          {categories.map((cat) => {
            const catCount = tools.filter((t) => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {cat} ({catCount})
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool grid */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Search className="h-10 w-10 mb-3" />
            <p className="font-mono text-sm">No tools found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
