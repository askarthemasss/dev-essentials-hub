import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { tools } from "@/data/tools";

const NotFound = () => {
  useSEO(
    "Page not found — DevToolbox",
    `The page you requested does not exist. Browse ${tools.length} free browser-based developer tools.`
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">404</p>
        <h1 className="mb-3 font-mono text-3xl font-bold text-foreground">Page not found</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          That URL does not match a tool. It may have been renamed or removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all tools
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
