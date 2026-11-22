import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { tools } from "@/data/tools";

const footerLinkClass =
  "touch-target-y inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card";

/** Shared footer that closes every route with navigation and the privacy promise. */
const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <BrandMark className="h-6 w-6" />
              <span className="font-mono text-base font-bold">DevToolbox</span>
            </Link>
            <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              {tools.length} browser-based developer tools for formatting, encoding, converting and
              inspecting data. No account, no uploads, no telemetry.
            </p>
            <p className="mt-3 flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
              Tool input stays in this tab.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-xs font-medium text-foreground">Explore</h2>
            <ul className="mt-3 space-y-1">
              <li>
                <Link to="/" className={footerLinkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className={footerLinkClass}>
                  All {tools.length} tools
                </Link>
              </li>
              <li>
                <Link to="/usage" className={footerLinkClass}>
                  Usage guide
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs font-medium text-foreground">Project</h2>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href="https://github.com/askarthemasss/dev-essentials-hub"
                  className={footerLinkClass}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source on GitHub
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/askarthemasss/dev-essentials-hub/blob/main/LICENSE"
                  className={footerLinkClass}
                  target="_blank"
                  rel="noreferrer"
                >
                  MIT license
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <Link to="/tools?view=favorites" className={footerLinkClass}>
                  Your favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} DevToolbox · MIT licensed</p>
          <p className="font-mono">
            {tools.length} tools · no account · no telemetry
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
