import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { tools } from "@/data/tools";
import { getToolComponent } from "@/data/toolRegistry";
import ToolLayout from "@/components/ToolLayout";
import NotFound from "@/pages/NotFound";
import { addRecentTool } from "@/hooks/useRecentTools";
import { addMostUsedTool } from "@/hooks/useMostUsedTools";
import { useSEO } from "@/hooks/useSEO";

const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = tools.find((entry) => entry.id === toolId);
  const Component = toolId ? getToolComponent(toolId) : undefined;

  useSEO(
    tool ? `${tool.name} — DevToolbox` : "Page not found — DevToolbox",
    tool ? `${tool.description}. Free online developer tool — runs entirely in your browser.` : "",
    toolId ? `/tool/${toolId}` : "/"
  );

  useEffect(() => {
    if (tool) {
      addRecentTool(tool.id);
      addMostUsedTool(tool.id);
    }
  }, [tool]);

  if (!tool || !Component) return <NotFound />;

  return (
    <ToolLayout title={tool.name} description={tool.description}>
      <React.Suspense
        fallback={
          <div className="flex items-center justify-center py-20 font-mono text-sm text-muted-foreground">
            Loading tool…
          </div>
        }
      >
        <Component />
      </React.Suspense>
    </ToolLayout>
  );
};

export default ToolPage;
