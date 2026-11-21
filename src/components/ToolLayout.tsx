import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommandPaletteTrigger from "@/components/CommandPaletteTrigger";

interface ToolLayoutProps {
  title: string;
  description: string;
  category?: string;
  children: React.ReactNode;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ title, description, category, children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-start gap-3 px-4 py-3 sm:items-center sm:gap-4 sm:py-4">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground sm:mt-0"
          >
            <Link to="/" aria-label="Back to all tools">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
          <div className="min-w-0 flex-1">
            {category && (
              <p className="mb-0.5 text-[11px] font-medium text-muted-foreground">
                {category.split("/")[0]}
              </p>
            )}
            <h1
              id="tool-title"
              tabIndex={-1}
              className="text-balance font-mono text-lg font-bold text-foreground focus:outline-none"
            >
              {title}
            </h1>
            <p className="mt-0.5 text-pretty text-sm text-muted-foreground">{description}</p>
          </div>
          <CommandPaletteTrigger className="shrink-0" />
        </div>
      </header>
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-5xl px-4 py-6 focus:outline-none"
      >
        {children}
      </main>
    </div>
  );
};

export default ToolLayout;
