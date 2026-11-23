import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { tools } from "@/data/tools";

const NotFound = () => {
  useSEO(
    "Page not found — DevToolbox",
    `The page you requested does not exist. Browse ${tools.length} free browser-based developer tools.`,
  );

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex flex-1 items-center justify-center px-4 py-20 focus:outline-none"
    >
      <div className="max-w-md text-center">
        <p className="font-mono text-xs text-primary">404</p>
        <h1 className="mt-2 font-mono text-3xl font-bold text-foreground">Page not found</h1>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          That URL does not match a tool. It may have been renamed, or the link is incomplete.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link to="/tools">
              Browse all {tools.length} tools
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
