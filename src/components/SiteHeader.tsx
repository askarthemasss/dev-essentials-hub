import { Link, useLocation } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import CommandPaletteTrigger from "@/components/CommandPaletteTrigger";
import { cn } from "@/lib/utils";

const navLinkClass = (active: boolean) =>
  cn(
    "touch-target-y inline-flex h-9 items-center border-b-2 px-2 text-xs font-medium",
    "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
    active
      ? "border-primary text-foreground"
      : "border-transparent text-muted-foreground hover:text-foreground",
  );

/** Shared sticky site header used by every route. */
const SiteHeader = () => {
  const { pathname } = useLocation();
  const toolsActive = pathname === "/tools" || pathname.startsWith("/tool/");
  const usageActive = pathname === "/usage";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-[52px] max-w-6xl items-center gap-2 px-4 sm:gap-4">
        <Link
          to="/"
          aria-label="DevToolbox home"
          className="flex h-9 shrink-0 items-center gap-2 rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <BrandMark className="h-6 w-6 shrink-0" />
          <span className="hidden font-mono text-base font-bold sm:inline">DevToolbox</span>
        </Link>

        <nav aria-label="Primary" className="ml-1 flex items-center gap-1 sm:ml-3 sm:gap-2">
          <Link to="/tools" aria-current={toolsActive ? "page" : undefined} className={navLinkClass(toolsActive)}>
            Tools
          </Link>
          <Link to="/usage" aria-current={usageActive ? "page" : undefined} className={navLinkClass(usageActive)}>
            Usage
          </Link>
        </nav>

        <div className="ml-auto flex items-center">
          <CommandPaletteTrigger />
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
